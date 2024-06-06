import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../../../../shared/services/recipes.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-recipe.component.html',
  styleUrls: ['./update-recipe.component.css'],
})
export class UpdateRecipeComponent implements OnInit {
  nombreReceta = '';
  imagenReceta: string | null = '';
  ingredientesReceta: string = '';
  preparacionReceta: string = '';
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
    });
    this.recipesService.getRecipeById(this.id).subscribe((data) => {
      console.log(data);
      this.nombreReceta = data.nombreReceta;
      this.imagenReceta = data.imagen;
      this.ingredientesReceta = data.ingredientes;
      this.preparacionReceta = data.instrucciones;
    });
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
        console.log(data);
        this.success = true;
        setTimeout(() => {
          this.router.navigate(['/restaurant/recipes']);
        }, 3000);
      });
  }
}
