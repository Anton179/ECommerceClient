import {Product} from "./product.model";

export interface CartItem {
  Id?: string;
  productId: string;
  product?: Product;
  quantity: number;
}
