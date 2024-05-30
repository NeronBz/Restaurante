import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ErrorPageComponent } from './pages/error/error-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartQuantityModalComponent } from './components/cart-quantity-modal/cart-quantity-modal.component';
import { LogOutModalComponent } from './components/logout-modal/logout-modal.component';
@NgModule({
  declarations: [
    ErrorPageComponent,
    FooterComponent,
    CartQuantityModalComponent,
    LogOutModalComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    ErrorPageComponent,
    FooterComponent,
    CartQuantityModalComponent,
    LogOutModalComponent,
  ],
})
export class SharedModule {}
