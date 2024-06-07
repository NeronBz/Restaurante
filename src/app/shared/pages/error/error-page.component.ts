import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css'],
})
export class ErrorPageComponent {
  isLightTheme: boolean = true;

  constructor(public themeService: ThemeService) {}

  ngOnInit(): void {
    const theme = this.themeService.getTheme();
    if (theme) {
      this.themeService.setTheme(theme);
      if (theme === 'light') {
        this.isLightTheme = true;
      } else {
        this.isLightTheme = false;
      }
    }
  }
}
