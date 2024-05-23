import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private theme = 'light';

  getTheme() {
    return localStorage.getItem('theme');
  }

  setTheme(theme: string) {
    localStorage.setItem('theme', theme);
    this.theme = theme;
    document.documentElement.setAttribute('data-bs-theme', theme);
  }
}
