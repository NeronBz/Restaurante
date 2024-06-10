import { Component, Input } from '@angular/core';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-delete-recipe-modal',
  templateUrl: './delete-recipe-modal.component.html',
  styleUrls: ['./delete-recipe-modal.component.css'],
})
export class DeleteRecipeModalComponent {
  @Input() idReceta: any;
  @Input() nombre: any;

  constructor(private recipesService: RecipesService) {}

  deleteModal(id: number | undefined): void {
    if (id !== undefined) {
      console.log(id);

      this.recipesService.deleteReceta(id).subscribe((response) => {
        console.log(response);
        // location.reload();
      });
    }
  }
}
