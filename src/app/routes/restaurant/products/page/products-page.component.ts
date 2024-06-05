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
  categorias: any[] = [];

  constructor(private foodService: FoodService, private router: Router) {}

  ngOnInit(): void {
    this.foodService.getComidas().subscribe((comidas) => {
      this.comidas = comidas;
    });
    this.foodService.getCategorias().subscribe((categorias) => {
      this.categorias = categorias;
    });
    console.log(this.categorias);
  }

  onFilterChange(event: Event) {
    const filterValue = (event.target as HTMLSelectElement).value;

    if (filterValue === 'all') {
      this.foodService.getComidas().subscribe((comidas) => {
        this.comidas = comidas;
      });
    } else {
      const categoriaSeleccionada = this.categorias.find(
        (categoria) => categoria.nombreCategoria === filterValue
      );

      if (categoriaSeleccionada) {
        this.foodService
          .getComidaByCategory(categoriaSeleccionada.id)
          .subscribe((response) => {
            this.comidas = response as any[];
          });
      }
    }
  }

  redirectToOnlyProduct(id: number): void {
    console.log(id);
    this.router.navigate(['restaurant/products', id]);
  }
}
