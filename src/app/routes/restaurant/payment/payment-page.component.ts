import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../shared/services/cart.service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css'],
})
export class PaymentPageComponent {
  private cartId: number = 0;

  constructor(
    private router: Router,
    private cartService: CartService,
    private authService: AuthService
  ) {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.cartService.getCartByUserId(user.id).subscribe((cart) => {
        this.cartId = cart ? cart.id : null;
      });
    }
  }

  pay(): void {
    if (this.cartId) {
      this.cartService.deleteCart(this.cartId).subscribe(() => {
        alert('Pago realizado con éxito!');
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      });
    }
  }
}
