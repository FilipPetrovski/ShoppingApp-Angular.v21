import { Product } from '../models/product.class';

export const MockProduct = new Product({
  id: 'id-1',
  title: `Product 1`,
  description: 'Test',
  price: 10,
  discountPercentage: 10,
  stock: 10,
  thumbnail: '',
  images: [],
});
