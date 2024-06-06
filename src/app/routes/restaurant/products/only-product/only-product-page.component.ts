import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  ) {
    this.nombreComida = '';
    this.descripcionComida = '';
    this.imagenComida = '';
    this.stock = true;
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.currentUser = null;

    this.commentForm = new FormGroup({
      estrellas: new FormControl(0),
      comentario: new FormControl(''),
    });
  }

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
    if (this.stock) {
      const product = {
        id: this.id,
        nombre: this.nombreComida,
        descripcion: this.descripcionComida,
        precio: this.precio,
        imagen: this.imagenComida,
      };
      this.cartService.addToCart(product);
    }
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  viewAllComments(): void {
    this.router.navigate(['/restaurant/products', this.id, 'comments']);
  }

  publishComment(): void {
    if (this.commentForm.valid) {
      const comment = this.commentForm.value;
      comment.autor = this.currentUser?.name;
      this.comments.push(comment);
      this.commentForm.reset();
    }
  }
}
