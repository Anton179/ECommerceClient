import {environment} from './../../../environments/environment';
import {Injectable} from '@angular/core';
import {PagedRequest} from "../models/pageRequest/pagedRequest.model";
import {HttpParams} from "@angular/common/http";
import {FilterOperators} from "../models/pageRequest/enums/FilterOperators";

@Injectable({
  providedIn: 'root'
})
export class EnvironmentUrlService {
  public api_url: string = environment.api_url;

  public getParams(pagedRequest: PagedRequest): HttpParams {
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

        params = params.append(`RequestFilters.Filters[${index}].operator`, filter.operator ?? FilterOperators.Equals)
      })

    }

    return params;
  }
}
