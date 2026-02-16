import { Component, inject } from '@angular/core';
import { ShoppingCartService } from './services/shopping-cart.service';

@Component({
  selector: 'pg-shopping-cart',
  imports: [],
  templateUrl: './shopping-cart.component.html',
})
export class ShoppingCartComponent {
  private cartService = inject(ShoppingCartService);

  get isCartOpen() {
    return this.cartService.isCartOpen;
  }
  get items() {
    return this.cartService.items;
  }
  get count() {
    return this.cartService.count;
  }
  get total() {
    return this.cartService.total;
  }

  closeCart(): void {
    this.cartService.isCartOpen.set(false);
  }

  updateQuantity(productId: string, delta: number): void {
    this.cartService.updateQuantity(productId, delta);
  }

  removeItem(productId: string): void {
    this.cartService.removeFromCart(productId);
  }
}
