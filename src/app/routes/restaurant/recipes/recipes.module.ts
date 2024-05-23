import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesPageComponent } from './page/recipes-page.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [RecipesPageComponent],
  imports: [CommonModule, FormsModule],
  providers: [],
})
export class RecipesModule {}
