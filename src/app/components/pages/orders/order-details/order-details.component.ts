import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {OrderService} from "../../../../core/services/order.service";
import {Order} from "../../../../core/models/order.model";
import {OrderStatus} from "../../../../core/enums/OrderStatus";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  constructor(private _activateRoute: ActivatedRoute, private _orderService: OrderService) { }

  order: Order | undefined;
  test: OrderStatus = OrderStatus.Confirmed;
  OrderStatus = OrderStatus;

  ngOnInit() {
    this._activateRoute.paramMap.pipe(
      switchMap(params => params.getAll('id'))
    )
    .subscribe(data => {
      this._orderService.getOrder(data).subscribe((order: Order) => {
        this.order = order;
        console.log(OrderStatus[order.status ?? 2])
      });
    });
  }

}
