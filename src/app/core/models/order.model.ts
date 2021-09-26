import {PaymentType} from "../enums/PaymentType";
import {OrderStatus} from "../enums/OrderStatus";
import {ShippingMethod} from "./shippingMethod.model";
import {OrderProduct} from "./orderProduct.model";

export interface Order {
  id?: string;
  orderProducts?: OrderProduct[];
  shipping: ShippingMethod;
  status?: OrderStatus;
  price?: number;
  payment: PaymentType;
  address: string;
  createdDate?: Date;
  updatedDate?: Date;
}
