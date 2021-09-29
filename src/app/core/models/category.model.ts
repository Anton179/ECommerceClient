import {Product} from "./product.model";

export interface Category {
  id?: string;
  parentId?: string
  parent?: Category;
  name: string;
  imagePath?: string
  // Characteristics: Characteristic [];
  subCategories?: Category;
  products?: Product[];
}

