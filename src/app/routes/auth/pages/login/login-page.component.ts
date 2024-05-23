import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['../layout/layout-page.component.css'],
})
export class LoginPageComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/']);
    } else {
      alert('Credenciales incorrectas');
    }
  }
}
