// API response types
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ProcessingStatus {
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress?: number;
  estimatedTime?: number;
}

export interface UploadResponse {
  modelPhotoUrl: string;
  clothingPhotoUrl: string;
  uploadId: string;
}

export interface ProcessResponse {
  images: {
    enhanced_product: string;
    model_front: string;
    product_back: string;
    model_back: string;
  };
  processingTime: number;
  model: string;
}


