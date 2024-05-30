import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['../layout/layout-page.component.css'],
})
export class LoginPageComponent {
  username: string = '';
  password: string = '';
  isRegistered: boolean = false;
  notificationMessage: string = '';
  notificationType: 'success' | 'error' = 'success';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['registered'] === 'true') {
        this.isRegistered = true;
        this.notificationMessage = 'Registro exitoso';
        this.notificationType = 'success';
        this.hideNotificationAfterDelay();
      } else {
        this.isRegistered = false;
        this.notificationMessage = 'Registro fallido';
        this.notificationType = 'error';
        this.hideNotificationAfterDelay();
      }
    });
  }

  login() {
    if (this.username !== '' && this.password !== '') {
      if (this.authService.login(this.username, this.password)) {
        this.router.navigate(['/']);
        setInterval(() => {
          location.reload();
        }, 1);
      } else {
        alert('Credenciales incorrectas');
      }
    } else {
      alert('Tiene que escribir en los campos');
    }
  }

  hideNotificationAfterDelay() {
    setTimeout(() => {
      this.isRegistered = false;
    }, 5000);
  }
}
