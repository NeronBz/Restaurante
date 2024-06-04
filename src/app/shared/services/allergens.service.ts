import { Injectable } from '@angular/core';
import { environmentAllergens } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AllergensService {
  private createAllergens: string = environmentAllergens.createAllergens;
  private deleteAllergens: string = environmentAllergens.deleteAllergens;
  private getAllergens: string = environmentAllergens.getAllergens;

  constructor() {}
}
