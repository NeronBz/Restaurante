import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoodService } from '../../../../shared/services/food.service';

@Component({
  selector: 'app-create-product-page',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit {
  nombreComida = '';
  imagenComida: string = '';
  descripcionComida = '';
  precio = 0;
  idCategoria = 0;
  id = 0;
  success = false;
  failed = false;
  comidas: any = [];
  itExists = false;

  categorias = [
    { id: 1, nombre: 'Entrante' },
    { id: 2, nombre: 'Principal' },
    { id: 3, nombre: 'Postre' },
  ];

  constructor(private router: Router, private foodService: FoodService) {}

  ngOnInit(): void {
    this.foodService.getComidas().subscribe((food) => {
      this.comidas.push(food);
    });
    console.log(this.comidas);
  }

  create(): void {
    const foodExists = this.comidas[0].find(
      (comida: any) => comida.nombreProducto === this.nombreComida
    );

    if (!foodExists) {
      this.itExists = false;
      this.foodService
        .createComida(
          this.nombreComida,
          this.precio,
          this.descripcionComida,
          this.idCategoria,
          this.imagenComida
        )
        .subscribe((success) => {
          console.log(success);
          if (success) {
            this.success = true;
            setTimeout(() => {
              this.router.navigate(['/restaurant/products']);
            }, 3000);
          } else {
            this.failed = true;
          }
        });
    } else {
      this.itExists = true;
    }
  }
}
