import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { EnvironmentUrlService } from './environment-url.service';
import {PagedRequest} from "../models/pageRequest/pagedRequest.model";
import {FilterOperators} from "../models/pageRequest/enums/FilterOperators";
import {PaginatedResult} from "../models/pageRequest/paginatedResult.model";
import {Product} from "../models/product.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _httpClient: HttpClient,
              private _envUrlservice: EnvironmentUrlService, private _authService: AuthService) { }

  getProducts(pagedRequest: PagedRequest): Observable<PaginatedResult<Product>> {
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
        params = params.append(`PagedRequest.RequestFilters.Filters[${index}].operator`, filter.operator ?? FilterOperators.Contains)
      })
    }
    return this._httpClient.get<PaginatedResult<Product>>(`${this._envUrlservice.api_url}/products?${params.toString()}`);
  }

  getProduct(id: string): Observable<Product> {
    return this._httpClient.get<Product>(`${this._envUrlservice.api_url}/products/${id}`);
  }
}
