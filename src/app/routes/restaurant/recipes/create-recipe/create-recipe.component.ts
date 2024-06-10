import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipesService } from '../../../../shared/services/recipes.service';
import { AllergensService } from '../../../../shared/services/allergens.service';

@Component({
  selector: 'app-create-recipe-page',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css'],
})
export class CreateRecipeComponent implements OnInit {
  nombreReceta = '';
  imagenReceta = '';
  preparacion = '';
  ingredientes = '';
  idAlergeno: number[] = [];
  success = false;
  failed = false;
  recetas: any[] = [];
  itExists = false;

  alergenos: any[] = [];
  selectedAlergenos: number[] = [];

  constructor(
    private router: Router,
    private recipesService: RecipesService,
    private allergensService: AllergensService
  ) {}

  ngOnInit(): void {
    this.recipesService.getRecipes().subscribe((recipes) => {
      this.recetas = recipes;
    });

    this.allergensService.getAllergens().subscribe((alergenos) => {
      this.alergenos = alergenos;
    });
  }

  updateSelectedOptions(event: any) {
    this.selectedAlergenos = Array.from(event.target.selectedOptions, (option: any) =>
      Number(option.value)
    );
  }

  create(): void {
    const recipeExists = this.recetas.find(
      (comida: any) => comida.nombreReceta === this.nombreReceta
    );

    if (!recipeExists) {
      this.itExists = false;

      this.recipesService
        .createReceta(
          this.nombreReceta,
          this.ingredientes,
          this.preparacion,
          this.imagenReceta,
          this.selectedAlergenos
        )
        .subscribe((success) => {
          if (success) {
            this.success = true;
            setTimeout(() => {
              this.router.navigate(['/restaurant/recipes']);
            }, 3000);
          } else {
            this.failed = true;
          }
        });
    } else {
      this.itExists = true;
    }
  }
}
