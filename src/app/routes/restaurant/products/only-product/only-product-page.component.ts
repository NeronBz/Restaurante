import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../../../shared/services/food.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../../shared/services/cart.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  nombreRestaurante = '';
  precio = 0;
  id = 0;
  showComments = false;
  commentForm!: FormGroup;
  newComment = '';
  comments: any[] = [];
  isLoggedIn = false;
  currentUser: User | null = null;

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
    });
    this.foodService.getComidaById(this.id).subscribe((data) => {
      this.nombreComida = data.nombre;
      this.imagenComida = data.imagen;
      this.descripcionComida = data.descripcion;
      this.nombreRestaurante = data.restaurante;
      this.precio = data.precio;
      this.comments = data.comentarios;
    });
    this.isLoggedIn = this.authService.isLoggedIn();
    this.currentUser = this.authService.getCurrentUser();
    console.log(this.currentUser);

    this.commentForm = this.formBuilder.group({
      comentario: ['', Validators.required],
      estrellas: ['', Validators.required],
    });

    this.commentForm.get('comentario')?.valueChanges.subscribe((value) => {
      this.newComment = value;
    });
  }

  goToRecipe(): void {
    this.router.navigate(['/restaurant/recipes', this.id]);
  }

  addToCart(): void {
    this.cartService.addToCart({
      id: this.id,
      nombre: this.nombreComida,
      descripcion: this.descripcionComida,
      imagen: this.imagenComida,
      restaurante: this.nombreRestaurante,
      cantidad: 1,
      precio: this.precio,
    });
  }

  viewAllComments(): void {
    this.router.navigate(['/restaurant/products', this.id, 'comments']);
  }

  publishComment(): void {
    if (this.commentForm.valid) {
      this.comments.push({
        autor: this.currentUser?.username || 'Anonimo',
        comentario: this.commentForm.value.comentario,
        estrellas: this.commentForm.value.estrellas,
      });

      this.commentForm.reset();
    }
  }
}
