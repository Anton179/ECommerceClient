import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentUrlService } from './environment-url.service';
import {Category} from "../models/category.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, private envUrlservice: EnvironmentUrlService) { }

  getMainCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.envUrlservice.api_url}/categories/main`);
  }
}
