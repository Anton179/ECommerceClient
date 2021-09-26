import {PaymentType} from "../enums/PaymentType";
import {OrderStatus} from "../enums/OrderStatus";
import {ShippingMethod} from "./shippingMethod.model";
import {OrderProduct} from "./orderProduct.model";
import {User} from "./user.model";

export interface Order {
  id?: string;
  orderProducts?: OrderProduct[];
  shipping: ShippingMethod;
  status?: OrderStatus;
  price?: number;
  user?: User;
  payment: PaymentType;
  address: string;
  createdDate?: Date;
  updatedDate?: Date;
}
