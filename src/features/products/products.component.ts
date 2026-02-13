import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from './services/products.service';
import { Paginator } from '../../shared/components/paginator/paginator';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { ProductComponent } from './product/product.component';
import { CartService } from '../shopping-cart/services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  imports: [Paginator, CommonModule, FormsModule, ProductComponent],
})
export class ProductsComponent {
  public productService = inject(ProductService);
  public cartService = inject(CartService);

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
