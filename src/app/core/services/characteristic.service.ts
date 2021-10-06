import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {EnvironmentUrlService} from './environment-url.service';
import {Observable} from "rxjs";
import {Characteristic} from "../models/characteristic.model";

@Injectable({
  providedIn: 'root'
})
export class CharacteristicService {

  constructor(private _httpClient: HttpClient, private _envUrlService: EnvironmentUrlService) {
  }

  getCharacteristicsByCategoryId(id: string): Observable<Characteristic[]> {
    return this._httpClient.get<Characteristic[]>(`${this._envUrlService.api_url}/characteristics/${id}`);
  }
}
