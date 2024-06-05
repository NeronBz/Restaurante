import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class RecipesService {
  private recipes: string = environment.baseUrl + 'recetas';
  private categories: string = environment.baseUrl + 'categorias';

  private recetas: any[] = [];

  constructor(private http: HttpClient) {}

  getRecipes(): Observable<any> {
    return this.http.get(this.recipes);
  }

  getRecipeById(id: number): Observable<any> {
    let recetaById: any;
    recetaById = this.recetas.find((receta) => receta.id == id);
    console.log(recetaById);

    return of(recetaById);
  }

  getCategorias(): Observable<any> {
    return this.http.get(this.categories);
  }

  getRecetaByCategory(category: number) {
    return this.http.get(`${this.recipes}?idCategoria=${category}`);
  }
}
