import {Product} from "./product.model";
import {PaymentType} from "../enums/PaymentType";
import {OrderStatus} from "../enums/OrderStatus";
import {Shipping} from "./shipping.model";

export interface Order {
  id?: string;
  orderProducts?: [{product: Product, quantity: number}];
  shipping: Shipping;
  status?: OrderStatus;
  payment: PaymentType;
  address: string;
  createdDate?: Date;
  updatedDate?: Date;
}
