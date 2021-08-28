import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentUrlService {
  public api_url: string = environment.api_url;
  constructor() { }
}