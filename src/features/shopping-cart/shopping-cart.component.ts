import { Component, inject } from '@angular/core';
import { ShoppingCartService } from './services/shopping-cart.service';

@Component({
  selector: 'pg-shopping-cart',
  imports: [],
  templateUrl: './shopping-cart.component.html',
})
export class ShoppingCartComponent {
  public cartService = inject(ShoppingCartService);
}
