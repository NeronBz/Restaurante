import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class FoodService {
  private products: string = environment.baseUrl + 'productos';
  private categories: string = environment.baseUrl + 'categorias';

  private comidas: any[] = [];

  constructor(private http: HttpClient) {}

  getComidas(): Observable<any[]> {
    return this.http.get<any[]>(this.products).pipe(
      tap((data) => (this.comidas = data)),
      catchError((error) => {
        console.error('Error al obtener los platos', error);
        return of([]);
      })
    );
  }

  getComidaById(id: number): Observable<any> {
    const comida = this.comidas.find((comida) => comida.id === id);
    if (comida) {
      return of(comida);
    } else {
      // Realizar una solicitud HTTP si no se encuentra la comida en el array local
      return this.http.get<any>(`${this.products}/${id}`).pipe(
        tap((data) => {
          if (data) {
            // Si se obtiene la comida, agregarla al arreglo local
            this.comidas.push(data);
          }
        }),
        catchError((error) => {
          console.error(`Error al obtener la comida con id ${id}`, error);
          return of(null);
        })
      );
    }
  }

  getCategorias(): Observable<any> {
    return this.http.get(this.categories);
  }

  getComidaByCategory(category: number) {
    return this.http.get(`${this.products}?idCategoria=${category}`);
  }

  updateComida(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.products}/${id}`, data);
  }

  createComida(
    nombreProducto: string,
    precio: number,
    descripcion: string,
    idCategoria: number,
    imagen: string
  ): Observable<boolean> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
      nombreProducto: nombreProducto,
      precio: precio,
      descripcion: descripcion,
      idCategoria: idCategoria,
      imagen: imagen,
    };

    return this.http.post<any>(this.products, body, { headers: headers }).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        console.error('Crear comida error:', error);
        return of(false);
      })
    );
  }

  deleteComida(id: number): Observable<any> {
    return this.http.delete<any>(`${this.products}/${id}`).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        console.error('Delete comida error:', error);
        return of(false);
      })
    );
  }

  publishComment(
    id: number,
    comment: { autor: string; comentario: string; estrellas: number }
  ): Observable<any> {
    const comida = this.comidas.find((comida) => comida.id === id);
    if (comida) {
      comida.comentarios.push(comment);
    }
    return of(comida);
  }

  updateStock(id: number, stock: number): Observable<any> {
    const comida = this.comidas.find((comida) => comida.id === id);
    if (comida) {
      comida.stock = Number(comida.stock) - 1;
    }
    return of(comida);
  }
}
