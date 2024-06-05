import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ErrorPageComponent } from './pages/error/error-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartQuantityModalComponent } from './components/cart-quantity-modal/cart-quantity-modal.component';
import { LogOutModalComponent } from './components/logout-modal/logout-modal.component';
import { DeleteAccountModalComponent } from './components/delete-account-modal/delete-account-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    ErrorPageComponent,
    FooterComponent,
    CartQuantityModalComponent,
    LogOutModalComponent,
    DeleteAccountModalComponent,
    SpinnerComponent,
  ],
  imports: [CommonModule, RouterModule, HttpClientModule, NgxSpinnerModule],
  exports: [
    ErrorPageComponent,
    FooterComponent,
    CartQuantityModalComponent,
    LogOutModalComponent,
    DeleteAccountModalComponent,
    SpinnerComponent,
  ],
})
export class SharedModule {}
