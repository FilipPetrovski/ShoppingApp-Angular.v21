import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ShoppingCartService } from '../shopping-cart/services/shopping-cart.service';

@Component({
  selector: 'pg-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  private cartService = inject(ShoppingCartService);

  isMenuOpen = signal(false);
  cartCount = this.cartService.count;

  toggleMenu(): void {
    this.isMenuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  openCart(): void {
    this.cartService.isCartOpen.set(true);
  }
}
