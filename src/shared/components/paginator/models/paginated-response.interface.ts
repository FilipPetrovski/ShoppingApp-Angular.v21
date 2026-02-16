/* This should be named "items" instead of "products" from Backend for
all paginated reponses, but on this API since i use it only for products,
they specificaly return this as products on the endpoint.. */
export interface PaginatedResponse<T> {
  products: T[];
  total: number;
  skip: number;
  limit: number;
}
