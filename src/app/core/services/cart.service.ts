import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../models/cart.model';
import { EnvironmentUrlService } from './environment-url.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http: HttpClient, private envUrlservice: EnvironmentUrlService) { }

  public notify = new BehaviorSubject<string>('');
  notifyObservable = this.notify.asObservable();

  changeState(value: string): void {
    this.notify.next(value);
  }

  addToCart(cart: Cart) {
    this.http.post(`${this.envUrlservice.api_url}/cart/add`, cart).subscribe(() => {
        this.changeState('Product added')
    });
  }

  clearCart(): Observable<any> {
    return this.http.delete(`${this.envUrlservice.api_url}/cart/clear`);
  }

  getNumberOfProducts(): Observable<any>  {
      return this.http.get(`${this.envUrlservice.api_url}/cart/getCount`);
  }

  getCart(): Observable<any> {
    return this.http.get(`${this.envUrlservice.api_url}/cart/getCart`);
  }
}
