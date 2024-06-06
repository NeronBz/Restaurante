import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['../layout/layout-page.component.css'],
})
export class LoginPageComponent {
  username = '';
  email = '';
  password = '';
  isRegistered = false;
  inputError = false;
  credencialesError = false;

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.inputError = false;
    this.credencialesError = false;
    if (this.password && this.email) {
      this.authService
        .login(this.email, this.password)
        .subscribe((response) => {
          if (response) {
            this.router.navigate(['/']);
            setTimeout(() => {
              location.reload();
            }, 15);
            return;
          } else {
            this.credencialesError = true;
            this.username = '';
            this.email = '';
            this.password = '';
            return;
          }
        });
    } else {
      this.inputError = true;
    }
  }
}
