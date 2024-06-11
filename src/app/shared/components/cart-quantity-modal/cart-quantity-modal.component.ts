import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-quantity-modal',
  templateUrl: './cart-quantity-modal.component.html',
  styleUrls: ['./cart-quantity-modal.component.css'],
})
export class CartQuantityModalComponent {
  @Input() currentQuantity: number = 1;
  @Output() quantityChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(private router: Router) {}

  increaseQuantity() {
    this.currentQuantity++;
  }

  decreaseQuantity() {
    if (this.currentQuantity > 1) {
      this.currentQuantity--;
    }
  }

  confirmQuantity() {
    this.quantityChange.emit(this.currentQuantity);
    this.closeModal();

    setTimeout(() => {
      this.reloadPage();
    }, 2000);
  }

  closeModal() {
    const modalElement = document.getElementById(
      'quantityModal'
    ) as HTMLElement;
    modalElement.classList.remove('show');
    modalElement.setAttribute('aria-hidden', 'true');
    modalElement.setAttribute('style', 'display: none');

    // Elimina la clase modal-open del body para permitir el desplazamiento
    document.body.classList.remove('modal-open');

    // Elimina el modal-backdrop
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.remove();
    }
    document.body.style.overflow = 'auto';

    // Navega de regreso a la página del carrito
    this.router.navigate(['restaurant/cart']);
  }

  reloadPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
  }
}
