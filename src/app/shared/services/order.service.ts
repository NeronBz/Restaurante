import { Injectable } from '@angular/core';
import { environmentOrder } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private createOrder: string = environmentOrder.createOrder;
  private getOrder: string = environmentOrder.getOrder;

  constructor() {}
}
