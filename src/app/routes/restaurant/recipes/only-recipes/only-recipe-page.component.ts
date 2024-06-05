import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../../../shared/services/recipes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-only-recipe-page',
  templateUrl: 'only-recipe-page.component.html',
  styleUrls: ['only-recipe-page.component.css'],
})
export class OnlyRecipePageComponent implements OnInit {
  nombreReceta = '';
  imagenReceta = '';
  ingredientesReceta: string[] = [];
  preparacionReceta: string[] = [];
  id = 0;

  constructor(
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['recipeId'];
    });
    this.recipesService.getRecipeById(this.id).subscribe((data) => {
      console.log(data);
      this.nombreReceta = data.nombreReceta;
      this.imagenReceta = data.imagen;
      this.ingredientesReceta = data.ingredientes.split(',');
      this.preparacionReceta = data.instrucciones.split(',');
    });
  }

  goBack(): void {
    this.router.navigate(['/restaurant/recipes']);
  }

  goToProduct(): void {
    this.router.navigate(['/restaurant/products', this.id]);
  }
}
