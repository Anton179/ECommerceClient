import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {EnvironmentUrlService} from './environment-url.service';
import {Category} from "../models/category.model";
import {Observable} from "rxjs";
import {PagedRequest} from "../models/pageRequest/pagedRequest.model";
import {PaginatedResult} from "../models/pageRequest/paginatedResult.model";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _httpClient: HttpClient, private _envUrlService: EnvironmentUrlService) {
  }

  getCategories(pagedRequest: PagedRequest): Observable<PaginatedResult<Category>> {
    const params = this._envUrlService.getParams(pagedRequest)
    return this._httpClient.get<PaginatedResult<Category>>(`${this._envUrlService.api_url}/categories?${params.toString()}`);
  }
}
