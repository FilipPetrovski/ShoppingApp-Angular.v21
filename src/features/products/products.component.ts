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
  public productService = inject(ProductService);
  public cartService = inject(ShoppingCartService);

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
