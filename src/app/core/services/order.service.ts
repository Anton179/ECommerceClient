import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {EnvironmentUrlService} from './environment-url.service';
import {Observable} from "rxjs";
import {Order} from "../models/order.model";
import {PagedRequest} from "../models/pageRequest/pagedRequest.model";
import {PaginatedResult} from "../models/pageRequest/paginatedResult.model";
import {OrderProduct} from "../models/orderProduct.model";
import {OrderStatus} from "../enums/OrderStatus";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _httpClient: HttpClient, private _envUrlService: EnvironmentUrlService) {
  }

  createOrder(order: Order): Observable<string> {
    return this._httpClient.post<string>(`${this._envUrlService.api_url}/orders`, order);
  }

  updateOrder(order: Order): Observable<string> {
    return this._httpClient.put<string>(`${this._envUrlService.api_url}/orders`, order);
  }

  getOrder(id: string): Observable<Order> {
    return this._httpClient.get<Order>(`${this._envUrlService.api_url}/orders/${id}`);
  }

  getNumberOfOrders(orderStatus?: OrderStatus): Observable<number> {
    return orderStatus === undefined ?
      this._httpClient.get<number>(`${this._envUrlService.api_url}/orders/getCount`) :
      this._httpClient.get<number>(`${this._envUrlService.api_url}/orders/getCount?Status=${orderStatus}`);
  }

  getNumberOfOrderProducts(orderStatus?: OrderStatus): Observable<number> {
    return orderStatus === undefined ?
      this._httpClient.get<number>(`${this._envUrlService.api_url}/orders/getProductsCount`) :
      this._httpClient.get<number>(`${this._envUrlService.api_url}/orders/getProductsCount?Status=${orderStatus}`);
  }

  getOrderProducts(pagedRequest: PagedRequest): Observable<PaginatedResult<OrderProduct>> {
    const params = this._envUrlService.getParams(pagedRequest)
    return this._httpClient.get<PaginatedResult<OrderProduct>>(`${this._envUrlService.api_url}/orders/products`, {params: params});
  }

  getOrders(pagedRequest: PagedRequest): Observable<PaginatedResult<Order>> {
    const params = this._envUrlService.getParams(pagedRequest)
    return this._httpClient.get<PaginatedResult<Order>>(`${this._envUrlService.api_url}/orders`, {params: params});
  }
}
