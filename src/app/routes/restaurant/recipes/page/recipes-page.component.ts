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
  categorias: any[] = [];

  constructor(private recipesService: RecipesService, private router: Router) {}

  ngOnInit(): void {
    this.recipesService.getRecipes().subscribe((recipes) => {
      this.recipes = recipes;
    });
    this.recipesService.getCategorias().subscribe((categorias) => {
      this.categorias = categorias;
    });
    console.log(this.recipes);
  }

  onFilterChange(event: Event) {
    const filterValue = (event.target as HTMLSelectElement).value;

    if (filterValue === 'all') {
      this.recipesService.getRecipes().subscribe((recipes) => {
        this.recipes = recipes;
      });
    } else {
      const categoriaSeleccionada = this.categorias.find(
        (categoria) => categoria.nombreCategoria === filterValue
      );

      if (categoriaSeleccionada) {
        this.recipesService
          .getRecetaByCategory(categoriaSeleccionada.id)
          .subscribe((response) => {
            this.recipes = response as any[];
          });
      }
    }
  }

  redirectToOnlyRecipe(id: number): void {
    console.log(id);
    this.router.navigate(['restaurant/recipes', id]);
  }
}
