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
import { CommentsService } from '../../../../shared/services/comments.service';
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
    private authService: AuthService,
    private commentsService: CommentsService
  ) {
    this.commentForm = new FormGroup({
      estrellas: new FormControl(0),
      comentario: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['productId'];
      this.loadProductData();
      this.loadComments();
    });

    this.isLoggedIn = this.authService.isLoggedIn();
    this.currentUser = this.authService.getCurrentUser();

    if (this.currentUser?.tipo === 'A') {
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

  private loadProductData() {
    this.foodService.getComidaById(this.id).subscribe((data) => {
      this.nombreComida = data.nombreProducto;
      this.imagenComida = data.imagen;
      this.descripcionComida = data.descripcion;
      this.precio = data.precio;
      this.stock = data.stock;
    });
  }

  private loadComments() {
    this.commentsService.getComments(this.id).subscribe((comments) => {
      this.comments = comments;
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

  viewAllComments(): void {
    this.router.navigate(['/restaurant/products', this.id, 'comments']);
  }

  publishComment(): void {
    // if (this.commentForm.valid) {
    //   const comment = {
    //     idUsuario: this.currentUser?.id,
    //     idProducto: this.id,
    //     comentario: this.commentForm.value.comentario,
    //     calificacion: this.commentForm.value.estrellas,
    //   };
    //   this.commentsService.postComment(comment).subscribe((newComment) => {
    //     this.comments.push(newComment);
    //     this.commentForm.reset();
    //   });
    // }
  }
}
