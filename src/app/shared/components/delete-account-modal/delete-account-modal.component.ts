import { Component, EventEmitter, Output, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-account-modal',
  templateUrl: './delete-account-modal.component.html',
  styleUrls: ['./delete-account-modal.component.css'],
})
export class DeleteAccountModalComponent {
  constructor(private authService: AuthService, private router: Router) {}
  deleteAccount(username: string): void {
    this.authService.deleteUser(username);
    this.authService.logout();
    this.router.navigate(['/auth/register']);
  }
}
