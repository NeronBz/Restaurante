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
import { PaymentPageComponent } from './payment/payment-page.component';
import { AllCommentsPageComponent } from './products/all-comments/all-comments-page.component';
import { UpdateProductComponent } from './products/update-product/update-product.component';
import { UpdateRecipeComponent } from './recipes/update-recipe/update-recipe.component';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { CreateRecipeComponent } from './recipes/create-recipe/create-recipe.component';

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
        path: 'products/createProduct',
        data: { title: 'Crear Producto' },
        component: CreateProductComponent,
      },
      {
        path: 'products/:productId',
        data: { title: 'Plato' },
        component: OnlyProductPageComponent,
      },
      {
        path: 'products/:productId/comments',
        data: { title: 'Comentarios' },
        component: AllCommentsPageComponent,
      },
      {
        path: 'products/:productId/update',
        data: { title: 'Editar Plato' },
        component: UpdateProductComponent,
      },
      {
        path: 'recipes',
        data: { title: 'Recetas' },
        component: RecipesPageComponent,
      },
      {
        path: 'recipes/createRecipe',
        data: { title: 'Crear Receta' },
        component: CreateRecipeComponent,
      },
      {
        path: 'recipes/:recipeId',
        data: { title: 'Receta' },
        component: OnlyRecipePageComponent,
      },
      {
        path: 'recipes/:recipeId/update',
        data: { title: 'Editar Receta' },
        component: UpdateRecipeComponent,
      },
      {
        path: 'cart',
        data: { title: 'Carrito' },
        component: CartPageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'payment',
        data: { title: 'Pago' },
        component: PaymentPageComponent,
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
