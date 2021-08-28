import { Product } from "./product.model";

export interface Cart {
    productId: string;
    product?: Product;
    quantity: number;
}