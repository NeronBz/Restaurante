import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../../../shared/services/recipes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-only-recipe-page',
  templateUrl: 'only-recipe-page.component.html',
  styleUrls: ['only-recipe-page.component.css'],
})
export class OnlyRecipePageComponent implements OnInit {
  nombreReceta: string = '';
  imagenReceta: string = '';
  ingredientesReceta: string[] = [];
  preparacionReceta: string[] = [];
  id: number = 0;

  constructor(
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = +params['recipeId'];
    });
    this.recipesService.getRecipeById(this.id).subscribe((data) => {
      this.nombreReceta = data.nombre;
      this.imagenReceta = data.imagen;
      this.ingredientesReceta = data.ingredients;
      this.preparacionReceta = data.cocina;
    });
    console.log(this.ingredientesReceta);
  }

  goToProduct() {
    this.router.navigate(['/restaurant/products', this.id]);
  }
}
