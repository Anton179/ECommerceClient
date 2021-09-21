import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentUrlService } from './environment-url.service';
import {Observable} from "rxjs";
import {ShippingMethod} from "../models/shippingMethod.model";

@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  constructor(private _httpClient: HttpClient, private _envUrlservice: EnvironmentUrlService) { }

  getShippings(): Observable<ShippingMethod[]> {
    return this._httpClient.get<ShippingMethod[]>(`${this._envUrlservice.api_url}/shipping`)
  }
}
