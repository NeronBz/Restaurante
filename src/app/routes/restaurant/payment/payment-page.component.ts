import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css'],
})
export class PaymentPageComponent {
  constructor(private router: Router) {}

  pay() {
    // Implementa la lógica de pago aquí
    alert('Pago realizado con éxito!');
    this.router.navigate(['/']);
  }
}
