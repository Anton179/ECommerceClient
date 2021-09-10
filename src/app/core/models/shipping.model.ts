import {Order} from "./order.model";

export interface Shipping {
  id?: string;
  name?: string;
  price?: number;
  orders?: Order[];
  image?: string;
  estimated?: string;
}
