import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipesService {
  private recetas = [
    {
      id: 1,
      nombre: 'Hamburguesa Clásica',
      imagen: '../../../assets/img/burguer.jpg',
      ingredientes: [
        'carne de vaca',
        'pan',
        'queso',
        'lechuga',
        'tomate',
        'cebolla',
        'mayonesa',
        'mostaza',
      ],
      restaurante: 'Burger House',
      cocina: [
        'Asar la carne de vaca en una sartén hasta que esté cocida',
        'Colocar la carne en un pan',
        'Agregar queso, lechuga, tomate, cebolla',
        'condimentar con mayonesa y mostaza',
      ],
    },
    {
      id: 2,
      nombre: 'Pizza Margarita',
      imagen: '../../../assets/img/pizza-margarita.jpg',
      ingredients: [
        'masa de pizza',
        'tomate',
        'queso',
        'pepperoni',
        'aceitunas',
        'orégano',
      ],
      restaurante: 'Pizzeria Italiana',
      cocina: [
        'Precalentar el horno a 220°C',
        'Extender la masa de pizza en una superficie',
        'Colocar tomate, queso, pepperoni, aceitunas y orégano',
        'Hornear durante 15-20 minutos o hasta que la masa esté dorada',
      ],
    },
    {
      id: 3,
      nombre: 'Tacos al Pastor',
      imagen: '../../../assets/img/tacos.jpg',
      ingredients: [
        'carne de cerdo',
        'cebolla',
        'chile',
        'cilantro',
        'limón',
        'tortillas',
        'salsa',
        'aguacate',
      ],
      restaurante: 'El Sabor Mexicano',
      cocina: [
        'Asar la carne de cerdo en una sartén con cebolla y chile hasta que esté cocida',
        'Colocar la carne en tortillas y agregar cilantro, limón y salsa',
        'Agregar aguacate si lo deseas',
      ],
    },
  ];

  getRecipes() {
    return this.recetas;
  }

  getRecipeById(id: number): Observable<any> {
    let recetaById: any;
    recetaById = this.recetas.find((receta) => receta.id == id);
    console.log(recetaById);

    return of(recetaById);
  }
}
