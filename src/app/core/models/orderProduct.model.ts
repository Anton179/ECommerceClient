import {Product} from "./product.model";
import {User} from "./user.model";


export interface OrderProduct {
  id?: string;
  user?: User;
  product?: Product;
  quantity?: number;
  price?: number;
  createdDate?: Date;
}
