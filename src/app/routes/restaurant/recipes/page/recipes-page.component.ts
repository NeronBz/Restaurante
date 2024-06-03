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

  onFilterChange(event: Event) {
    const filterValue = (event.target as HTMLSelectElement).value;

    if (filterValue === 'all') {
      this.recipes = this.recipesService.getRecipes();
    } else {
      this.recipes = this.recipesService.getRecipes().filter(recipes => recipes.alergenos.includes(filterValue));
    }
  }

  redirectToOnlyRecipe(id: number): void {
    console.log(id);
    this.router.navigate(['restaurant/recipes', id]);
  }
}
