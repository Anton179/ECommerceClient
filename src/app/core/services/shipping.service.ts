import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentUrlService } from './environment-url.service';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  constructor(private _httpClient: HttpClient, private _envUrlservice: EnvironmentUrlService) { }

  getShippings(): Observable<any> {
    return this._httpClient.get(`${this._envUrlservice.api_url}/shipping/getAll`)
  }
}
