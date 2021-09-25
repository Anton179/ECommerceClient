import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {EnvironmentUrlService} from './environment-url.service';
import {Category} from "../models/category.model";
import {Observable} from "rxjs";
import {PagedRequest} from "../models/pageRequest/pagedRequest.model";
import {FilterOperators} from "../models/pageRequest/enums/FilterOperators";
import {PaginatedResult} from "../models/pageRequest/paginatedResult.model";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _httpClient: HttpClient, private _envUrlService: EnvironmentUrlService) {
  }

  getCategories(pagedRequest: PagedRequest): Observable<PaginatedResult<Category>> {
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

    return this._httpClient.get<PaginatedResult<Category>>(`${this._envUrlService.api_url}/categories?${params.toString()}`);
  }
}
