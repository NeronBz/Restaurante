import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';
import { ThemeService } from '../../../../shared/services/theme.service';

@Component({
  selector: 'app-layout-auth-page',
  templateUrl: 'layout-page.component.html',
})
export class LayoutAuthPageComponent implements OnInit {
  constructor(
    private authService: AuthService,
    public themeService: ThemeService
  ) {}
  ngOnInit(): void {
    this.authService.logout();

    const theme = this.themeService.getTheme();
    if (theme) {
      this.themeService.setTheme(theme);

      if (theme === 'dark') {
        document.body.classList.toggle('dark-mode');
      }
    }
  }
}
