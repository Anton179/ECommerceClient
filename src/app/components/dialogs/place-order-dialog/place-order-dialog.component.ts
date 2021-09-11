import {Component, Inject, OnInit} from '@angular/core';
import {PaymentType} from "../../../core/enums/PaymentType";
import {FormControl, FormGroup} from "@angular/forms";
import {OrderService} from "../../../core/services/order.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Shipping} from "../../../core/models/shipping.model";
import {CartService} from "../../../core/services/cart.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-place-order-dialog',
  templateUrl: './place-order-dialog.component.html',
  styleUrls: ['./place-order-dialog.component.scss']
})
export class PlaceOrderDialogComponent implements OnInit {
  shipping: Shipping;
  constructor(private _orderService: OrderService, private _cartService: CartService,
              @Inject(MAT_DIALOG_DATA) public data: any, private  _router: Router) {
    this.shipping = this.data.shipping;
  }

  placeOrderForm = new FormGroup({
    address: new FormControl(''),
    payment: new FormControl(''),
  });

  payments = Object.values(PaymentType);

  ngOnInit(): void {
    this.payments = this.payments.slice(0, this.payments.length / 2)
  }

  onSubmit() {
    let payment: PaymentType = PaymentType[this.placeOrderForm.value.payment as keyof typeof PaymentType]

    this._orderService.createOrder({shipping: this.shipping,
      payment: payment,
      address: this.placeOrderForm.value.address}).subscribe((orderId: string) => {
        this._router.navigate([`/orders/${orderId}`])
    });


    this._cartService.clearCart().subscribe(() => {
      this._cartService.changeState('Cart is empty');
    });
  }
}
