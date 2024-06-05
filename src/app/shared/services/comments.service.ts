import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CommentsService {
  private comments: string = environment.baseUrl + 'comentarios';

  constructor() {}
}
