import {Order} from "./order.model";

export interface ShippingMethod {
  id?: string;
  name?: string;
  price?: number;
  orders?: Order[];
  imagePath?: string;
  estimated?: string;
}
