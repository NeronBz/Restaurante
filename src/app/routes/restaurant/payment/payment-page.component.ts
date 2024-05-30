import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../shared/services/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css'],
})
export class PaymentPageComponent {
  constructor(private router: Router, private cartService: CartService) {}

  pay() {
    this.cartService.clearCart();
    alert('Pago realizado con éxito!');
    this.router.navigate(['/']);
  }
}
