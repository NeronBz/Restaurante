import { Injectable } from '@angular/core';
import { environmentComments } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CommentsService {
  private createComments: string = environmentComments.createComments;
  private getComments: string = environmentComments.getComments;
  private updateComments: string = environmentComments.updateComments;

  constructor() {}
}
