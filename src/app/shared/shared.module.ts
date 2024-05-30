import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ErrorPageComponent } from './pages/error/error-page.component';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [ErrorPageComponent, FooterComponent, ],
  imports: [CommonModule, RouterModule],
  exports: [ErrorPageComponent, FooterComponent,],
})
export class SharedModule {}
