export interface Recipe {
  id: number;
  nombre: string;
  ingredientes?: string[];
  restaurante: string;
  cocina: string[];
  ingredients?: string[];
  alergenos: string[];
}
