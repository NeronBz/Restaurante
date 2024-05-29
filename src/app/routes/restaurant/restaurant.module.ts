import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantRoutingModule } from './restaurant-routing.module';
import { RouterModule } from '@angular/router';
import { LayoutRestaurantPageComponent } from './layout/layout-page.component';
import { RecipesPageComponent } from './recipes/page/recipes-page.component';
import { ProductsPageComponent } from './products/page/products-page.component';
import { OnlyRecipePageComponent } from './recipes/only-recipes/only-recipe-page.component';
import { HomePageComponent } from './home/home-page.component';
import { SharedModule } from '../../shared/shared.module';
import { OnlyProductPageComponent } from './products/only-product/only-product-page.component';

@NgModule({
  declarations: [
    LayoutRestaurantPageComponent,
    RecipesPageComponent,
    ProductsPageComponent,
    OnlyRecipePageComponent,
    OnlyProductPageComponent,
    HomePageComponent,
  ],
  imports: [CommonModule, RouterModule, RestaurantRoutingModule, SharedModule],
  exports: [LayoutRestaurantPageComponent],
})
export class RestaurantModule {}
