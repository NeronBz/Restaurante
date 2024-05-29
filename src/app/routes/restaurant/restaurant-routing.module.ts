import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutRestaurantPageComponent } from './layout/layout-page.component';
import { HomePageComponent } from './home/home-page.component';
import { CartPageComponent } from './cart/cart-page.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { OnlyRecipePageComponent } from './recipes/only-recipes/only-recipe-page.component';
import { OnlyProductPageComponent } from './products/only-product/only-product-page.component';
import { ProductsPageComponent } from './products/page/products-page.component';
import { RecipesPageComponent } from './recipes/page/recipes-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutRestaurantPageComponent,
    children: [
      { path: 'home', data: { title: 'Home' }, component: HomePageComponent },
      {
        path: 'products',
        data: { title: 'Platos' },
        component: ProductsPageComponent,
      },
      {
        path: 'products/:productId',
        data: { title: 'Plato' },
        component: OnlyProductPageComponent,
      },
      {
        path: 'recipes',
        data: { title: 'Recetas' },
        component: RecipesPageComponent,
      },
      {
        path: 'recipes/:recipeId',
        data: { title: 'Receta' },
        component: OnlyRecipePageComponent,
      },
      {
        path: 'cart',
        data: { title: 'Carrito' },
        component: CartPageComponent,
        canActivate: [AuthGuard],
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantRoutingModule {}
