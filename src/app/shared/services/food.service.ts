import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private products: string = environment.baseUrl + 'productos';
  private categories: string = environment.baseUrl + 'categorias';

  private comidas: any[] = [];

  constructor(private http: HttpClient) {}

  getComidas(): Observable<any[]> {
    return this.http
      .get<any[]>(this.products)
      .pipe(tap((data) => (this.comidas = data)));
  }

  getComidaById(id: number): Observable<any> {
    const comida = this.comidas.find((comida) => comida.id === id);
    return of(comida);
  }

  getCategorias(): Observable<any> {
    return this.http.get(this.categories);
  }

  getComidaByCategory(category: number) {
    return this.http.get(`${this.products}?idCategoria=${category}`);
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
