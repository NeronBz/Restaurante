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
  private cartId: number = 0;
  carritoCreado: boolean = false;

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
          console.log(cart);

          if (cart && cart.id) {
            this.cartId = cart.id;
            console.log('El carrito ya existe:', cart);
          }

          if (cart == null) {
            this.cartService
              .createCart(this.user.id)
              .pipe(
                tap((cart) => {
                  this.cartId = cart.id;
                  this.updateCart();
                  console.log('Carrito creado exitosamente');
                  this.carritoCreado = true;
                })
              )
              .subscribe();
          }
        }),
        catchError((error) => {
          if (error.status === 404) {
            return this.cartService.createCart(this.user.id).pipe(
              tap((cart) => {
                this.cartId = cart.id;
                this.updateCart();
                console.log('Carrito creado exitosamente');
                this.carritoCreado = true;
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
      location.reload();
    });
  }

  clearCart(): void {
    this.cartService.getCartByUserId(this.user.id).subscribe((cart) => {
      this.cartId = cart.id;
      if (this.cartId) {
        this.cartService.deleteCart(this.cartId).subscribe(() => {
          this.updateCart();
          this.reloadPage();
        });
      }
    });
  }

  checkout(): void {
    this.router.navigate(['/restaurant/payment']);
  }

  private updateCart(): void {
    this.cartService.loadItems(this.user.id).subscribe((carrito) => {
      this.cartService.getItems().subscribe((items) => {
        const productIds = items.map((item) => item.idProducto);
        if (productIds.length > 0) {
          this.foodService.getProductosByIds(productIds).subscribe(
            (products) => {
              this.items = items.map((item) => {
                const product = products.find(
                  (product) => product.id === item.idProducto
                );
                return {
                  ...item,
                  producto: product,
                };
              });

              this.total = this.items.reduce(
                (acc, item) => acc + item.producto.precio * item.cantidad,
                0
              );
            },
            (error) => {
              console.error('Error fetching products:', error);
            }
          );
        } else {
          this.items = [];
          this.total = 0;
        }
      });
    });
  }

  openQuantityModal(item: any): void {
    this.selectedItem = item;
  }

  onQuantityChange(newQuantity: number): void {
    if (this.selectedItem) {
      this.selectedItem.cantidad = newQuantity;
      this.cartService
        .updateCartItem(this.selectedItem.id, newQuantity)
        .subscribe(() => {
          this.updateCart();
        });
    }
  }

  reloadPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
  }
}
