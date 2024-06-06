import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['../layout/layout-page.component.css'],
})
export class RegisterPageComponent {
  username = '';
  password = '';
  email = '';
  password2 = '';
  inputError = false;
  passwordsDoNotMatch = false;
  itExists = false;
  success = false;

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    this.inputError = false;
    this.passwordsDoNotMatch = false;
    this.itExists = false;

    if (this.username && this.password && this.password2) {
      if (this.password === this.password2) {
        this.authService
          .register(this.username, this.email, this.password, this.password2)
          .subscribe((response) => {
            if (response) {
              this.success = true;
              setTimeout(() => {
                this.router.navigate(['/auth/login']);
              }, 3000);
            } else {
              this.itExists = true;
            }
          });
      } else {
        this.passwordsDoNotMatch = true;
        this.password = '';
        this.password2 = '';
      }
    } else {
      this.inputError = true;
    }
  }
}
