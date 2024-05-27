import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../../../shared/services/food.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-only-products-page',
  templateUrl: 'only-product-page.component.html',
})
export class OnlyProductPageComponent implements OnInit {
  comida: any[] = [];
  id: number = 0;

  constructor(
    private foodService: FoodService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['productId'];
    });
    this.foodService.getComidaById(this.id).subscribe((data) => {
      this.comida = data;
    });
    console.log(this.comida);
  }
}
