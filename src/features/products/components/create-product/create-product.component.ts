import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { form, FormField, min, required, validate } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';

export const CREATE_PRODUCT_FORM = {
    title: '',
    description: '',
    price: 0,
    stock: 0,
    thumbnail: '',
    discountPercentage: 0,
    images: [],
};

@Component({
    selector: 'pg-create-product',
    standalone: true,
    imports: [RouterLink, CommonModule, FormField],
    templateUrl: './create-product.component.html',
})
export class CreateProductComponent {
    private router = inject(Router);

    productModel = signal(CREATE_PRODUCT_FORM);

    productForm = form(this.productModel, (s) => {
        required(s.title);
        required(s.thumbnail);

        validate(s.price, (ctx) => {
            return ctx.value() <= 0
                ? { kind: 'min', message: 'Price must be greater than 0' }
                : null;
        });

        min(s.stock, 0, { message: 'Stock cannot be negative' });

        validate(s.discountPercentage, (ctx) => {
            return ctx.value() < 0 || ctx.value() > 100
                ? { kind: 'range', message: 'Discount must be 0-100%' }
                : null;
        });
    });

    saveProduct() {
        if (this.productForm().valid()) {
            console.log('Product saved via Signal Form:', this.productModel());
            // this.router.navigate(['/products']);
        }
    }
}
