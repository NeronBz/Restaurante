import { Component, Input } from '@angular/core';
import { FoodService } from '../../services/food.service';

@Component({
  selector: 'app-delete-product-modal',
  templateUrl: './delete-product-modal.component.html',
  styleUrls: ['./delete-product-modal.component.css'],
})
export class DeleteProductModalComponent {
  @Input() idComida: any;
  @Input() nombre: any;

  constructor(private foodService: FoodService) {}

  deleteModal(id: number | undefined): void {
    if (id !== undefined) {
      this.foodService.deleteComida(id).subscribe((response) => {
        console.log(response);
        location.reload();
      });
    }
  }
}
