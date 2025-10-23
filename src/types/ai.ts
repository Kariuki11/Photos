// AI service types
export interface AIProcessingRequest {
  modelPhoto: string; // Base64 or URL
  clothingPhoto: string; // Base64 or URL
}

export interface AIProcessingResponse {
  images: {
    enhanced_product: string;
    model_front: string;
    product_back: string;
    model_back: string;
  };
  processingTime: number;
  model: string;
}

export interface AIError {
  code: string;
  message: string;
  details?: any;
}

export type AIService = 'replicate' | 'openai' | 'huggingface';

export interface AIServiceConfig {
  apiKey: string;
  model: string;
  timeout: number;
}


