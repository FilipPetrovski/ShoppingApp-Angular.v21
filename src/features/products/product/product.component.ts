import { Component, input, output, signal } from '@angular/core';
import { Product } from '../models/product.class';
import { CommonModule } from '@angular/common';
import { ImageCarouselComponent } from '../../../shared/components/image-carousel/image-carousel/image-carousel.component';

@Component({
    selector: 'pg-product',
    imports: [CommonModule, ImageCarouselComponent],
    templateUrl: './product.component.html',
})
export class ProductComponent {
    product = input.required<Product>();
    currentImgIndex = signal(0);

    addToCart = output<Product>();

    onAddToCartClick() {
        this.addToCart.emit(this.product());
    }

    nextImage(event: Event) {
        event.stopPropagation();
        const next = (this.currentImgIndex() + 1) % this.product().images.length;
        this.currentImgIndex.set(next);
    }

    prevImage(event: Event) {
        event.stopPropagation();
        const prev =
            (this.currentImgIndex() - 1 + this.product().images.length) %
            this.product().images.length;
        this.currentImgIndex.set(prev);
    }
}
