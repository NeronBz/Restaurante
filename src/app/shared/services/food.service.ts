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
      tipo: 'postre',
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
      tipo: 'entrante',
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
      tipo: 'segundo',
    },
  ];

  getComidas() {
    return this.comidas;
  }

  getComidaById(id: number): Observable<any> {
    let comidaById: any;
    comidaById = this.comidas.find((comida) => comida.id == id);
    console.log(comidaById);

    return of(comidaById);
  }
}
