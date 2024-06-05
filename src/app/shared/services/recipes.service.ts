import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RecipesService {
  private recipesUrl: string = environment.baseUrl + 'recetas';
  private categoriesUrl: string = environment.baseUrl + 'categorias';

  private recetas: any[] = [];

  constructor(private http: HttpClient) {
    this.loadRecipes();
  }

  private loadRecipes(): void {
    this.getRecipes().subscribe({
      next: (data) => {
        this.recetas = data;
      },
      error: (err) => {
        console.error('Error al cargar las recetas', err);
      },
    });
  }

  getRecipes(): Observable<any[]> {
    return this.http.get<any[]>(this.recipesUrl).pipe(
      tap((data) => (this.recetas = data)),
      catchError((error) => {
        console.error('Error al obtener las recetas', error);
        return of([]);
      })
    );
  }

  getRecipeById(id: number): Observable<any> {
    const receta = this.recetas.find((receta) => receta.id === id);
    return of(receta || null);
  }

  getCategorias(): Observable<any> {
    return this.http.get(this.categoriesUrl);
  }

  getRecetaByCategory(category: number): Observable<any> {
    return this.http.get(`${this.recipesUrl}?idCategoria=${category}`);
  }
}
