import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['../layout/layout-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  username = '';
  password = '';
  isRegistered = false;
  notificationMessage = '';
  notificationType: 'success' | 'error' = 'success';

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
    if (this.username && this.password) {
      if (this.authService.login(this.username, this.password)) {
        this.router.navigate(['/']);
        setTimeout(() => {
          location.reload();
        }, 1);
      } else {
        alert('Credenciales incorrectas');
      }
    } else {
      alert('Tiene que escribir en los campos');
    }
  }

  hideNotificationAfterDelay(): void {
    setTimeout(() => {
      this.isRegistered = false;
    }, 5000);
  }
}
