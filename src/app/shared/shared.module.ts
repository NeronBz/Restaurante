import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ErrorPageComponent } from './pages/error/error-page.component';

@NgModule({
  declarations: [ErrorPageComponent],
  imports: [CommonModule, RouterModule],
  exports: [ErrorPageComponent],
})
export class SharedModule {}
