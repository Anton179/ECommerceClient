export interface Item {
    id: number;
    title: string;
    description: string;
    category: Category;
    price: number;
    size?: number;
    weight?: number;
}