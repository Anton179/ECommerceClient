import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private envUrlservice: EnvironmentUrlService, private authService: AuthService) { 
  }

  getUser(id: string | undefined): any {
    return this.http.get(`${this.envUrlservice.api_url}/users/get/${id}`);
  }
  /* getProducts(): any {
    return this.http.get(`${this.envUrlservice.api_url}/products/all`);
  }*/
}
