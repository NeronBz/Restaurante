export interface Food {
  comidas: Comida[];
}

export interface Comida {
  id: number;
  nombre: string;
  descripcion: string;
  restaurante: string;
  comentarios: Comentario[];
  tipo: string;
}

export interface Comentario {
  autor: string;
  comentario: string;
}
