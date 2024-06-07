import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-modal',
  templateUrl: './logout-modal.component.html',
  styleUrls: ['./logout-modal.component.css'],
})
export class LogOutModalComponent {
  constructor(private authService: AuthService, private router: Router) {}
  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
    setInterval(() => {
      location.reload();
    }, 12);
  }
}
