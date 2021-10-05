import {Component, Inject, OnInit} from '@angular/core';
import {PaymentType} from "../../../core/enums/PaymentType";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {OrderService} from "../../../core/services/order.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ShippingMethod} from "../../../core/models/shippingMethod.model";
import {CartService} from "../../../core/services/cart.service";
import {Router} from "@angular/router";
import {CartItem} from "../../../core/models/cartItem.model";
import {OrderProduct} from "../../../core/models/orderProduct.model";
import {PaymentService} from "../../../core/services/payment.service";

@Component({
  selector: 'app-place-order-dialog',
  templateUrl: './place-order-dialog.component.html',
  styleUrls: ['./place-order-dialog.component.scss']
})
export class PlaceOrderDialogComponent implements OnInit {
  shipping: ShippingMethod;
  orderProducts: OrderProduct[] = [];
  payments = Object.values(PaymentType);
  paymentType: PaymentType = PaymentType.Card;

  placeOrderForm = new FormGroup({
    address: new FormControl(undefined, [
      Validators.required
    ]),
    payment: new FormControl(undefined, [
      Validators.required
    ])
  });

  constructor(private _orderService: OrderService, private _cartService: CartService,
              @Inject(MAT_DIALOG_DATA) public data: any, private _router: Router,
              private dialogRef: MatDialogRef<PlaceOrderDialogComponent>, private _paymentService: PaymentService) {
    this.shipping = data.shipping;

    data.cartItems.forEach((item: CartItem) => {
      const orderProduct: OrderProduct = {product: item.product, quantity: item.quantity}
      this.orderProducts.push(orderProduct)
    })
  }

  ngOnInit(): void {
    this.payments = this.payments.slice(0, this.payments.length / 2)
  }

  onSubmit(): void {
    const paymentType = PaymentType[this.placeOrderForm.controls['payment'].value]

    if (paymentType.toString() === PaymentType.Card.toString()) {
      let price = this.shipping.price ?? 0;
      this.orderProducts.forEach(p => {
        price += (p.product?.price ?? 0) * (p.quantity ?? 0)
      })

      this._paymentService.makePayment(price).subscribe(tokenId => {
        if (tokenId != '') {
          this.placeOrder()
        }
      })
    } else {
      this.placeOrder()
    }
  }

  private placeOrder(): void {
    this._orderService.createOrder({
      orderProducts: this.orderProducts,
      shipping: this.shipping,
      payment: this.paymentType,
      address: this.placeOrderForm.value.address
    }).subscribe((orderId: string) => {
      this._router.navigate([`/orders/${orderId}`])
      this._cartService.changeState('Cart is empty')
    });

    this.dialogRef.close()
  }
}
