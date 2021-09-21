import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../../core/services/order.service";
import {Order} from "../../../core/models/order.model";
import {PaginatedResult} from "../../../core/models/pageRequest/paginatedResult.model";
import {OrderStatus} from "../../../core/enums/OrderStatus";
import {ActivatedRoute, Router} from "@angular/router";
import {CartService} from "../../../core/services/cart.service";
import {FilterLogicalOperators} from "../../../core/models/pageRequest/enums/FilterLogicalOperators";
import {FilterOperators} from "../../../core/models/pageRequest/enums/FilterOperators";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CancelOrderDialogComponent} from "../../dialogs/cancel-order-dialog/cancel-order-dialog.component";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  OrderStatus = OrderStatus;
  status: string[] = ['All orders'];
  selectedOrderStatus: string = 'All orders';
  timeFilter: string = 'All time';

  constructor(private _orderService: OrderService, private _router: Router,
              private _route: ActivatedRoute, private _cartService: CartService,
              public dialog: MatDialog) {
    let arr = Object.keys(this.OrderStatus).filter(k => isNaN(Number(k)))

    arr.forEach(status => {
      this.status.push(status)
    })
  }

  ngOnInit(): void {
    this._orderService.getOrders({
      pageIndex: 0, pageSize: 10,
      sortDirection: 'Descending', columnNameForSorting: 'CreatedDate'
    })
      .subscribe((paginatedResult: PaginatedResult<Order>) => {
        this.orders = paginatedResult.items;
      })
  }

  filterStatus() {
    console.log(this.selectedOrderStatus)

    console.log(Object.keys(this.OrderStatus).filter(k => isNaN(Number(k))).findIndex(x => x == this.selectedOrderStatus))
    let orderStatus: number = Object.keys(this.OrderStatus)
      .filter(k => isNaN(Number(k)))
      .findIndex(x => x == this.selectedOrderStatus)

    if (orderStatus == -1)
    {
      this._orderService.getOrders({
        pageIndex: 0, pageSize: 10,
        sortDirection: 'Descending', columnNameForSorting: 'CreatedDate'
      })
        .subscribe((paginatedResult: PaginatedResult<Order>) => {
          this.orders = paginatedResult.items;
        })
    }
    else {
      this._orderService.getOrders({
        pageIndex: 0, pageSize: 10,
        sortDirection: 'Descending', columnNameForSorting: 'CreatedDate',
        requestFilters: {logicalOperator: FilterLogicalOperators.And,
          // filters: [{path: "x => x.Status", value: `(OrderStatus)${orderStatus}`, operator: FilterOperators.Equals}]}
          filters: [{path: "x => x.Status", value: orderStatus.toString(), operator: FilterOperators.EqualsNumber}]}
      })
        .subscribe((paginatedResult: PaginatedResult<Order>) => {
          this.orders = paginatedResult.items;
        })
    }
  }

  cancelOrder(id: string | undefined) {
    let matDialogConfig = new MatDialogConfig();
    matDialogConfig.data = {
      orderId: id
    };
    matDialogConfig.disableClose = true;

    const dialogRef = this.dialog.open(CancelOrderDialogComponent, matDialogConfig);

    dialogRef.afterClosed().subscribe();
  }

  reorder(id: string | undefined) {
    this._cartService.reorderProducts(id ?? '');
  }

  addToCart(id: string | undefined) {
    this._cartService.addCartItem({productId: id ?? '', quantity: 1})
  }

  orderDetails(id: string | undefined) {
    this._router.navigate([id], {relativeTo: this._route});
  }
}
