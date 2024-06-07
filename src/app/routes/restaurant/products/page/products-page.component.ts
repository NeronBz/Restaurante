import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FoodService } from '../../../../shared/services/food.service';
import { Router } from '@angular/router';
import { User } from '../../../../shared/interfaces/user.interface';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-products-page',
  templateUrl: 'products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent implements OnInit {
  currentUser: User | null = null;
  isAdmin = false;
  comidas: any[] = [];
  categorias: any[] = [];

  selectedComidaId: number | null = null;
  selectedComidaNombre: string | null = null;

  constructor(
    private foodService: FoodService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.foodService.getComidas().subscribe((comidas) => {
      this.comidas = comidas;
    });
    this.foodService.getCategorias().subscribe((categorias) => {
      this.categorias = categorias;
    });
    this.currentUser = this.authService.getCurrentUser();
    console.log(this.currentUser);

    if (this.currentUser?.tipo == 'A') {
      this.isAdmin = true;
    }
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

  goToCreateProduct(): void {
    this.router.navigate(['/restaurant/products/createProduct']);
  }

  redirectToOnlyProduct(id: number): void {
    console.log(id);
    this.router.navigate(['restaurant/products', id]);
  }

  setSelectedComida(id: number, nombre: string): void {
    this.selectedComidaId = id;
    this.selectedComidaNombre = nombre;
  }
}
