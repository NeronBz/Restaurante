import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

import { AuthService } from '../../../shared/services/auth.service';
import { ThemeService } from '../../../shared/services/theme.service';
import { CartService } from '../../../shared/services/cart.service';
import { User } from '../../../shared/interfaces/user.interface';

@Component({
  selector: 'app-layout-restaurant-page',
  templateUrl: 'layout-page.component.html',
  styleUrls: ['./layout-page.component.css'],
})
export class LayoutRestaurantPageComponent implements OnInit {
  currentRouteTitle = '';
  currentId = '';
  currentUser: User | null = null;
  isLightTheme = true;
  selectedItemIndex = 0;
  cartItemCount = 0;

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
  }

  ngOnInit(): void {
    this.subscribeToCartItems();
    const theme = this.themeService.getTheme();
    if (theme) {
      this.themeService.setTheme(theme);
      this.isLightTheme = theme === 'light';
    }
    this.currentUser = this.authService.getCurrentUser();
    document.getElementById('checkbox')?.addEventListener('change', () => {
      document.body.classList.toggle('dark-mode');
    });
  }

  private subscribeToCartItems(): void {
    this.cartService.getItems().subscribe((items) => {
      this.cartItemCount = items.reduce(
        (total, item) => total + item.cantidad,
        0
      );
    });
  }

  groupItems(items: any[], groupSize: number): any[][] {
    const groupedItems = [];
    for (let i = 0; i < items.length; i += groupSize) {
      groupedItems.push(items.slice(i, i + groupSize));
    }
    return groupedItems;
  }

  changeColor(): void {
    this.isLightTheme = !this.isLightTheme;
    this.themeService.setTheme(this.isLightTheme ? 'light' : 'dark');
  }

  collapse(id: string, index: number): void {
    const element = document.getElementById(id);
    if (element && window.getComputedStyle(element).display === 'block') {
      element.classList.remove('show');
    }
    this.selectedItemIndex = index;
  }
}
