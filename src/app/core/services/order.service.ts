import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentUrlService } from './environment-url.service';
import {Observable} from "rxjs";
import {Order} from "../models/order.model";
import {PagedRequest} from "../models/pageRequest/pagedRequest.model";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _httpClient: HttpClient, private _envUrlservice: EnvironmentUrlService) { }

  createOrder(order: Order): Observable<any> {
    return this._httpClient.post(`${this._envUrlservice.api_url}/orders/create`, order);
  }

  getOrder(id:string): Observable<any> {
    return this._httpClient.get(`${this._envUrlservice.api_url}/orders/get/${id}`);
  }

  getOrders(pagedRequest: PagedRequest): any {
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
      })
    }

    return this._httpClient.get(`${this._envUrlservice.api_url}/orders?${params.toString()}`);
  }
  /*
  * getProducts(pagedRequest: PagedRequest): any {
    let params = new HttpParams()
      .append('PagedRequest.pageIndex', pagedRequest.pageIndex)
      .append('PagedRequest.pageSize', pagedRequest.pageSize)
      .append('PagedRequest.columnNameForSorting', pagedRequest.columnNameForSorting)
      .append('PagedRequest.sortDirection', pagedRequest.sortDirection)

    return this._httpClient.get(`${this._envUrlservice.api_url}/products?${params.toString()}`);
  }*/
}
