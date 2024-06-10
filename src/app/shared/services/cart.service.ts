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
  private postdetailsCart: string = environment.baseUrl + 'detalles-carrito';
  private putdetailsCart: string =
    environment.baseUrl + 'detalles-carrito/{id}';
  private getdetailsCart: string =
    environment.baseUrl + 'carritos/{idCarrito}/detalles';

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
    return this.itemsSubject.asObservable();
  }

  getTotal(): number {
    return this.items.reduce(
      (total, item) => total + item.precio * item.cantidad,
      0
    );
  }

  loadItems(userId: number): void {
    this.http.get(`${this.getcart}/${userId}`).subscribe((response: any) => {
      this.items = response.items || [];
      this.itemsSubject.next(this.items);
    });
  }

  saveItems(): void {
    const cartData = {
      userId: this.user.id,
      items: this.items,
    };
    this.http.post(this.postcart, cartData).subscribe();
  }

  createCart(userId: number): Observable<any> {
    return this.http.post(this.postcart, { userId });
  }

  getCartByUserId(userId: number): Observable<any> {
    return this.http.get(`${this.getcart}/${userId}`);
  }

  addCartItem(cartId: number, item: any): Observable<any> {
    return this.http.post(this.postdetailsCart, {
      idCarrito: cartId,
      idProducto: item.id,
      cantidad: item.cantidad,
    });
  }

  updateCartItem(cartDetailId: number, quantity: number): Observable<any> {
    return this.http.put(
      `${this.putdetailsCart.replace('{id}', cartDetailId.toString())}`,
      {
        cantidad: quantity,
      }
    );
  }

  addToCart(cartId: number, item: any): void {
    const existingItem = this.items.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      existingItem.cantidad++;
      this.updateCartItem(existingItem.id, existingItem.cantidad).subscribe(
        () => {
          this.loadItems(this.user.id);
        }
      );
    } else {
      this.addCartItem(cartId, item).subscribe(() => {
        this.loadItems(this.user.id);
      });
    }
  }

  removeFromCart(cartDetailId: number): Observable<any> {
    return this.http
      .delete(`${this.putdetailsCart.replace('{id}', cartDetailId.toString())}`)
      .pipe(
        switchMap(() => {
          this.loadItems(this.user.id);
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
        `${this.putdetailsCart.replace('{id}', item.id.toString())}`
      )
    );
    return forkJoin(deleteRequests).pipe(
      switchMap(() => {
        this.loadItems(this.user.id);
        return of(null);
      }),
      catchError((error) => {
        console.error('Error clearing cart:', error);
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
        this.loadItems(this.user.id);
        return of(null);
      }),
      catchError((error) => {
        console.error('Error updating cart:', error);
        return of(null);
      })
    );
  }
}
