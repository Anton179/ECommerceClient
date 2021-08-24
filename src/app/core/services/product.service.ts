import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient, private envUrlservice: EnvironmentUrlService, private authService: AuthService) { 
  }

  getDiscountProducts(): any {
    return this.http.get(`${this.envUrlservice.api_url}/products/all`);
  }

  getProducts(): any {
    return this.http.get(`${this.envUrlservice.api_url}/products/all`);
  }

  getProduct(id: string): any {
    return this.http.get(`${this.envUrlservice.api_url}/products/${id}`);
  }
}
