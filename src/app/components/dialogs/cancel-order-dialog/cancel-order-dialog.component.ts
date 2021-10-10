import {Component, Inject} from '@angular/core';
import {OrderService} from "../../../core/services/order.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {Order} from "../../../core/models/order.model";
import {OrderStatus} from "../../../core/enums/OrderStatus";

@Component({
  selector: 'app-cancel-order-dialog',
  templateUrl: './cancel-order-dialog.component.html',
  styleUrls: ['./cancel-order-dialog.component.scss']
})
export class CancelOrderDialogComponent {

  order?: Order;

  constructor(private _orderService: OrderService, @Inject(MAT_DIALOG_DATA) public data: any,
              private _router: Router) {
    this._orderService.getOrder(data.orderId).subscribe((order: Order) => {
      this.order = order;
    })
  }

  cancelOrder(): void {
    if (this.order) {
      this.order.status = OrderStatus.Cancelled;

      this._orderService.updateOrder(this.order).subscribe(() => {
        this._router.navigate([`/orders/${this.order?.id}`])
      })
    }
  }
}
