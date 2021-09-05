import { Product } from "./product.model";

export interface Cart {
    Id?: string;
    productId: string;
    product?: Product;
    quantity: number;
}