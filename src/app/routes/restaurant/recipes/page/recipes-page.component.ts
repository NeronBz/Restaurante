import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../../../shared/services/recipes.service';
import { Router } from '@angular/router';
import { User } from '../../../../shared/interfaces/user.interface';
import { AuthService } from '../../../../shared/services/auth.service';
import { AllergensService } from '../../../../shared/services/allergens.service';

@Component({
  selector: 'app-recipes-page',
  templateUrl: './recipes-page.component.html',
  styleUrls: ['./recipes-page.component.css'],
})
export class RecipesPageComponent implements OnInit {
  currentUser: User | null = null;
  isAdmin = false;
  recipes: any[] = [];
  alergenos: any[] = [];
  selectedRecetaId: number | null = null;
  selectedRecetaNombre: string | null = null;

  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private authService: AuthService,
    private allergensService: AllergensService
  ) {}

  ngOnInit(): void {
    this.recipesService.getRecipes().subscribe((recipes) => {
      this.recipes = recipes;
    });
    this.allergensService.getAllergens().subscribe((alergenos) => {
      this.alergenos = alergenos;
    });

    this.currentUser = this.authService.getCurrentUser();

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
      this.recipesService.getRecipes().subscribe((recipes) => {
        this.recipes = recipes.filter(
          (recipe) =>
            !recipe.alergenos ||
            !recipe.alergenos.some(
              (alergeno: any) => alergeno.nombre === filterValue
            )
        );
      });
    }
  }

  goToCreateRecipe(): void {
    this.router.navigate(['/restaurant/recipes/createRecipe']);
  }

  redirectToOnlyRecipe(id: number): void {
    this.router.navigate(['restaurant/recipes', id]);
  }

  setSelectedReceta(id: number, nombre: string): void {
    this.selectedRecetaId = id;
    this.selectedRecetaNombre = nombre;
  }
}
