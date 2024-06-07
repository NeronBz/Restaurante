import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../../../../shared/services/food.service';

@Component({
  selector: 'app-update-product-page',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent implements OnInit {
  nombreComida = '';
  imagenComida: string | null = '';
  descripcionComida = '';
  precio = 0;
  id = 0;
  success = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private foodService: FoodService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['productId'];
      console.log(`Product ID from params: ${this.id}`);

      if (this.id) {
        this.foodService.getComidaById(this.id).subscribe(
          (data) => {
            if (data) {
              console.log(`Data fetched for product ID ${this.id}:`, data);

              this.nombreComida = data.nombreProducto;
              this.imagenComida = data.imagen;
              this.descripcionComida = data.descripcion;
              this.precio = data.precio;
            } else {
              console.error(`No data returned for product ID ${this.id}`);
            }
          },
          (error) => {
            console.error('Error fetching product:', error);
          }
        );
      } else {
        console.error('Product ID is invalid');
      }
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
        console.log(`Product updated with ID ${this.id}:`, data);
        this.success = true;
        setTimeout(() => {
          this.router.navigate(['/restaurant/products']);
        }, 3000);
      });
  }
}
