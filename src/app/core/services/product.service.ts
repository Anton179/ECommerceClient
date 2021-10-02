import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {EnvironmentUrlService} from './environment-url.service';
import {PagedRequest} from "../models/pageRequest/pagedRequest.model";
import {PaginatedResult} from "../models/pageRequest/paginatedResult.model";
import {Product} from "../models/product.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _httpClient: HttpClient,
              private _envUrlService: EnvironmentUrlService, private _authService: AuthService) {
  }

  getProducts(pagedRequest: PagedRequest): Observable<PaginatedResult<Product>> {
    const params = this._envUrlService.getParams(pagedRequest)
    return this._httpClient.get<PaginatedResult<Product>>(`${this._envUrlService.api_url}/products?${params.toString()}`);
  }

  getOrderedProducts(pagedRequest: PagedRequest): Observable<PaginatedResult<Product>> {
    const params = this._envUrlService.getParams(pagedRequest);

    return this._httpClient.get<PaginatedResult<Product>>(`${this._envUrlService.api_url}/products/getOrderedProducts?${params.toString()}`);
  }

  updateProduct(product: Product, id: string): Observable<string> {
    return this._httpClient.put<string>(`${this._envUrlService.api_url}/products/${id}`, product);
  }

  getProduct(id: string): Observable<Product> {
    return this._httpClient.get<Product>(`${this._envUrlService.api_url}/products/${id}`);
  }

  createProduct(product: Product): Observable<string> {
    return this._httpClient.post<string>(`${this._envUrlService.api_url}/products`, product);
  }
}
