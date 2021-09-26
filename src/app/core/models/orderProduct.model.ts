import {Product} from "./product.model";
import {User} from "./user.model";
import {OrderStatus} from "../enums/OrderStatus";


export interface OrderProduct {
  id?: string;
  user?: User;
  product?: Product;
  quantity?: number;
  price?: number;
  status?: OrderStatus;
  createdDate?: Date;
}
