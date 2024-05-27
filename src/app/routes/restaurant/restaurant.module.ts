import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantRoutingModule } from './restaurant-routing.module';
import { RouterModule } from '@angular/router';
import { LayoutRestaurantPageComponent } from './layout/layout-page.component';
import { RecipesPageComponent } from './recipes/page/recipes-page.component';
import { ProductsPageComponent } from './products/page/products-page.component';

@NgModule({
  declarations: [
    LayoutRestaurantPageComponent,
    RecipesPageComponent,
    ProductsPageComponent,
  ],
  imports: [CommonModule, RouterModule, RestaurantRoutingModule],
  exports: [LayoutRestaurantPageComponent],
})
export class RestaurantModule {}
