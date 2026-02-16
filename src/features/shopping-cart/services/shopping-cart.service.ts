import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../../products/models/product.class';
import { CartItem } from '../models/cart-item.interface';

@Injectable({ providedIn: 'root' })
export class ShoppingCartService {
  private cartItems = signal<CartItem[]>([]);
  isCartOpen = signal(false);

  readonly items = this.cartItems.asReadonly();

  readonly count = computed(() => this.cartItems().reduce((acc, item) => acc + item.quantity, 0));

  readonly total = computed(() =>
    this.cartItems().reduce((acc, item) => acc + item.product.getFinalPrice() * item.quantity, 0),
  );

  addToCart(product: Product) {
    this.cartItems.update((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }

  updateQuantity(productId: string, delta: number) {
    this.cartItems.update((prev) =>
      prev.map((i) =>
        i.product.id === productId ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i,
      ),
    );
  }

  removeFromCart(productId: string) {
    this.cartItems.update((prev) => prev.filter((i) => i.product.id !== productId));
  }

  clearCart() {
    this.cartItems.set([]);
  }
}
