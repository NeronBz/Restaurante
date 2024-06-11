import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class RecipesService {
  private recipesUrl: string = environment.baseUrl + 'recetas';
  private allergensUrl: string = environment.baseUrl + 'alergenos';
  private recetas: any[] = [];

  constructor(private http: HttpClient) {}

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
    if (receta) {
      return of(receta);
    } else {
      return this.http.get<any>(`${this.recipesUrl}/${id}`).pipe(
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

  getAllergens(): Observable<any[]> {
    return this.http.get<any[]>(this.allergensUrl);
  }

  getRecetaByAllergen(allergens: number): Observable<any> {
    return this.http.get(`${this.recipesUrl}?idAlergeno=${this.allergensUrl}`);
  }

  updateReceta(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.recipesUrl}/${id}`, data);
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
      alergenos: alergenos,
    };

    return this.http
      .post<any>(this.recipesUrl, body, { headers: headers })
      .pipe(
        map((response) => {
          return true;
        }),
        catchError((error) => {
          console.error('Crear receta error:', error);
          return of(false);
        })
      );
  }

  deleteReceta(id: number): Observable<any> {
    return this.http.delete<any>(`${this.recipesUrl}/${id}`).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        console.error('Eliminar receta error:', error);
        return of(false);
      })
    );
  }
}
