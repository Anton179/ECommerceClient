import {Category} from "./category.model";
import {Characteristic} from "./characteristic.model";
import {User} from "./user.model"

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
  user?: User;
  inStock: boolean;
}
