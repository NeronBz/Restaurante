import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../../../../shared/services/food.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css'],
})
export class CreateRecipeComponent implements OnInit {
  nombreComida = '';
  imagenComida: string | null = '';
  descripcionComida = '';
  precio = 0;
  id = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private foodService: FoodService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['productId'];
      console.log(this.id);

      this.foodService.getComidaById(this.id).subscribe((data) => {
        console.log(data);

        this.nombreComida = data.nombreProducto;
        this.imagenComida = data.imagen;
        this.descripcionComida = data.descripcion;
        this.precio = data.precio;
      });
    });
  }

  saveChanges(): void {
    this.foodService
      .updateComida(this.id, {
        nombreProducto: this.nombreComida,
        imagen: this.imagenComida,
        descripcion: this.descripcionComida,
        precio: this.precio,
      })
      .subscribe((data) => {
        console.log(data);
        this.router.navigate(['/restaurant/products']);
      });
  }
}
