import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { form, FormField, required, validate } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product.class';
import { ProductService } from '../../services/product.service';
import { ProductComponent } from '../product/product.component';

export const INITIAL_PRODUCT_FORM = {
  title: '',
  description: '',
  price: 0,
  stock: 0,
  thumbnail: '',
  discountPercentage: 0,
  images: [] as string[],
};

@Component({
  selector: 'pg-create-product',
  imports: [RouterLink, CommonModule, FormField, ProductComponent],
  templateUrl: './create-product.component.html',
  providers: [ProductService],
})
export class CreateProductComponent {
  private productsService = inject(ProductService);
  private destroyRef = inject(DestroyRef);

  /* This is for showing purposes in the html, since the API will not create it as per documentation 
    (just return success product with an ID from BE if successfull). Also i will ignore images, since i cannot upload them like this..
    */
  product = signal<Product | null>(null);

  // I use the experimental signal form here for learning purposes !
  productModel = signal(INITIAL_PRODUCT_FORM);

  productForm = form(this.productModel, (s) => {
    required(s.title);
    required(s.thumbnail);

    validate(s.price, (ctx) => {
      return ctx.value() <= 0 ? { kind: 'min', message: 'Price must be greater than 0' } : null;
    });

    validate(s.stock, (ctx) => {
      return ctx.value() < 0 ? { kind: 'min', message: 'Stock cannot be negative' } : null;
    });
  });

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    const files = Array.from(input.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;

        const isDuplicate = this.productModel().images.some((img) => img === result);

        if (!isDuplicate) {
          this.productModel.update((prev) => ({
            ...prev,
            images: [...prev.images, result],
          }));
        } else {
          console.warn('This image is already in the gallery.');
        }
      };
      reader.readAsDataURL(file);
    });

    input.value = '';
  }

  removeImage(index: number) {
    this.productModel.update((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  }

  saveProduct() {
    if (this.productForm().valid()) {
      // I'm ignoring images, since i cannot upload them like this on this API..
      const { images, ...productDataWithoutImages } = this.productModel();

      const product = new Product(productDataWithoutImages as any);

      this.productsService
        .createProduct(product)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((product: Product) => this.product.set(product));
    }
  }
}
