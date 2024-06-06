import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../../../shared/services/recipes.service';
import { Router } from '@angular/router';
import { User } from '../../../../shared/interfaces/user.interface';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-recipes-page',
  templateUrl: './recipes-page.component.html',
  styleUrls: ['./recipes-page.component.css'],
})
export class RecipesPageComponent implements OnInit {
  currentUser: User | null = null;
  isAdmin = false;
  recipes: any[] = [];
  categorias: any[] = [];

  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.recipesService.getRecipes().subscribe((recipes) => {
      this.recipes = recipes;
    });
    this.recipesService.getCategorias().subscribe((categorias) => {
      this.categorias = categorias;
    });
    console.log(this.recipes);

    this.currentUser = this.authService.getCurrentUser();
    console.log(this.currentUser);

    if (this.currentUser?.tipo == 'A') {
      this.isAdmin = true;
    }
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

  goToCreateRecipe(): void {
    this.router.navigate(['/restaurant/recipes/createRecipe']);
  }

  redirectToOnlyRecipe(id: number): void {
    console.log(id);
    this.router.navigate(['restaurant/recipes', id]);
  }
}
