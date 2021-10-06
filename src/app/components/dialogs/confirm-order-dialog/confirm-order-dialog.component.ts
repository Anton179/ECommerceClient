import {Component, Inject} from '@angular/core';
import {OrderService} from "../../../core/services/order.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {Order} from "../../../core/models/order.model";
import {OrderStatus} from "../../../core/enums/OrderStatus";

@Component({
  selector: 'app-confirm-order-dialog',
  templateUrl: './confirm-order-dialog.component.html',
  styleUrls: ['./confirm-order-dialog.component.scss']
})
export class ConfirmOrderDialogComponent {
  order?: Order;

  constructor(private _orderService: OrderService, @Inject(MAT_DIALOG_DATA) public data: any,
              private _router: Router) {
    this._orderService.getOrder(data.orderId).subscribe((order: Order) => {
      this.order = order;
    })
  }

  confirmOrder(): void {
    if (this.order) {
      this.order.status = OrderStatus.Confirmed;

      this._orderService.updateOrder(this.order).subscribe(() => {
        this._router.navigate([`/orders/${this.order?.id}`])
      })
    }
  }
}
