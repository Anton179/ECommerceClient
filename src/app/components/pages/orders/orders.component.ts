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
import {Filter} from "../../../core/models/pageRequest/filter.model";
import {PagedRequest} from "../../../core/models/pageRequest/pagedRequest.model";
import {AuthService} from "../../../core/services/auth.service";
import {OrderProduct} from "../../../core/models/orderProduct.model";
import {ConfirmOrderDialogComponent} from "../../dialogs/confirm-order-dialog/confirm-order-dialog.component";
import {Product} from "../../../core/models/product.model";

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
  timeFilterArray: string[] = ['All time', 'Last 7 Days', 'Last 30 Days', 'Last 6 Months']
  orderProducts: OrderProduct[] = [];
  userRole: string = '';
  length: number = 0;
  pageIndex: number = 0;

  constructor(private _orderService: OrderService, private _router: Router,
              private _route: ActivatedRoute, private _cartService: CartService,
              public dialog: MatDialog, private _authService: AuthService) {
    const arr = Object.keys(this.OrderStatus).filter(k => isNaN(Number(k)))

    arr.forEach(status => {
      this.status.push(status)
    })
  }

  ngOnInit(): void {
    this._authService.getRole().then(role => {
      this.userRole = role;
      this.filterStatus(0);
    })
  }

  filterStatus(pageIndex: number) {
    const request: PagedRequest = {
      pageIndex: pageIndex + 1, pageSize: 10,
      sortDirection: 'Descending', columnNameForSorting: 'CreatedDate',
      requestFilters: {
        logicalOperator: FilterLogicalOperators.And,
        filters: []
      }
    }

    const orderStatus: number = Object.keys(this.OrderStatus)
      .filter(k => isNaN(Number(k)))
      .findIndex(x => x == this.selectedOrderStatus)

    const timeFilter: Filter | null = this.getTimeFilter();

    if (timeFilter) {
      request.requestFilters?.filters.push(timeFilter)
    }

    if (this.userRole == 'vendor') {
      if (orderStatus != -1) {
        request.requestFilters?.filters.push({
          path: "Order.Status",
          value: orderStatus.toString(),
          operator: FilterOperators.EqualsNumber
        })
      }

      this._orderService.getOrderProducts(request)
        .subscribe((paginatedResult: PaginatedResult<OrderProduct>) => {
          this.orderProducts = paginatedResult.items;
          this.length = paginatedResult.total
        })
    } else {
      if (orderStatus != -1) {
        request.requestFilters?.filters.push({
          path: "Status",
          value: orderStatus.toString(),
          operator: FilterOperators.EqualsNumber
        })
      }

      this._orderService.getOrders(request)
        .subscribe((paginatedResult: PaginatedResult<Order>) => {
          this.orders = paginatedResult.items;
          this.length = paginatedResult.total
        })
    }
  }

  cancelOrder(id: string | undefined) {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.data = {
      orderId: id
    };
    matDialogConfig.disableClose = true;

    const dialogRef = this.dialog.open(CancelOrderDialogComponent, matDialogConfig);

    dialogRef.afterClosed().subscribe();
  }

  confirmOrder(id: string | undefined) {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.data = {
      orderId: id
    };
    matDialogConfig.disableClose = true;

    const dialogRef = this.dialog.open(ConfirmOrderDialogComponent, matDialogConfig);

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

  private getTimeFilter(): Filter | null {
    let filter: Filter | null = null;
    switch (this.timeFilter) {
      case 'Last 7 Days': {
        filter = {path: "CreatedDate >= DateTime.Today.AddDays(-7)", operator: FilterOperators.Custom}
        break;
      }
      case 'Last 30 Days': {
        filter = {path: "CreatedDate >= DateTime.Today.AddDays(-30)", operator: FilterOperators.Custom}
        break;
      }
      case 'Last 6 Months': {
        filter = {path: "CreatedDate >= DateTime.Today.AddMonths(-6)", operator: FilterOperators.Custom}
        break;
      }
    }
    return filter;
  }
}
