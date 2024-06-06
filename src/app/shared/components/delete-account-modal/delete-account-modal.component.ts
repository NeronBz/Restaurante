import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-delete-account-modal',
  templateUrl: './delete-account-modal.component.html',
  styleUrls: ['./delete-account-modal.component.css'],
})
export class DeleteAccountModalComponent {
  @Input() user: User = { username: '', password: '', name: '', tipo: 'C' };

  constructor(private authService: AuthService, private router: Router) {}

  deleteAccount(): void {
    // this.authService.deleteUser(this.user.username);
    this.authService.logout();
    this.router.navigate(['/']);
    setTimeout(() => {
      location.reload();
    }, 1);
  }
}
