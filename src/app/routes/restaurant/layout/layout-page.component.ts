import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { filter, map } from 'rxjs';
import { User } from '../../../shared/interfaces/user.interface';
import { ThemeService } from '../../../shared/services/theme.service';

@Component({
  selector: 'app-layout-restaurant-page',
  templateUrl: 'layout-page.component.html',
  styleUrls: ['./layout-page.component.css'],
})
export class LayoutRestaurantPageComponent implements OnInit {
  currentRouteTitle: string = '';
  currentId: string = '';
  currentUser: User | null = null;
  isLightTheme: boolean = true;
  selectedItemIndex: number = 0;

  public sidebarItems = [
    { label: 'Home', url: 'home' },
    { label: 'Platos', url: 'products' },
    { label: 'Recetas', url: 'recipes' },
    { label: 'Carrito', url: 'cart' },
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    public themeService: ThemeService
  ) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute)
      )
      .subscribe((event) => {
        while (event.firstChild) {
          event = event.firstChild;
        }
        this.currentRouteTitle = event.snapshot.data['title'] || 'Home';
        this.currentId =
          event.snapshot.params['productId'] ||
          event.snapshot.params['recipeId'] ||
          '';
      });
  }

  ngOnInit(): void {
    const theme = this.themeService.getTheme();
    if (theme) {
      this.themeService.setTheme(theme);
      this.isLightTheme = theme === 'light';
    }
    this.currentUser = this.authService.getCurrentUser();
    const checkbox = document.getElementById('checkbox');
    checkbox?.addEventListener('change', () => {
      document.body.classList.toggle('dark-mode');
    });
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  changeColor() {
    this.isLightTheme = !this.isLightTheme;
    const theme = this.isLightTheme ? 'light' : 'dark';
    this.themeService.setTheme(theme);
  }

  collapse(id: string, index: any) {
    const element = document.getElementById(id);
    if (element) {
      element.classList.toggle('show');
    }
    this.selectedItemIndex = this.sidebarItems.indexOf(index);
  }
}
