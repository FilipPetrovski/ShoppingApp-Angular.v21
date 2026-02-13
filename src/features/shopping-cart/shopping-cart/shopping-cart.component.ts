import { Component, inject } from '@angular/core';
import { CartService } from '../services/shopping-cart.service';

@Component({
  selector: 'pg-shopping-cart',
  imports: [],
  templateUrl: './shopping-cart.component.html',
})
export class ShoppingCartComponent {
  public cartService = inject(CartService);
}
