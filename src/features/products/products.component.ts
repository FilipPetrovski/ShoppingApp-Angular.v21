import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Paginator } from '../../shared/components/paginator/paginator';
import { ShoppingCartService } from '../shopping-cart/services/shopping-cart.service';
import { ProductComponent } from './components/product/product.component';
import { ProductService } from './services/product.service';

@Component({
  selector: 'pg-products',
  templateUrl: './products.component.html',
  imports: [Paginator, CommonModule, FormsModule, ProductComponent, RouterModule],
  providers: [ProductService],
})
export class ProductsComponent {
  private productService = inject(ProductService);
  private cartService = inject(ShoppingCartService);

  get searchTerm() {
    return this.productService.searchTerm;
  }
  get productsResource() {
    return this.productService.productsResource;
  }

  updateSearch(value: string): void {
    this.productService.searchTerm.set(value);
  }

  onAddToCart(product: any): void {
    this.cartService.addToCart(product);
  }

  // Old implementation using RXJS
  // private searchSubject = new Subject<string>();

  // ngOnInit(): void {
  //   this.searchSubject
  //     .pipe(debounceTime(500), distinctUntilChanged())
  //     .subscribe((value) => this.productService.searchTerm.set(value));
  // }

  // setSearchTerm(value: string) {
  //   this.searchSubject.next(value);
  // }
}
