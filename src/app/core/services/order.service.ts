import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {EnvironmentUrlService} from './environment-url.service';
import {Observable} from "rxjs";
import {Order} from "../models/order.model";
import {PagedRequest} from "../models/pageRequest/pagedRequest.model";
import {FilterOperators} from "../models/pageRequest/enums/FilterOperators";
import {PaginatedResult} from "../models/pageRequest/paginatedResult.model";
import {Product} from "../models/product.model";
import {OrderProduct} from "../models/orderProduct.model";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _httpClient: HttpClient, private _envUrlservice: EnvironmentUrlService) {
  }

  createOrder(order: Order): Observable<string> {
    return this._httpClient.post<string>(`${this._envUrlservice.api_url}/orders`, order);
  }

  updateOrder(order: Order): Observable<string> {
    return this._httpClient.put<string>(`${this._envUrlservice.api_url}/orders`, order);
  }

  getOrder(id: string): Observable<Order> {
    return this._httpClient.get<Order>(`${this._envUrlservice.api_url}/orders/${id}`);
  }

  getOrderProducts(pagedRequest: PagedRequest): Observable<PaginatedResult<OrderProduct>> {
    const params = new HttpParams()
      .append('PageIndex', pagedRequest.pageIndex)
      .append('PageSize', pagedRequest.pageSize)
      .append('ColumnNameForSorting', pagedRequest.columnNameForSorting)
      .append('SortDirection', pagedRequest.sortDirection)

    console.log(`${this._envUrlservice.api_url}/orders/products?${params.toString()}`)

    return this._httpClient.get<PaginatedResult<OrderProduct>>(`${this._envUrlservice.api_url}/orders/products?${params.toString()}`);
  }

  getOrders(pagedRequest: PagedRequest): Observable<PaginatedResult<Order>> {
    let params = new HttpParams()
      .append('PageIndex', pagedRequest.pageIndex)
      .append('PageSize', pagedRequest.pageSize)
      .append('ColumnNameForSorting', pagedRequest.columnNameForSorting)
      .append('SortDirection', pagedRequest.sortDirection)

    if (pagedRequest.requestFilters != null) {
      params = params.append('RequestFilters.LogicalOperator', pagedRequest.requestFilters.logicalOperator)

      pagedRequest.requestFilters.filters.forEach((filter, index) => {
        params = params.append(`RequestFilters.Filters[${index}].Path`, filter.path)

        if (filter.value) {
          params = params.append(`RequestFilters.Filters[${index}].Value`, filter.value)
        }

        params = params.append(`RequestFilters.Filters[${index}].operator`, filter.operator ?? FilterOperators.Equals)
      })
    }

    return this._httpClient.get<PaginatedResult<Order>>(`${this._envUrlservice.api_url}/orders?${params.toString()}`);
  }
}
