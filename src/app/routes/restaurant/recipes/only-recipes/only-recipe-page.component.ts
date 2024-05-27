import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../../../shared/services/recipes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-only-recipe-page',
  templateUrl: 'only-recipe-page.component.html',
})
export class OnlyRecipePageComponent implements OnInit {
  recipe: any[] = [];
  id: number = 0;

  constructor(
    private recipesService: RecipesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['recipeId'];
    });
    this.recipesService.getRecipeById(this.id).subscribe((data) => {
      this.recipe = data;
    });
    console.log(this.recipe);
  }
}
