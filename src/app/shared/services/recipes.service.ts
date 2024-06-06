import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class RecipesService {
  private recipes: string = environment.baseUrl + 'recetas';
  private categories: string = environment.baseUrl + 'categorias';
  private recetas: any[] = [];

  constructor(private http: HttpClient) {}

  getRecipes(): Observable<any[]> {
    return this.http.get<any[]>(this.recipes).pipe(
      tap((data) => (this.recetas = data)),
      catchError((error) => {
        console.error('Error al obtener las recetas', error);
        return of([]);
      })
    );
  }

  getRecipeById(id: number): Observable<any> {
    const receta = this.recetas.find((receta) => receta.id === id);
    if (receta) {
      return of(receta);
    } else {
      // Realizar una solicitud HTTP si no se encuentra la receta en el array local
      return this.http.get<any>(`${this.recipes}/${id}`).pipe(
        tap((data) => {
          if (data) {
            // Si se obtiene la receta, agregarla al arreglo local
            this.recetas.push(data);
          }
        }),
        catchError((error) => {
          console.error(`Error al obtener la receta con id ${id}`, error);
          return of(null);
        })
      );
    }
  }

  getCategorias(): Observable<any> {
    return this.http.get(this.categories);
  }

  getRecetaByCategory(category: number): Observable<any> {
    return this.http.get(`${this.recipes}?idCategoria=${category}`);
  }

  updateReceta(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.recipes}/${id}`, data);
  }
}
