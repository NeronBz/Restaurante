import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['../layout/layout-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  username = '';
  email = '';
  password = '';
  isRegistered = false;
  notificationMessage = '';
  notificationType: 'success' | 'error' = 'success';
  inputError = false;
  credencialesError = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.isRegistered = params['registered'] === 'true';
      this.notificationMessage = this.isRegistered
        ? 'Registro exitoso'
        : 'Registro fallido';
      this.notificationType = this.isRegistered ? 'success' : 'error';
      this.hideNotificationAfterDelay();
    });
  }

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

  hideNotificationAfterDelay(): void {
    setTimeout(() => {
      this.isRegistered = false;
    }, 5000);
  }
}
