import { Product } from '../../products/models/product.class';

export interface CartItem {
  product: Product;
  quantity: number;
}
