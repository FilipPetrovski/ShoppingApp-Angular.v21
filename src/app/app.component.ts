import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../features/navbar/navbar.component';
import { ShoppingCartComponent } from '../features/shopping-cart/shopping-cart/shopping-cart.component';

@Component({
  selector: 'pg-root',
  imports: [RouterOutlet, NavbarComponent, ShoppingCartComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  protected readonly title = signal('pagination-app');
}
