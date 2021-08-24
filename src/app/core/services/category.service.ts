import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, private envUrlservice: EnvironmentUrlService) { }

  getMainCategories(): any {
    return this.http.get(`${this.envUrlservice.api_url}/categories/main`);
  }
}
