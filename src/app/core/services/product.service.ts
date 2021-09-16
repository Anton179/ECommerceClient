import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { EnvironmentUrlService } from './environment-url.service';
import {PagedRequest} from "../models/pageRequest/pagedRequest.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private _httpClient: HttpClient, private _envUrlservice: EnvironmentUrlService, private _authService: AuthService) {
  }

  getDiscountProducts(pagedRequest: PagedRequest): any {
    let params = new HttpParams()
      .append('PagedRequest.pageIndex', pagedRequest.pageIndex)
      .append('PagedRequest.pageSize', pagedRequest.pageSize)
      .append('PagedRequest.columnNameForSorting', pagedRequest.columnNameForSorting)
      .append('PagedRequest.sortDIndex', pagedRequest.pageIndex)

    if (pagedRequest.requestFilters != null)
    {
      params = params.append('PagedRequest.RequestFilters.LogicalOperator', pagedRequest.requestFilters.logicalOperator)

      pagedRequest.requestFilters.filters.forEach((filter, index) => {
        params = params.append(`PagedRequest.RequestFilters.Filters[${index}].Path`, filter.path)
        params = params.append(`PagedRequest.RequestFilters.Filters[${index}].Value`, filter.value)
      })
    }

    return this._httpClient.get(`${this._envUrlservice.api_url}/products?${params.toString()}`);
  }

  getProducts(pagedRequest: PagedRequest): any {
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
    return this._httpClient.get(`${this._envUrlservice.api_url}/products?${params.toString()}`);
  }

  getProduct(id: string): any {
    return this._httpClient.get(`${this._envUrlservice.api_url}/products/${id}`);
  }
}
