import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../../../shared/services/recipes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth.service';
import { User } from '../../../../shared/interfaces/user.interface';

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
  currentUser: User | null = null;
  isAdmin = false;

  constructor(
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['recipeId'];
      this.loadRecipe();
    });

    this.currentUser = this.authService.getCurrentUser();
    console.log(this.currentUser);

    if (this.currentUser?.tipo == 'A') {
      this.isAdmin = true;
    }
  }

  loadRecipe(): void {
    this.recipesService.getRecipeById(this.id).subscribe((data) => {
      if (data) {
        console.log(data);
        this.nombreReceta = data.nombreReceta;
        this.imagenReceta = data.imagen;
        this.ingredientesReceta = data.ingredientes.split(',');
        this.preparacionReceta = data.instrucciones.split('.');
      } else {
        console.error(`No data found for recipe ID ${this.id}`);
      }
    });
  }

  goToUpdateRecipe(): void {
    this.router.navigate(['/restaurant/recipes', this.id, 'update']);
  }

  goBack(): void {
    this.router.navigate(['/restaurant/recipes']);
  }

  goToProduct(): void {
    this.router.navigate(['/restaurant/products', this.id]);
  }
}
