import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LayoutAuthPageComponent } from './pages/layout/layout-page.component';
import { LoginPageComponent } from './pages/login/login-page.component';
import { RegisterPageComponent } from './pages/register/register-page.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    LayoutAuthPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
  ],
  imports: [CommonModule, AuthRoutingModule, FormsModule, SharedModule],
})
export class AuthModule {}
