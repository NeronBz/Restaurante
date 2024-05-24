import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesPageComponent } from './page/recipes-page.component';
import { OnlyRecipePageComponent } from './only-recipes/only-recipe-page.component';

const routes: Routes = [
  {
    path: '',
    component: RecipesPageComponent,
    children: [
      {
        path: '{id}',
        component: OnlyRecipePageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
