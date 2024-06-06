import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../../../../shared/services/recipes.service';

@Component({
  selector: 'app-update-recipe',
  templateUrl: './update-recipe.component.html',
  styleUrls: ['./update-recipe.component.css'],
})
export class UpdateRecipeComponent implements OnInit {
  nombreReceta = '';
  imagenReceta: string | null = '';
  ingredientesReceta = '';
  preparacionReceta = '';
  id = 0;
  success = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipesService: RecipesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['recipeId'];
      console.log(`Recipe ID from params: ${this.id}`);
      this.loadRecipe();
    });
  }

  loadRecipe(): void {
    if (this.id) {
      this.recipesService.getRecipeById(this.id).subscribe(
        (data) => {
          if (data) {
            console.log(`Data fetched for recipe ID ${this.id}:`, data);
            this.nombreReceta = data.nombreReceta;
            this.imagenReceta = data.imagen;
            this.ingredientesReceta = data.ingredientes;
            this.preparacionReceta = data.instrucciones;
          } else {
            console.error(`No data returned for recipe ID ${this.id}`);
          }
        },
        (error) => {
          console.error('Error fetching recipe:', error);
        }
      );
    } else {
      console.error('Recipe ID is invalid');
    }
  }

  saveChanges(): void {
    this.recipesService
      .updateReceta(this.id, {
        nombreReceta: this.nombreReceta,
        ingredientes: this.ingredientesReceta,
        instrucciones: this.preparacionReceta,
        imagen: this.imagenReceta,
      })
      .subscribe((data) => {
        console.log(`Recipe updated with ID ${this.id}:`, data);
        this.success = true;
        setTimeout(() => {
          this.router.navigate(['/restaurant/recipes']);
        }, 3000);
      });
  }
}
