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

  // private comidas = [
  //   {
  //     id: 1,
  //     nombre: 'Hamburguesa Clásica',
  //     imagen: '../../../assets/img/burguer.jpg',
  //     descripcion:
  //       'Una deliciosa hamburguesa con carne de res, queso, lechuga, tomate y salsa especial.',
  //     restaurante: 'Burger House',
  //     comentarios: [
  //       { autor: 'Juan', comentario: 'Excelente sabor y muy jugosa.' },
  //       { autor: 'Ana', comentario: 'Me encantó la salsa especial.' },
  //     ],
  //     precio: 15,
  //     tipo: 'postre',
  //     stock: 40,
  //   },
  //   {
  //     id: 2,
  //     nombre: 'Pizza Margarita',
  //     imagen: '../../../assets/img/pizza-margarita.jpg',
  //     descripcion: 'Pizza clásica italiana con tomate, mozzarella y albahaca.',
  //     restaurante: 'Pizzeria Italiana',
  //     comentarios: [
  //       { autor: 'Mario', comentario: 'Auténtica pizza italiana, deliciosa.' },
  //       { autor: 'Lucia', comentario: 'La masa estaba perfecta.' },
  //     ],
  //     precio: 20,
  //     tipo: 'entrante',
  //     stock: 20,
  //   },
  //   {
  //     id: 3,
  //     nombre: 'Tacos al Pastor',
  //     imagen: '../../../assets/img/tacos.jpg',
  //     descripcion:
  //       'Tacos tradicionales mexicanos con carne de cerdo adobada y piña.',
  //     restaurante: 'El Sabor Mexicano',
  //     comentarios: [
  //       { autor: 'Carlos', comentario: 'Los mejores tacos que he probado.' },
  //       { autor: 'Sofia', comentario: 'Muy auténticos y llenos de sabor.' },
  //     ],
  //     precio: 10,
  //     tipo: 'segundo',
  //     stock: 30,
  //   },
  // ];

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
