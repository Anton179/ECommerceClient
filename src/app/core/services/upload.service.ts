import {HttpClient, HttpEvent} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {EnvironmentUrlService} from './environment-url.service';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private _httpClient: HttpClient, private _envUrlservice: EnvironmentUrlService) {
  }

  uploadImage(formData: FormData, imageId?: string): Observable<HttpEvent<{ dbPath: string, productId: string }>> {
    return this._httpClient.post<{ dbPath: string, productId: string }>(`${this._envUrlservice.api_url}/upload?${imageId != undefined ? 'imageId=' + imageId : ''}`,
      formData, {reportProgress: true, observe: 'events'})
  }
}
