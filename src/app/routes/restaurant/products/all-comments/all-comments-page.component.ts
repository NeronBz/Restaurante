import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentsService } from '../../../../shared/services/comments.service';

@Component({
  selector: 'app-all-comments-page',
  templateUrl: './all-comments-page.component.html',
})
export class AllCommentsPageComponent implements OnInit {
  comments: any[] = [];
  productId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commentsService: CommentsService
  ) {}

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('productId')!;
    this.loadComments();
  }

  private loadComments() {
    this.commentsService.getComments(this.productId).subscribe((comments) => {
      this.comments = comments;
    });
  }

  goBack(): void {
    this.router.navigate(['/restaurant/products', this.productId]);
  }
}
