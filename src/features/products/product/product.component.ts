import { Component, input, output } from '@angular/core';
import { Product } from '../models/product.class';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pg-product',
  imports: [CommonModule],
  templateUrl: './product.component.html',
})
export class ProductComponent {
  product = input.required<Product>();
  addToCart = output<Product>();

  onAddToCartClick() {
    this.addToCart.emit(this.product());
  }
}
