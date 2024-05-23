import { Injectable } from '@angular/core';
import { Comida } from '../interfaces/food.interface';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private comidas = [
    {
      id: 1,
      nombre: 'Hamburguesa Clásica',
      descripcion:
        'Una deliciosa hamburguesa con carne de res, queso, lechuga, tomate y salsa especial.',
      restaurante: 'Burger House',
      comentarios: [
        { autor: 'Juan', comentario: 'Excelente sabor y muy jugosa.' },
        { autor: 'Ana', comentario: 'Me encantó la salsa especial.' },
      ],
    },
    {
      id: 2,
      nombre: 'Pizza Margarita',
      descripcion: 'Pizza clásica italiana con tomate, mozzarella y albahaca.',
      restaurante: 'Pizzeria Italiana',
      comentarios: [
        { autor: 'Mario', comentario: 'Auténtica pizza italiana, deliciosa.' },
        { autor: 'Lucia', comentario: 'La masa estaba perfecta.' },
      ],
    },
    {
      id: 3,
      nombre: 'Tacos al Pastor',
      descripcion:
        'Tacos tradicionales mexicanos con carne de cerdo adobada y piña.',
      restaurante: 'El Sabor Mexicano',
      comentarios: [
        { autor: 'Carlos', comentario: 'Los mejores tacos que he probado.' },
        { autor: 'Sofia', comentario: 'Muy auténticos y llenos de sabor.' },
      ],
    },
  ];

  constructor() {}

  getComidas() {
    return this.comidas;
  }
}
