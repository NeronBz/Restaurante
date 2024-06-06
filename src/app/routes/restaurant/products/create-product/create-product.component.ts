import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../../../../shared/services/food.service';

@Component({
  selector: 'app-update-product',
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

  constructor(private router: Router, private foodService: FoodService) {}

  ngOnInit(): void {}

  create(): void {
    this.foodService
      .createComida(
        this.nombreComida,
        this.precio,
        this.descripcionComida,
        this.idCategoria,
        this.imagenComida
      )
      .subscribe((data) => {
        console.log(data);
        this.success = true;
        setTimeout(() => {
          this.router.navigate(['/restaurant/products']);
        }, 3000);
      });
  }
}
