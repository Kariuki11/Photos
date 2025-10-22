// Upload-related types
export interface UploadedFile {
  file: File;
  preview: string;
  name: string;
  size: number;
  type: string;
}

export interface UploadState {
  modelPhoto: UploadedFile | null;
  clothingPhoto: UploadedFile | null;
  isUploading: boolean;
  error: string | null;
}

export type UploadType = 'model' | 'clothing';

