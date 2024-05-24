import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesPageComponent } from './page/recipes-page.component';
import { FormsModule } from '@angular/forms';
import { RecipesRoutingModule } from './recipes-routing.module';

@NgModule({
  declarations: [RecipesPageComponent],
  imports: [CommonModule, FormsModule, RecipesRoutingModule],
  providers: [],
})
export class RecipesModule {}
