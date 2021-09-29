import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import {HttpClient, HttpEventType, HttpParams} from '@angular/common/http';
import {EnvironmentUrlService} from "../../../core/services/environment-url.service";

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent {

  public progress: number = 0;
  public message: string = '';

  @Output() public onUploadFinished = new EventEmitter();
  @Input() productId: string | undefined;

  constructor(private http: HttpClient, private _envUrlservice: EnvironmentUrlService) {
  }

  public uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }

    const fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.http.post<{dbPath: string, productId: string}>(`${this._envUrlservice.api_url}/upload?${this.productId != undefined ? 'productId=' + this.productId : ''}`,
      formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / (event.total ?? 0));
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      });
  }
}
