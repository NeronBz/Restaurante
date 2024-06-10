import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../shared/services/cart.service';
import { AuthService } from '../../../shared/services/auth.service';
import { catchError, of, tap } from 'rxjs';
import { FoodService } from '../../../shared/services/food.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  items: any[] = [];
  total = 0;
  selectedItem: any;
  user: any;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router,
    private foodService: FoodService
  ) {
    this.user = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
    this.updateCart();
  }

  createCart(): void {
    this.cartService
      .getCartByUserId(this.user.id)
      .pipe(
        tap((cart) => {
          if (cart && cart.id) {
            console.log('El carrito ya existe:', cart);
          }
        }),
        catchError((error) => {
          if (error.status === 404) {
            return this.cartService.createCart(this.user.id).pipe(
              tap(() => {
                this.updateCart();
                console.log('Carrito creado exitosamente');
              })
            );
          } else {
            console.error('Error al obtener el carrito:', error);
            return of(null);
          }
        })
      )
      .subscribe();
  }

  removeFromCart(id: number): void {
    this.cartService.removeFromCart(id).subscribe(() => {
      this.updateCart();
    });
  }

  clearCart(): void {
    this.cartService.clearCart().subscribe(() => {
      this.updateCart();
    });
  }

  checkout(): void {
    this.router.navigate(['/restaurant/payment']);
  }

  private updateCart(): void {
    this.cartService.loadItems(this.user.id).subscribe((carrito) => {
      console.log(carrito);

      this.cartService.getItems().subscribe((items) => {
        console.log(items);

        // Hacer la segunda llamada a food.service para obtener los detalles del producto
        const productIds = items.map((item) => item.idProducto);
        this.foodService.getProductosByIds(productIds).subscribe(
          (products) => {
            // Mapear los productos a los items del carrito
            this.items = items.map((item) => {
              const product = products.find(
                (product) => product.id === item.idProducto
              );
              return {
                ...item,
                product: product, // Adjuntar el producto al item del carrito
              };
            });

            // Calcular el total
            this.total = this.items.reduce(
              (acc, item) => acc + item.precio * item.cantidad,
              0
            );
          },
          (error) => {
            console.error('Error fetching products:', error);
          }
        );
      });
    });
  }

  openQuantityModal(item: any): void {
    this.selectedItem = item;
    const modalElement = document.getElementById(
      'quantityModal'
    ) as HTMLElement;
    modalElement.classList.add('show');
    modalElement.setAttribute('aria-hidden', 'false');
    modalElement.setAttribute('style', 'display: block');
    document.body.appendChild(document.createElement('div')).className =
      'modal-backdrop fade show';
  }

  onQuantityChange(newQuantity: number): void {
    if (this.selectedItem) {
      this.selectedItem.cantidad = newQuantity;
      this.cartService.updateCart(this.items).subscribe(() => {
        this.updateCart();
        this.closeQuantityModal();
      });
    }
  }

  closeQuantityModal(): void {
    const modalElement = document.getElementById(
      'quantityModal'
    ) as HTMLElement;
    modalElement.classList.remove('show');
    modalElement.setAttribute('aria-hidden', 'true');
    modalElement.setAttribute('style', 'display: none');
    document.querySelector('.modal-backdrop')?.remove();
  }
}
