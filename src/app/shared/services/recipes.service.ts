import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RecipesService {
  private recetas = [
    {
      id: 1,
      nombre: 'Hamburguesa Clásica',
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
      ingredients: [
        'carne de puerco',
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
}
