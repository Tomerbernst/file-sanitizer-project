import { Injectable } from "@angular/core";
import { HttpClient, HttpEventType } from "@angular/common/http";
import { catchError, lastValueFrom, map, Observable, throwError } from "rxjs";
import { firstValueFrom } from "rxjs";
import { UploadFile } from "./upload-file.interface";

@Injectable({
  providedIn: "root",
})
export class UploadFileService {
  constructor(private http: HttpClient) {}

  formatFileSize(size: number): string {
    if (size < 1024) {
      return size + " bytes";
    } else if (size < 1024 * 1024) {
      return (size / 1024).toFixed(2) + " KB";
    } else {
      return (size / (1024 * 1024)).toFixed(2) + " MB";
    }
  }
   async uploadFile(file: File, item: UploadFile, fileListData: UploadFile[]){
    const formData = new FormData();
    formData.append("file", file, file.name);
    try {
      const index = fileListData.findIndex((f) => f.name === file.name);
      this.sanitizeFile(formData).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          fileListData[index].progress = Math.round((100 / event.total) * event.loaded);
        } else if (event.type === HttpEventType.Response) {
          fileListData[index].isComplete = true;
          const res = event.body;
          fileListData[index].fileID = this.checkValue(res.res.fileID);
          fileListData[index].isSuccess = this.checkValue(res.res.fileID) !== "" ? true : false;
          fileListData[index].errorDetails = this.checkValue(res.res.errorDetails);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  checkValue(value: string): string {
    if (value === undefined || value === null || value === "") {
      return "";
    }
    return value;
  }

  sanitizeFile(formData: FormData): Observable<any> {
    return this.http.post("http://localhost:3000/upload", formData,{ reportProgress: true,
    observe: "events"});
  }
}
