import {Product} from "./product.model";
import {PaymentType} from "../enums/PaymentType";
import {OrderStatus} from "../enums/OrderStatus";
import {ShippingMethod} from "./shippingMethod.model";

export interface Order {
  id?: string;
  orderProducts?: { product?: Product, quantity?: number }[];
  shipping: ShippingMethod;
  status?: OrderStatus;
  price?: number;
  payment: PaymentType;
  address: string;
  createdDate?: Date;
  updatedDate?: Date;
}
