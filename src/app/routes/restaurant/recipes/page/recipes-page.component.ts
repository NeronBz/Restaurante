import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../../../shared/services/recipes.service';
import { tap, catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-recipes-page',
  templateUrl: './recipes-page.component.html',
  styleUrls: ['./recipes-page.component.css'],
})
export class RecipesPageComponent implements OnInit {
  recipes: any[] = [];

  constructor(private recipesService: RecipesService) {}

  ngOnInit(): void {
    this.recipesService
      .getRecipes()
      .pipe(
        tap((data: any[]) => {
          this.recipes = data;
          console.log(data);
        }),
        catchError((error: any) => {
          console.error('Error fetching recipes', error);
          return throwError(() => error);
        })
      )
      .subscribe();
  }
}
