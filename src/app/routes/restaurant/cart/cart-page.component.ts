import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  carrito: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.carrito = this.cartService.getCart();
    console.log(this.carrito);
  }

  clearCarrito(): void {
    this.cartService.clearCart();
    this.carrito = [];
  }
}
