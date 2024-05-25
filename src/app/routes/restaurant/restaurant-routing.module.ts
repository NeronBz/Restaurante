import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutRestaurantPageComponent } from './layout/layout-page.component';
import { HomePageComponent } from './home/home-page.component';
import { CartPageComponent } from './cart/cart-page.component';
import { AuthGuard } from '../auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutRestaurantPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        data: { title: 'Home' },
        component: HomePageComponent,
      },
      {
        path: 'products',
        data: { title: 'Productos' },
        loadChildren: () =>
          import('./products/products.module').then((m) => m.ProductsModule),
      },
      {
        path: 'recipes',
        data: { title: 'Recetas' },
        loadChildren: () =>
          import('./recipes/recipes.module').then((m) => m.RecipesModule),
      },
      {
        path: 'cart',
        data: { title: 'Carrito' },
        component: CartPageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: '**',
        redirectTo: 'error',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantRoutingModule {}
