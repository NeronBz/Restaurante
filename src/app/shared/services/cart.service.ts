import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private itemsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    this.loadItems()
  );
  private items: any[] = this.itemsSubject.value;

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

  private loadItems(): any[] {
    const items = localStorage.getItem('cartItems');
    return items ? JSON.parse(items) : [];
  }

  private saveItems() {
    localStorage.setItem('cartItems', JSON.stringify(this.items));
  }
}
