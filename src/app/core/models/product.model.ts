import { User } from "oidc-client";
import { Category } from "./category.model";

export interface Product {
    id?: string;
    ownerId?: string;
    name?: string;
    description?: string;
    category: Category;
    price?: number;
    weight?: number;
    imageUrl?: string;
    characteristics?: Map<string, string>;
    user?: any;
    // raitings?: number;
}