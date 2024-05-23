import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../../../shared/services/food.service';

@Component({
  selector: 'app-products-page',
  templateUrl: 'products-page.component.html',
})
export class ProductsPageComponent implements OnInit {
  comidas: any[] = [];

  constructor(private foodService: FoodService) {}

  ngOnInit(): void {
    this.comidas = this.foodService.getComidas();
    console.log(this.comidas);
  }
}
