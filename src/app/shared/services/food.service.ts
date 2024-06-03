import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private comidas = [
    {
      id: 1,
      nombre: 'Hamburguesa Clásica',
      imagen: '../../../assets/img/burguer.jpg',
      descripcion:
        'Una deliciosa hamburguesa con carne de res, queso, lechuga, tomate y salsa especial.',
      restaurante: 'Burger House',
      comentarios: [
        { autor: 'Juan', comentario: 'Excelente sabor y muy jugosa.' },
        { autor: 'Ana', comentario: 'Me encantó la salsa especial.' },
      ],
      precio: 15,
    },
    {
      id: 2,
      nombre: 'Pizza Margarita',
      imagen: '../../../assets/img/pizza-margarita.jpg',
      descripcion: 'Pizza clásica italiana con tomate, mozzarella y albahaca.',
      restaurante: 'Pizzeria Italiana',
      comentarios: [
        { autor: 'Mario', comentario: 'Auténtica pizza italiana, deliciosa.' },
        { autor: 'Lucia', comentario: 'La masa estaba perfecta.' },
      ],
      precio: 20,
    },
    {
      id: 3,
      nombre: 'Tacos al Pastor',
      imagen: '../../../assets/img/tacos.jpg',
      descripcion:
        'Tacos tradicionales mexicanos con carne de cerdo adobada y piña.',
      restaurante: 'El Sabor Mexicano',
      comentarios: [
        { autor: 'Carlos', comentario: 'Los mejores tacos que he probado.' },
        { autor: 'Sofia', comentario: 'Muy auténticos y llenos de sabor.' },
      ],
      precio: 10,
    },
  ];

  getComidas() {
    return this.comidas;
  }

  getComidaById(id: number): Observable<any> {
    const comida = this.comidas.find((comida) => comida.id === id);
    return of(comida);
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
}
