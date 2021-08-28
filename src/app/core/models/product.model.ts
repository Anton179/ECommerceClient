import { Category } from "./category.model";
import { Characteristic } from "./characteristic.model";

export interface Product {
    id?: string;
    ownerId?: string;
    name?: string;
    description?: string;
    category: Category;
    price?: number;
    weight?: number;
    imageUrl?: string;
    characteristics: Characteristic[];
    user?: any;
}