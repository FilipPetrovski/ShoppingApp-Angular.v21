import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../shopping-cart/services/shopping-cart.service';

@Component({
  selector: 'pg-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  public cartService = inject(CartService);

  isMenuOpen = signal(false);

  toggleMenu() {
    this.isMenuOpen.update((open) => !open);
  }
}
