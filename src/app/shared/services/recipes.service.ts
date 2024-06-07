import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
      return this.http.get<any>(`${this.recipes}/${id}`).pipe(
        tap((data) => {
          if (data) {
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

  createReceta(
    nombreReceta: string,
    ingredientes: string,
    instrucciones: string,
    imagen: string,
    alergenos: number[]
  ): Observable<boolean> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
      nombreReceta: nombreReceta,
      ingredientes: ingredientes,
      instrucciones: instrucciones,
      imagen: imagen,
      'alergenos[]': alergenos,
    };

    return this.http.post<any>(this.recipes, body, { headers: headers }).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        console.error('Crear receta error:', error);
        return of(false);
      })
    );
  }

  deleteReceta(id: number): Observable<any> {
    return this.http.delete<any>(`${this.recipes}/${id}`).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        console.error('Delete comida error:', error);
        return of(false);
      })
    );
  }
}
