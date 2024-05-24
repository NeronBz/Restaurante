import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../../../shared/services/recipes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes-page',
  templateUrl: './recipes-page.component.html',
  styleUrls: ['./recipes-page.component.css'],
})
export class RecipesPageComponent implements OnInit {
  recipes: any[] = [];

  constructor(private recipesService: RecipesService, private router: Router) {}

  ngOnInit(): void {
    this.recipes = this.recipesService.getRecipes();
    console.log(this.recipes);
  }

  redirectToOnlyRecipe(id: number) {
    console.log(id);
    return this.router.navigate(['recipes', id]);
  }
}
