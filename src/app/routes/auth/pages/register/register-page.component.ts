import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['../layout/layout-page.component.css'],
})
export class RegisterPageComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (this.username !== '' || this.password !== '') {
      if (this.authService.register(this.username, this.password)) {
        this.router.navigate(['/auth/login'], {
          queryParams: { registered: 'true' },
        });
      } else {
        alert('Ya existe un usuario con ese nombre');
      }
    } else {
      alert('Tiene que escribir en los campos');
    }
  }
}
