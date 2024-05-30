import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  items: any[] = [];
  total: number = 0;
  selectedItem: any;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartService.getItems().subscribe((items) => {
      this.items = items;
      this.total = this.cartService.getTotal();
    });
  }

  removeFromCart(id: number) {
    this.cartService.removeFromCart(id);
    this.updateCart();
  }

  clearCart() {
    this.cartService.clearCart();
    this.updateCart();
  }

  checkout() {
    this.router.navigate(['/restaurant/payment']);
  }

  private updateCart() {
    this.cartService.getItems().subscribe((items) => {
      this.items = items;
      this.total = this.cartService.getTotal();
    });
  }

  openQuantityModal(item: any) {
    this.selectedItem = item;
    const modalElement = document.getElementById(
      'quantityModal'
    ) as HTMLElement;
    modalElement.classList.add('show');
    modalElement.setAttribute('aria-hidden', 'false');
    modalElement.setAttribute('style', 'display: block');
    document.body.appendChild(document.createElement('div')).className =
      'modal-backdrop fade show';
  }

  onQuantityChange(newQuantity: number) {
    if (this.selectedItem) {
      this.selectedItem.cantidad = newQuantity;
      this.cartService.updateCart(this.items);
      this.updateCart();
      this.closeQuantityModal();
    }
  }

  closeQuantityModal() {
    const modalElement = document.getElementById(
      'quantityModal'
    ) as HTMLElement;
    modalElement.classList.remove('show');
    modalElement.setAttribute('aria-hidden', 'true');
    modalElement.setAttribute('style', 'display: none');
    document.querySelector('.modal-backdrop')?.remove();
  }
}
