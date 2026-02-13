export class Product {
  id: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  stock: number;
  thumbnail: string;

  constructor(params: {
    id: string;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    stock: number;
    thumbnail: string;
  }) {
    this.id = params.id;
    this.title = params.title;
    this.description = params.description;
    this.price = params.price;
    this.discountPercentage = params.discountPercentage;
    this.stock = params.stock;
    this.thumbnail = params.thumbnail;
  }

  getDiscountAmount(): number {
    return +(this.price * (this.discountPercentage / 100)).toFixed(2);
  }

  getFinalPrice(): number {
    return this.price - this.getDiscountAmount();
  }

  isInStock(): boolean {
    return this.stock > 0;
  }

  updateStock(quantity: number): void {
    if (quantity >= 0 && this.stock >= quantity) {
      this.stock -= quantity;
    } else if (quantity < 0 && this.stock - quantity >= 0) {
      this.stock -= quantity;
    } else {
      console.warn(`Cannot update stock: Invalid quantity ${quantity}`);
    }
  }

  getFormattedPrice(): string {
    return `$${this.getFinalPrice().toFixed(2)}`;
  }
}
