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
  name = '';
  password2 = '';
  inputError = false;
  passwordsDoNotMatch = false;
  itExists = false;

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    this.inputError = false;
    this.passwordsDoNotMatch = false;
    if (this.username && this.password && this.password2) {
      if (this.password === this.password2) {
        if (
          this.authService.register(this.username, this.name, this.password)
        ) {
          this.router.navigate(['/auth/login'], {
            queryParams: { registered: 'true' },
          });
        } else {
          this.itExists = true;
        }
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
