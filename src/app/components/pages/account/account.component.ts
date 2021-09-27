import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {OrderService} from "../../../core/services/order.service";
import {PagedRequest} from "../../../core/models/pageRequest/pagedRequest.model";
import {Order} from "../../../core/models/order.model";
import {PaginatedResult} from "../../../core/models/pageRequest/paginatedResult.model";
import {OrderStatus} from "../../../core/enums/OrderStatus";
import {Product} from "../../../core/models/product.model";
import {ProductService} from "../../../core/services/product.service";
import {FilterLogicalOperators} from "../../../core/models/pageRequest/enums/FilterLogicalOperators";
import {FilterOperators} from "../../../core/models/pageRequest/enums/FilterOperators";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  userRole: string = ''
  userName: string = ''
  numberOfOrders: number = 0;
  pendingOrders: number = 0;
  cancelledOrders: number = 0;
  confirmedOrders: number = 0;
  order?: Order;
  products?: Product[];
  OrderStatus = OrderStatus;
  slidesNumber: number[] = [];
  length: number = 0;

  constructor(private _authService: AuthService, private _orderService: OrderService,
              private _productService: ProductService) {
  }

  ngOnInit(): void {
    this._authService.getRole().then(role => {
      this.userRole = role;

      if (role == 'user') {
        this._orderService.getNumberOfOrders().subscribe(count => {
          this.numberOfOrders = count;

          if (count > 0) {
            this.getLastOrder()
          }
        })

        this._orderService.getNumberOfOrders(OrderStatus.Pending).subscribe(count => {
          this.pendingOrders = count;
        })

        this._orderService.getNumberOfOrders(OrderStatus.Confirmed).subscribe(count => {
          this.confirmedOrders = count;
        })

        this._orderService.getNumberOfOrders(OrderStatus.Cancelled).subscribe(count => {
          this.cancelledOrders = count;
        })
      }
      else {
        this._orderService.getNumberOfOrderProducts(OrderStatus.Pending).subscribe(count => {
          this.pendingOrders = count;
        })

        this._orderService.getNumberOfOrderProducts(OrderStatus.Confirmed).subscribe(count => {
          this.confirmedOrders = count;
        })

        this._orderService.getNumberOfOrderProducts(OrderStatus.Cancelled).subscribe(count => {
          this.cancelledOrders = count;
        })

        this.getProducts(0);
      }
    })

    this._authService.getUserName().then(userName => {
      this.userName = userName;
    })
  }


  getProducts(index: number) {
    this._authService.getUserId().then(id => {
      const pagedRequest: PagedRequest = {
        pageIndex: index + 1,
        pageSize: 10,
        sortDirection: 'Descending', columnNameForSorting: 'CreatedDate',
        requestFilters: {
          logicalOperator: FilterLogicalOperators.And,
          filters: [{path: 'OwnerId.ToString()', value: id, operator: FilterOperators.Equals }]
        }
      }

      this._productService.getProducts(pagedRequest).subscribe(paginatedResult => {
        this.products = paginatedResult.items;
        this.length = paginatedResult.total;
      })
    })
  }

  getLastOrder() {
    const request: PagedRequest = {
      pageIndex: 1, pageSize: 1,
      sortDirection: 'Descending', columnNameForSorting: 'CreatedDate'
    }

    this._orderService.getOrders(request).subscribe((paginatedResult: PaginatedResult<Order>) => {
      this.order = paginatedResult.items[0];

      this.slidesNumber = [0];

      let i = (this.order?.orderProducts?.length ?? 0) / 5;
      i += (this.order?.orderProducts?.length ?? 0) % 5 == 0 ? 0 : 1;

      for (let j = 1; j < Math.floor(i); j++) {
        this.slidesNumber.push(5 * j)
        console.log(i)
      }
    })
  }

}
