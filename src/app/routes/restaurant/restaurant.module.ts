import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RestaurantRoutingModule } from './restaurant-routing.module';
import { LayoutRestaurantPageComponent } from './layout/layout-page.component';
import { RecipesPageComponent } from './recipes/page/recipes-page.component';
import { ProductsPageComponent } from './products/page/products-page.component';
import { OnlyRecipePageComponent } from './recipes/only-recipes/only-recipe-page.component';
import { HomePageComponent } from './home/home-page.component';
import { SharedModule } from '../../shared/shared.module';
import { OnlyProductPageComponent } from './products/only-product/only-product-page.component';
import { CartPageComponent } from './cart/cart-page.component';
import { AllCommentsPageComponent } from './products/all-comments/all-comments-page.component';
import { PaymentPageComponent } from './payment/payment-page.component';
import { UpdateProductComponent } from './products/update-product/update-product.component';
import { UpdateRecipeComponent } from './recipes/update-recipe/update-recipe.component';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { CreateRecipeComponent } from './recipes/create-recipe/create-recipe.component';

@NgModule({
  declarations: [
    LayoutRestaurantPageComponent,
    RecipesPageComponent,
    ProductsPageComponent,
    OnlyRecipePageComponent,
    OnlyProductPageComponent,
    HomePageComponent,
    CartPageComponent,
    AllCommentsPageComponent,
    PaymentPageComponent,
    UpdateProductComponent,
    UpdateRecipeComponent,
    CreateProductComponent,
    CreateRecipeComponent,
  ],
  imports: [
    CommonModule,
    RestaurantRoutingModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [LayoutRestaurantPageComponent],
})
export class RestaurantModule {}
