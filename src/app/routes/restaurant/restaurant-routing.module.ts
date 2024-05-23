import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutRestaurantPageComponent } from './layout/layout-page.component';
import { HomePageComponent } from './home/home-page.component';
import { CartPageComponent } from './cart/cart-page.component';
import { ProductsPageComponent } from './products/page/products-page.component';
import { RecipesPageComponent } from './recipes/page/recipes-page.component';
import { AuthGuard } from '../auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutRestaurantPageComponent,
    children: [
      {
        path: '',
        component: HomePageComponent,
      },
      {
        path: 'home',
        data: { title: 'Home' },
        component: HomePageComponent,
      },
      {
        path: 'products',
        data: { title: 'Productos' },
        component: ProductsPageComponent,
      },
      {
        path: 'recipes',
        data: { title: 'Recetas' },
        component: RecipesPageComponent,
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
