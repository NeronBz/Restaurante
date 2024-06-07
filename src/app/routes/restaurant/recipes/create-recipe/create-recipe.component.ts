import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipesService } from '../../../../shared/services/recipes.service';

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
  id = 0;
  success = false;
  failed = false;
  recetas: any = [];
  itExists = false;

  alergenos = [
    { id: 1, nombre: 'No contiene lactosa' },
    { id: 2, nombre: 'No contiene verdura' },
    { id: 3, nombre: 'No contiene huevo' },
    { id: 4, nombre: 'No contiene trigo' },
  ];

  selectedAlergenos: any[] = [];

  constructor(private router: Router, private recipesService: RecipesService) {}

  ngOnInit(): void {
    this.recipesService.getRecipes().subscribe((recipe) => {
      this.recetas.push(recipe);
    });
    console.log(this.recetas);
  }

  updateSelectedOptions(event: any) {
    this.idAlergeno = Array.from(event.target.selectedOptions, (option: any) =>
      Number(option.value)
    );
  }

  create(): void {
    const recipeExists = this.recetas[0].find(
      (comida: any) => comida.nombreReceta === this.nombreReceta
    );
    console.log(this.idAlergeno);

    if (!recipeExists) {
      this.itExists = false;
      this.recipesService
        .createReceta(
          this.nombreReceta,
          this.ingredientes,
          this.preparacion,
          this.imagenReceta,
          this.idAlergeno
        )
        .subscribe((success) => {
          console.log(success);
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
