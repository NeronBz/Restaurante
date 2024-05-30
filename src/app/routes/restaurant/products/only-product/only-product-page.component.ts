import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../../../shared/services/food.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-only-products-page',
  templateUrl: 'only-product-page.component.html',
  styleUrls: ['only-product-page.component.css'],
})
export class OnlyProductPageComponent implements OnInit {
  nombreComida: string = '';
  imagenComida: string = '';
  descripcionComida: string = '';
  nombreRestaurante: string = '';
  id: number = 0;
  showComments: boolean = false;

  constructor(
    private foodService: FoodService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = +params['productId'];
    });
    this.foodService.getComidaById(this.id).subscribe((data) => {
      this.nombreComida = data.nombre;
      this.imagenComida = data.imagen;
      this.descripcionComida = data.descripcion;
      this.nombreRestaurante = data.restaurante;
    });
  }

  toggleComments() {
    this.showComments = !this.showComments;
  }

  goToRecipe() {
    this.router.navigate(['/restaurant/recipes', this.id]);
  }
}
