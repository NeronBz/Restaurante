import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ErrorPageComponent } from './pages/error/error-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartQuantityModalComponent } from './components/cart-quantity-modal/cart-quantity-modal.component';

@NgModule({
  declarations: [
    ErrorPageComponent,
    FooterComponent,
    CartQuantityModalComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [ErrorPageComponent, FooterComponent, CartQuantityModalComponent],
})
export class SharedModule {}
