import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantRoutingModule } from './restaurant-routing.module';
import { RouterModule } from '@angular/router';
import { LayoutRestaurantPageComponent } from './layout/layout-page.component';
import { RecipesModule } from './recipes/recipes.module';
import { ProductsModule } from './products/products.module';

@NgModule({
  declarations: [LayoutRestaurantPageComponent],
  imports: [
    CommonModule,
    RouterModule,
    RecipesModule,
    ProductsModule,
    RestaurantRoutingModule,
  ],
  exports: [LayoutRestaurantPageComponent],
})
export class RestaurantModule {}
