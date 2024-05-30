import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-cart-quantity-modal',
  templateUrl: './cart-quantity-modal.component.html',
  styleUrls: ['./cart-quantity-modal.component.css'],
})
export class CartQuantityModalComponent {
  @Input() currentQuantity: number = 1;
  @Output() quantityChange: EventEmitter<number> = new EventEmitter<number>();

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
  }

  closeModal() {
    const modalElement = document.getElementById(
      'quantityModal'
    ) as HTMLElement;
    modalElement.classList.remove('show');
    modalElement.setAttribute('aria-hidden', 'true');
    modalElement.setAttribute('style', 'display: none');
    document.querySelector('.modal-backdrop')?.remove();
  }
}
