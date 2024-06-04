import { Injectable } from '@angular/core';
import { environmentCategories } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  private createCategories: string = environmentCategories.createCategories;
  private deleteCategories: string = environmentCategories.deleteCategories;
  private getAllCategories: string = environmentCategories.getAllCategories;

  constructor() {}
}
