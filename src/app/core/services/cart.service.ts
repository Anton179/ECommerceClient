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

  constructor(private _httpClient: HttpClient, private _envUrlService: EnvironmentUrlService) {
  }

  changeState(value: string): void {
    this._notify.next(value);
  }

  addCartItem(cart: CartItem): void {
    this._httpClient.post(`${this._envUrlService.api_url}/cart`, cart).subscribe(() => {
      this.changeState('Product added')
    });
  }

  clearCart(): Observable<void> {
    return this._httpClient.delete<void>(`${this._envUrlService.api_url}/cart`);
  }

  getNumberOfProducts(): Observable<number> {
    return this._httpClient.get<number>(`${this._envUrlService.api_url}/cart/getCount`);
  }

  removeCartItem(id: string): Observable<string> {
    return this._httpClient.delete<string>(`${this._envUrlService.api_url}/cart/${id}`);
  }

  getCart(): Observable<CartItem[]> {
    return this._httpClient.get<CartItem[]>(`${this._envUrlService.api_url}/cart`);
  }

  reorderProducts(orderId: string) {
    this._httpClient.post(`${this._envUrlService.api_url}/cart/reorder/${orderId}`, null).subscribe(() => {
      this.changeState('Products added')
    });
  }
}
