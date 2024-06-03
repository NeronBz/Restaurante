import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { User } from '../../../shared/interfaces/user.interface';

@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  user: User = { username: '', password: '', name: '' };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.user = currentUser;
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files![0];
    const reader = new FileReader();
    reader.onload = () => {};
    reader.readAsDataURL(file);
  }

  saveProfile(): void {
    this.authService.updateUser(this.user);
    alert('Perfil actualizado con éxito!');
  }

  deleteAccount(): void {
    if (confirm('¿Está seguro de que desea eliminar su cuenta?')) {
      this.authService.deleteUser(this.user.username);
      this.authService.logout();
      this.router.navigate(['/auth/register']);
    }
  }
}
