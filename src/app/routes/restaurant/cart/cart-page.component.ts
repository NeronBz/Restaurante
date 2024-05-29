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
    // Implementar lógica para redirigir a la pasarela de pago
    this.router.navigate(['/payment']);
  }

  private updateCart() {
    this.cartService.getItems().subscribe((items) => {
      this.items = items;
      this.total = this.cartService.getTotal();
    });
  }
}
