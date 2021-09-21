import {Component, Inject, OnInit} from '@angular/core';
import {PaymentType} from "../../../core/enums/PaymentType";
import {FormControl, FormGroup} from "@angular/forms";
import {OrderService} from "../../../core/services/order.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ShippingMethod} from "../../../core/models/shippingMethod.model";
import {CartService} from "../../../core/services/cart.service";
import {Router} from "@angular/router";
import {CartItem} from "../../../core/models/cartItem.model";
import {Product} from "../../../core/models/product.model";

@Component({
  selector: 'app-place-order-dialog',
  templateUrl: './place-order-dialog.component.html',
  styleUrls: ['./place-order-dialog.component.scss']
})
export class PlaceOrderDialogComponent implements OnInit {
  shipping: ShippingMethod;
  orderProducts: [{ product?: Product, quantity?: number }] = [{}];
  placeOrderForm = new FormGroup({
    address: new FormControl(''),
    payment: new FormControl(''),
  });
  payments = Object.values(PaymentType);

  constructor(private _orderService: OrderService, private _cartService: CartService,
              @Inject(MAT_DIALOG_DATA) public data: any, private _router: Router) {
    this.shipping = data.shipping;

    data.cartItems.forEach((item: CartItem) => {
      const orderProduct = {product: item.product, quantity: item.quantity}
      this.orderProducts.push(orderProduct)
    })

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.orderProducts = this.orderProducts.slice(1, this.orderProducts.length);

    console.log(this.orderProducts)
  }

  ngOnInit(): void {
    this.payments = this.payments.slice(0, this.payments.length / 2)
  }

  onSubmit() {
    const payment: PaymentType = PaymentType[this.placeOrderForm.value.payment as keyof typeof PaymentType]

    this._orderService.createOrder({
      orderProducts: this.orderProducts,
      shipping: this.shipping,
      payment: payment,
      address: this.placeOrderForm.value.address
    }).subscribe((orderId: string) => {
      this._router.navigate([`/orders/${orderId}`])
      this._cartService.changeState('Cart is empty')
    });


    // this._cartService.clearCart().subscribe(() => {
    //   this._cartService.changeState('Cart is empty');
    // });
  }
}
