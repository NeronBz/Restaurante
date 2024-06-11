import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin, of } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { switchMap, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private getcart: string = environment.baseUrl + 'carritos';
  private postcart: string = environment.baseUrl + 'carritos';
  private getonecart: string = environment.baseUrl + 'carritos/{id}';
  private deletecart: string = environment.baseUrl + 'carritos/{id}';
  private putcart: string =
    environment.baseUrl + 'carritos/{id}/actualizar-total';

  private postdetailsCart: string = environment.baseUrl + 'detalles-carrito';
  private putdetailsCart: string =
    environment.baseUrl + 'detalles-carrito/{id}';
  private getdetailsCart: string =
    environment.baseUrl + 'carritos/{idCarrito}/detalles';
  private deletedetailscart: string =
    environment.baseUrl + 'detalles-carrito/{id}';

  private itemsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private items: any[] = [];
  private user: any;

  constructor(private authService: AuthService, private http: HttpClient) {
    this.user = this.authService.getCurrentUser();
    if (this.user) {
      this.loadItems(this.user.id);
    }
  }

  getItems(): Observable<any[]> {
    const userId = this.user ? this.user.id : null;
    if (!userId) {
      return of([]);
    }

    return this.getCartByUserId(userId).pipe(
      switchMap((cart) => {
        if (cart) {
          const cartId = cart.id;
          const url = this.getdetailsCart.replace(
            '{idCarrito}',
            cartId.toString()
          );
          return this.http.get<any[]>(url).pipe(
            catchError((error) => {
              console.error('Error fetching cart details:', error);
              return of([]);
            })
          );
        } else {
          return of([]);
        }
      })
    );
  }

  getTotal(): number {
    if (this.items) {
      return this.items.reduce(
        (total, item) => total + item.producto.precio * item.cantidad,
        0
      );
    } else {
      return 0;
    }
  }

  loadItems(userId: number): Observable<any> {
    return this.getCartByUserId(userId).pipe(
      switchMap((cart) => {
        if (cart) {
          const url = this.getdetailsCart.replace(
            '{idCarrito}',
            cart.id.toString()
          );
          return this.http.get<any[]>(url).pipe(
            map((items) => {
              this.items = items;
              this.itemsSubject.next(this.items);
              return cart;
            }),
            catchError((error) => {
              console.error('Error fetching cart items:', error);
              return of(null);
            })
          );
        } else {
          return of(null);
        }
      })
    );
  }

  waitForItemsToLoad(): Observable<any[]> {
    return this.itemsSubject.asObservable().pipe(
      switchMap((items) => {
        if (items.length > 0) {
          return of(items);
        } else {
          return this.loadItems(this.user.id).pipe(
            switchMap(() => this.itemsSubject.asObservable())
          );
        }
      })
    );
  }

  saveItems(): void {
    const cartData = {
      userId: this.user.id,
      items: this.items,
    };
    this.http.post(this.postcart, cartData).subscribe();
  }

  createCart(idUsuario: number): Observable<any> {
    return this.http.post(this.postcart, { idUsuario });
  }

  getCartByUserId(userId: number): Observable<any> {
    return this.http.get<any[]>(this.getcart).pipe(
      map((carts) => carts.find((cart) => cart.idUsuario === userId) || null),
      catchError((error) => {
        console.error('Error fetching cart by user ID:', error);
        return of(null);
      })
    );
  }

  addCartItem(cartId: number, item: any): Observable<any> {
    return this.http.post(this.postdetailsCart, {
      idCarrito: cartId,
      idProducto: item.id,
      cantidad: item.cantidad,
    });
  }

  updateCartItem(cartDetailId: number, quantity: number): Observable<any> {
    console.log(quantity);

    return this.http.put(
      `${this.putdetailsCart.replace('{id}', cartDetailId.toString())}`,
      {
        cantidad: quantity,
      }
    );
  }

  addToCart(cartId: number, item: any): void {
    this.waitForItemsToLoad().subscribe((items) => {
      console.log(this.items);
      console.log(item);

      const existingItem = this.items.find(
        (cartItem) => cartItem.idProducto === item.id
      );
      console.log(existingItem);

      if (existingItem) {
        existingItem.cantidad += item.cantidad;
        this.updateCartItem(
          existingItem.idCarrito,
          existingItem.cantidad
        ).subscribe(() => {
          this.loadItems(this.user.id).subscribe();
        });
      } else {
        this.addCartItem(cartId, item).subscribe(() => {
          this.loadItems(this.user.id).subscribe();
        });
      }
    });
  }

  removeFromCart(cartDetailId: number): Observable<any> {
    return this.http
      .delete(
        `${this.deletedetailscart.replace('{id}', cartDetailId.toString())}`
      )
      .pipe(
        switchMap(() => {
          this.loadItems(this.user.id).subscribe();
          return of(null);
        }),
        catchError((error) => {
          console.error('Error removing item from cart:', error);
          return of(null);
        })
      );
  }

  clearCart(): Observable<any> {
    const deleteRequests = this.items.map((item) =>
      this.http.delete(
        `${this.deletedetailscart.replace('{id}', item.id.toString())}`
      )
    );
    return forkJoin(deleteRequests).pipe(
      switchMap(() => {
        this.loadItems(this.user.id).subscribe();
        return of(null);
      }),
      catchError((error) => {
        console.error('Error clearing cart:', error);
        return of(null);
      })
    );
  }

  deleteCart(cartId: number): Observable<any> {
    const url = this.deletecart.replace('{id}', cartId.toString());
    return this.http.delete(url).pipe(
      switchMap(() => {
        this.items = [];
        this.itemsSubject.next(this.items);
        return of(null);
      }),
      catchError((error) => {
        console.error('Error deleting cart:', error);
        return of(null);
      })
    );
  }

  updateCart(updatedItems: any[]): Observable<any> {
    const updateRequests = updatedItems.map((item) =>
      this.updateCartItem(item.id, item.cantidad)
    );
    return forkJoin(updateRequests).pipe(
      switchMap(() => {
        this.loadItems(this.user.id).subscribe();
        return of(null);
      }),
      catchError((error) => {
        console.error('Error updating cart:', error);
        return of(null);
      })
    );
  }
}
