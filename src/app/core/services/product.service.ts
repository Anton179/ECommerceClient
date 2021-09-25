import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {EnvironmentUrlService} from './environment-url.service';
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
              private _envUrlservice: EnvironmentUrlService, private _authService: AuthService) {
  }

  getProducts(pagedRequest: PagedRequest): Observable<PaginatedResult<Product>> {
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

        params = params.append(`RequestFilters.Filters[${index}].operator`, filter.operator ?? FilterOperators.Contains)
      })
    }
    return this._httpClient.get<PaginatedResult<Product>>(`${this._envUrlservice.api_url}/products?${params.toString()}`);
  }

  getOrderedProducts(pagedRequest: PagedRequest): Observable<PaginatedResult<Product>> {
    const params = new HttpParams()
      .append('PageIndex', pagedRequest.pageIndex)
      .append('PageSize', pagedRequest.pageSize)
      .append('ColumnNameForSorting', pagedRequest.columnNameForSorting)
      .append('SortDirection', pagedRequest.sortDirection)

    return this._httpClient.get<PaginatedResult<Product>>(`${this._envUrlservice.api_url}/products/getOrderedProducts?${params.toString()}`);
  }

  getProduct(id: string): Observable<Product> {
    return this._httpClient.get<Product>(`${this._envUrlservice.api_url}/products/${id}`);
  }
}
