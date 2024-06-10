import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentsService } from '../../../../shared/services/comments.service';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-all-comments-page',
  templateUrl: './all-comments-page.component.html',
  styleUrls: ['all-comments-page.component.css'],
})
export class AllCommentsPageComponent implements OnInit {
  comments: any[] = [];
  users: any[] = [];
  productId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commentsService: CommentsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('productId')!;
    this.loadComments();
  }

  private loadComments() {
    this.commentsService.getComments(this.productId).subscribe((comments) => {
      this.comments = comments;
      console.log(this.comments);
      for (let i = 0; i < comments.length; i++) {
        this.authService.getUser(comments[i].idUsuario).subscribe((user) => {
          const userAny: any = user;
          this.users.push(userAny);
          console.log(this.users);
        });
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/restaurant/products', this.productId]);
  }
}
