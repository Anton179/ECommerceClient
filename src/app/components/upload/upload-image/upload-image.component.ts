import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HttpEventType} from '@angular/common/http';
import {UploadService} from "../../../core/services/upload.service";

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent {

  public progress: number = 0;
  public message: string = '';

  @Output() public onUploadFinished = new EventEmitter();
  @Input() imageId: string | undefined;

  constructor(private _uploadService: UploadService) {
  }

  public uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }

    const fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this._uploadService.uploadImage(formData, this.imageId)
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
