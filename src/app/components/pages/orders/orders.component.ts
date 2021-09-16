import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../../core/services/order.service";
import {Order} from "../../../core/models/order.model";
import {PaginatedResult} from "../../../core/models/pageRequest/paginatedResult.model";
import {OrderStatus} from "../../../core/enums/OrderStatus";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  OrderStatus = OrderStatus;
  status: string[];
  orderStatusFilter: string = 'All orders';
  timeFilter: string = 'All time';

  constructor(private _orderService: OrderService, private _router: Router, private _route: ActivatedRoute) {
    this.status = Object.keys(this.OrderStatus).filter(k => isNaN(Number(k)))
  }

  ngOnInit(): void {
    this._orderService.getOrders({pageIndex:0, pageSize:10,
      sortDirection: 'Descending', columnNameForSorting: 'CreatedDate'})
      .subscribe((paginatedResult: PaginatedResult<Order>) => {
        this.orders = paginatedResult.items;
      })
  }

  orderDetails(id: string | undefined) {
    this._router.navigate([id], {relativeTo: this._route});
  }
}
