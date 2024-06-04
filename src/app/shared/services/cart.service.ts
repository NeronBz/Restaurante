import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import {
  environmentCart,
  environmentDetailsCart,
} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private createCart: string = environmentCart.createCart;
  private deleteCart: string = environmentCart.deleteCart;
  private getCartById: string = environmentCart.getCartById;
  // private updateCart: string = environmentCart.updateCart;
  private getAllCart: string = environmentCart.getAllCart;

  private createDetailsCart: string = environmentDetailsCart.createDetailsCart;
  private deleteDetailsCart: string = environmentDetailsCart.deleteDetailsCart;
  private getDetailsCart: string = environmentDetailsCart.getDetailsCart;
  private updateDetailsCart: string = environmentDetailsCart.updateDetailsCart;

  private itemsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private items: any[] = [];

  constructor(private authService: AuthService) {
    this.loadItems();
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

  private loadItems() {
    const user = this.authService.getCurrentUser();
    if (user) {
      const items = localStorage.getItem(`cartItems_${user.username}`);
      this.items = items ? JSON.parse(items) : [];
      this.itemsSubject.next(this.items);
    }
  }

  private saveItems() {
    const user = this.authService.getCurrentUser();
    if (user) {
      localStorage.setItem(
        `cartItems_${user.username}`,
        JSON.stringify(this.items)
      );
    }
  }
}
