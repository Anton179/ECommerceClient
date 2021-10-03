import {Product} from "./product.model";
import {Characteristic} from "./characteristic.model";

export interface Category {
  id?: string;
  parent?: Category;
  name: string;
  imagePath?: string
  Characteristics?: Characteristic [];
  subCategories?: Category[];
  products?: Product[];
}

