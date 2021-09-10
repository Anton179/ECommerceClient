import {Product} from "./product.model";
import {PaymentType} from "../enums/PaymentType";
import {OrderStatus} from "../enums/OrderStatus";
import {Shipping} from "./shipping.model";

export interface Order {
  Id?: string;
  orderProducts?: [{product: Product, quantity: number}];
  shipping: Shipping;
  status?: OrderStatus;
  payment: PaymentType;
  address: string;
}
