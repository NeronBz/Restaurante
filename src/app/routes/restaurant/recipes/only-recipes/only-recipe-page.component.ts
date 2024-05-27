import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../../../shared/services/recipes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-only-recipe-page',
  templateUrl: 'only-recipe-page.component.html',
})
export class OnlyRecipePageComponent implements OnInit {
  nombreReceta: string = '';
  imagenReceta: string = '';
  ingredientesReceta: any[] = [];
  preparacionReceta: any[] = [];
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
      this.nombreReceta = data.nombre;
      this.imagenReceta = data.imagen;
      this.ingredientesReceta = data.ingredients;
      this.preparacionReceta = data.cocina;
    });
    console.log(this.ingredientesReceta);
  }
}
