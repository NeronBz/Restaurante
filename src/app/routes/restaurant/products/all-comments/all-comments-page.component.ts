import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../../../../shared/services/food.service';

@Component({
  selector: 'app-all-comments-page',
  templateUrl: './all-comments-page.component.html',
})
export class AllCommentsPageComponent implements OnInit {
  comments: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private foodService: FoodService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('productId')!;
    this.foodService.getComidaById(id).subscribe((data) => {
      this.comments = data.comentarios;
    });
  }

  goBack(): void {
    this.router.navigate([
      '/restaurant/products',
      this.route.snapshot.paramMap.get('productId'),
    ]);
  }
}
