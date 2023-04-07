export interface UploadFile {
    fileID: any;
    name: string;
    size: string;
    isSuccess: boolean;
    errorDetails: string;
    isComplete: boolean;
    progress: number;
  }