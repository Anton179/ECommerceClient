import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {CartItem} from '../models/cartItem.model';
import {EnvironmentUrlService} from './environment-url.service';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _notify = new BehaviorSubject<string>('');
  notifyObservable = this._notify.asObservable();

  constructor(private http: HttpClient, private envUrlservice: EnvironmentUrlService) {
  }

  changeState(value: string): void {
    this._notify.next(value);
  }

  addCartItem(cart: CartItem) {
    this.http.post(`${this.envUrlservice.api_url}/cart`, cart).subscribe(() => {
      this.changeState('Product added')
    });
  }

  clearCart(): Observable<void> {
    return this.http.delete<void>(`${this.envUrlservice.api_url}/cart`);
  }

  getNumberOfProducts(): Observable<number> {
    return this.http.get<number>(`${this.envUrlservice.api_url}/cart/getCount`);
  }

  removeCartItem(id: string): Observable<string> {
    return this.http.delete<string>(`${this.envUrlservice.api_url}/cart/${id}`);
  }

  getCart(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.envUrlservice.api_url}/cart`);
  }

  reorderProducts(orderId: string) {
    this.http.post(`${this.envUrlservice.api_url}/cart/reorder/${orderId}`, null).subscribe(() => {
      this.changeState('Products added')
    });
  }
}
