import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentUrlService } from './environment-url.service';
import {Observable} from "rxjs";
import {Order} from "../models/order.model";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _httpClient: HttpClient, private _envUrlservice: EnvironmentUrlService) { }

  createOrder(order: Order) {
    console.log(order)
    return this._httpClient.post(`${this._envUrlservice.api_url}/orders/create`, order);
  }
}
