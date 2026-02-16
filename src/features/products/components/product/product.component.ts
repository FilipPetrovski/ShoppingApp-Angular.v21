import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { ImageCarouselComponent } from '../../../../shared/components/image-carousel/image-carousel.component';
import { Product } from '../../models/product.class';

@Component({
  selector: 'pg-product',
  imports: [CommonModule, ImageCarouselComponent],
  templateUrl: './product.component.html',
})
export class ProductComponent {
  product = input.required<Product>();

  addToCart = output<Product>();

  onAddToCartClick() {
    this.addToCart.emit(this.product());
  }
}
