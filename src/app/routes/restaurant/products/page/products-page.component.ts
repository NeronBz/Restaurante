import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../../../shared/services/food.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-page',
  templateUrl: 'products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent implements OnInit {
  comidas: any[] = [];

  constructor(private foodService: FoodService, private router: Router) {}

  ngOnInit(): void {
    this.comidas = this.foodService.getComidas();
    console.log(this.comidas);
  }

  redirectToOnlyProduct(id: number): void {
    console.log(id);
    this.router.navigate(['restaurant/products', id]);
  }
}
