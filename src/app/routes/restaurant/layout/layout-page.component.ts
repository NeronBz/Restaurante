import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { filter, map } from 'rxjs';
import { User } from '../../../shared/interfaces/user.interface';
import { ThemeService } from '../../../shared/services/theme.service';
import { CartService } from '../../../shared/services/cart.service';

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
  cartItemCount: number = 0;

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
    public themeService: ThemeService,
    private cartService: CartService
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
    this.cartService.getItems().subscribe((items) => {
      this.cartItemCount = items.length;
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

    this.cartService
      .getItems()
      .subscribe(
        (items) =>
          (this.cartItemCount = items.reduce(
            (total, item) => total + item.cantidad,
            0
          ))
      );
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

  collapse(id: string, index: number): void {
    const element = document.getElementById(id);
    if (element && window.getComputedStyle(element).display === 'block') {
      element.classList.remove('show');
    }
    this.selectedItemIndex = index;
  }
}
