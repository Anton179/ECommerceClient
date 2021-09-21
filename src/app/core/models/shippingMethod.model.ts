import {Order} from "./order.model";

export interface ShippingMethod {
  id?: string;
  name?: string;
  price?: number;
  orders?: Order[];
  image?: string;
  estimated?: string;
}
