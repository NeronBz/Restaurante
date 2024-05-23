import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantRoutingModule } from './restaurant-routing.module';
import { RouterModule } from '@angular/router';
import { LayoutRestaurantPageComponent } from './layout/layout-page.component';
import { RecipesModule } from './recipes/recipes.module';

@NgModule({
  declarations: [LayoutRestaurantPageComponent],
  imports: [CommonModule, RouterModule, RecipesModule, RestaurantRoutingModule],
})
export class RestaurantModule {}
