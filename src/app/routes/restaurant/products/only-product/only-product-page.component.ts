import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../../../../shared/services/food.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { CartService } from '../../../../shared/services/cart.service';
import { User } from '../../../../shared/interfaces/user.interface';

@Component({
  selector: 'app-only-products-page',
  templateUrl: 'only-product-page.component.html',
  styleUrls: ['only-product-page.component.css'],
})
export class OnlyProductPageComponent implements OnInit {
  nombreComida = '';
  imagenComida = '';
  descripcionComida = '';
  precio = 0;
  id = 0;
  stock = true;
  comments: any[] = [];
  commentForm!: FormGroup;
  isLoggedIn = false;
  isAdmin = false;
  currentUser: User | null = null;
  hasText = false;

  constructor(
    private formBuilder: FormBuilder,
    private foodService: FoodService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['productId'];
      console.log(this.id);

      this.foodService.getComidaById(this.id).subscribe((data) => {
        this.nombreComida = data.nombreProducto;
        this.imagenComida = data.imagen;
        this.descripcionComida = data.descripcion;
        this.precio = data.precio;
        this.comments = data.comentarios;
        this.stock = data.stock;
      });
    });

    this.isLoggedIn = this.authService.isLoggedIn();
    this.currentUser = this.authService.getCurrentUser();
    console.log(this.currentUser);

    if (this.currentUser?.name == 'admin') {
      this.isAdmin = true;
    }

    this.commentForm = this.formBuilder.group({
      comentario: ['', Validators.required],
      estrellas: ['', Validators.required],
    });

    this.commentForm.valueChanges.subscribe((value) => {
      this.hasText = value.comentario.trim().length > 0;
    });
  }

  goBack(): void {
    this.router.navigate(['/restaurant/products']);
  }

  goToRecipe(): void {
    this.router.navigate(['/restaurant/recipes', this.id]);
  }

  goToUpdateProduct(): void {
    this.router.navigate(['/restaurant/products', this.id, 'update']);
  }

  addToCart(): void {
    this.cartService.addToCart({
      id: this.id,
      nombre: this.nombreComida,
      descripcion: this.descripcionComida,
      imagen: this.imagenComida,
      cantidad: 1,
      precio: this.precio,
    });
    // this.foodService.updateStock(this.id, this.stock).subscribe((data) => {
    //   console.log(data?.stock);
    //   this.stock = data?.stock ?? 0;
    // });
  }

  viewAllComments(): void {
    this.router.navigate(['/restaurant/products', this.id, 'comments']);
  }

  publishComment(): void {
    if (this.commentForm.valid) {
      const newComment = {
        autor: this.currentUser?.username || 'Anonimo',
        comentario: this.commentForm.value.comentario,
        estrellas: this.commentForm.value.estrellas,
      };

      this.foodService.publishComment(this.id, newComment).subscribe((data) => {
        this.comments = data.comentarios;
        this.commentForm.reset();
        this.hasText = false;
      });
    }
  }
}
