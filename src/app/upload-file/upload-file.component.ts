import { Component, ViewChild } from '@angular/core';
import { UploadFileService } from './upload-file-service';
import { UploadFile } from './upload-file.interface';
import { StatusBarComponent } from "./status-bar/status-bar.component";

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})


export class UploadFileComponent {
  readonly  MAX_FILES: number = 5;
  fileListData: UploadFile[] = [];
  @ViewChild(StatusBarComponent) statusBarComponent: StatusBarComponent;

  constructor(private uploadFileService:UploadFileService){}

  async handleFileInput(event: Event) {
    const files: FileList = (event.target as HTMLInputElement).files;
      for (let i = 0; i < files.length; i++) {
        if(this.fileListData.length < this.MAX_FILES) {
          const file = files[i];
          const item: UploadFile= {
            fileID: "",
            name: file.name,
            size: this.uploadFileService.formatFileSize(file.size),
            isSuccess: false,
            errorDetails: "",
            isComplete: false,
            progress: 0,
          };
          this.fileListData.push(item);
          //this.startProgress(item);

          await this.uploadFileService.uploadFile(file, item, this.fileListData);
      }
    } 
  }
  
  startProgress(item: UploadFile) {
    let progress = 0;
    const intervalId = setInterval(() => {
      progress += 1;
      item.progress = progress;
      if (progress === 100) {
        clearInterval(intervalId);
        item.isComplete = true;
      }
    }, 100);
  }


}
