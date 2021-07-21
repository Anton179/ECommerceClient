import { Category } from "../enums";

export interface Product {
    id: number;
    title: string;
    description: string;
    category: Category;
    price: number;
    // TODO: Delete ?
    imageUrl: string;
    // TODO: Delete size
    size?: number;
    weight?: number;
    raitings?: number;
}