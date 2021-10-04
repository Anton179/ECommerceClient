import {AfterContentChecked, Component, Inject, OnInit, ViewChild} from '@angular/core';
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
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-place-order-dialog',
  templateUrl: './place-order-dialog.component.html',
  styleUrls: ['./place-order-dialog.component.scss']
})
export class PlaceOrderDialogComponent implements OnInit, AfterContentChecked {
  static paymentId?: string;
  payed: boolean = false;
  shipping: ShippingMethod;
  orderProducts: OrderProduct[] = [];
  payments = Object.values(PaymentType);
  paymentType: PaymentType = PaymentType.Card;
  @ViewChild('payButton') payButton!: MatButton;

  placeOrderForm = new FormGroup({
    address: new FormControl(undefined, [
      Validators.required
    ]),
    payment: new FormControl(undefined, [
      Validators.required
    ]),
    payed: new FormControl(false)
  });

  constructor(private _orderService: OrderService, private _cartService: CartService,
              @Inject(MAT_DIALOG_DATA) public data: any, private _router: Router,
              private dialogRef: MatDialogRef<PlaceOrderDialogComponent>, private _paymentService: PaymentService) {
    this.shipping = data.shipping;

    data.cartItems.forEach((item: CartItem) => {
      const orderProduct: OrderProduct = {product: item.product, quantity: item.quantity}
      this.orderProducts.push(orderProduct)
    })

    PlaceOrderDialogComponent.paymentId = undefined;
  }

  ngOnInit(): void {
    this.payments = this.payments.slice(0, this.payments.length / 2)
  }

  pay() {
    const price = this.orderProducts.map(p => (p?.product?.price ?? 0) * (p.quantity ?? 0))[0] + (this.shipping?.price ?? 0)
    this._paymentService.makePayment(price)
    this.paymentType = PaymentType[this.placeOrderForm.value.payment as keyof typeof PaymentType]
  }

  onSubmit() {
    this.placeOrderForm.controls['payed'].markAsTouched()
    this.checkPayment()

    if (this.placeOrderForm.valid) {
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

  checkPayment() {
    const paymentType = PaymentType[this.placeOrderForm.controls['payment'].value]
    this.placeOrderForm.controls['payed'].setErrors(null)

    if (paymentType.toString() === PaymentType.Card.toString()) {
      if (!this.payed) {
        this.placeOrderForm.controls['payed'].setErrors(Validators.requiredTrue)
      }
    }

  }

  paymentChange(value: number) {
    this.checkPayment()

    if (PaymentType[value].toString() === PaymentType.Card.toString()) {
      this.payButton.disabled = false;
    } else {
      this.payButton.disabled = true;
    }
  }

  ngAfterContentChecked(): void {
    this.payed = PlaceOrderDialogComponent.paymentId != undefined

    if (this.payed) {
      this.placeOrderForm.controls['payed'].setErrors(null)
      this.payButton.disabled = true;
      this.placeOrderForm.controls['payment'].disable()
    }
  }
}
