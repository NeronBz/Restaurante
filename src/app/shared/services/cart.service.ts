import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private getcart: string = environment.baseUrl + 'carritos';
  private getcartid: string = environment.baseUrl + 'carritos/{id}';
  private putcart: string =
    environment.baseUrl + 'carritos/{id}/actualizar-total';
  private deletecart: string = environment.baseUrl + 'carritos/{id}';
  private postcart: string = environment.baseUrl + 'carritos';

  private postdetailsCart: string = environment.baseUrl + 'detalles-carrito';
  private putdetailsCart: string =
    environment.baseUrl + 'detalles-carrito/{id}';
  private deletedetailsCart: string =
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

  addToCart(item: any) {
    const existingItem = this.items.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      existingItem.cantidad++;
    } else {
      this.items.push({ ...item, cantidad: 1 });
    }
    this.saveItems();
    this.itemsSubject.next(this.items);
  }

  removeFromCart(id: number) {
    this.items = this.items.filter((item) => item.id !== id);
    this.saveItems();
    this.itemsSubject.next(this.items);
  }

  clearCart() {
    this.items = [];
    this.saveItems();
    this.itemsSubject.next(this.items);
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

  updateCart(updatedItems: any[]) {
    this.items = updatedItems;
    this.saveItems();
    this.itemsSubject.next(this.items);
  }

  private loadItems(userId: number) {
    this.http.get(`${this.getcart}/${userId}`).subscribe((response: any) => {
      this.items = response.items || [];
      this.itemsSubject.next(this.items);
    });
  }

  private saveItems() {
    const cartData = {
      userId: this.user.id,
      items: this.items,
    };
    this.http.post(this.postcart, cartData).subscribe();
  }
}
