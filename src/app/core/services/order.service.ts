import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {EnvironmentUrlService} from './environment-url.service';
import {Observable} from "rxjs";
import {Order} from "../models/order.model";
import {PagedRequest} from "../models/pageRequest/pagedRequest.model";
import {FilterOperators} from "../models/pageRequest/enums/FilterOperators";
import {PaginatedResult} from "../models/pageRequest/paginatedResult.model";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _httpClient: HttpClient, private _envUrlservice: EnvironmentUrlService) { }

  createOrder(order: Order): Observable<string> {
    console.log(order)
    return this._httpClient.post<string>(`${this._envUrlservice.api_url}/orders`, order);
  }

  updateOrder(order: Order): Observable<string> {
    return this._httpClient.put<string>(`${this._envUrlservice.api_url}/orders`, order);
  }

  getOrder(id: string): Observable<Order> {
    return this._httpClient.get<Order>(`${this._envUrlservice.api_url}/orders/${id}`);
  }

  getOrders(pagedRequest: PagedRequest): Observable<PaginatedResult<Order>> {
    let params = new HttpParams()
      .append('PagedRequest.pageIndex', pagedRequest.pageIndex)
      .append('PagedRequest.pageSize', pagedRequest.pageSize)
      .append('PagedRequest.columnNameForSorting', pagedRequest.columnNameForSorting)
      .append('PagedRequest.sortDirection', pagedRequest.sortDirection)

    if (pagedRequest.requestFilters != null)
    {
      params = params.append('PagedRequest.RequestFilters.LogicalOperator', pagedRequest.requestFilters.logicalOperator)

      pagedRequest.requestFilters.filters.forEach((filter, index) => {
        params = params.append(`PagedRequest.RequestFilters.Filters[${index}].Path`, filter.path)
        params = params.append(`PagedRequest.RequestFilters.Filters[${index}].Value`, filter.value)
        params = params.append(`PagedRequest.RequestFilters.Filters[${index}].operator`, filter.operator ?? FilterOperators.Equals)
      })
    }

    return this._httpClient.get<PaginatedResult<Order>>(`${this._envUrlservice.api_url}/orders?${params.toString()}`);
  }
}
