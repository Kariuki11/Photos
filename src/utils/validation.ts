// Validation utilities
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateFile(file: File): ValidationResult {
  // Check file type
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: 'Please upload a valid image file (JPEG, PNG, or WebP)'
    };
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: 'File size must be less than 10MB'
    };
  }

  return { isValid: true };
}

export function validateImageDimensions(file: File): Promise<ValidationResult> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      URL.revokeObjectURL(url);
      
      if (img.width < 100 || img.height < 100) {
        resolve({
          isValid: false,
          error: 'Image dimensions must be at least 100x100 pixels'
        });
      } else if (img.width > 4000 || img.height > 4000) {
        resolve({
          isValid: false,
          error: 'Image dimensions must be less than 4000x4000 pixels'
        });
      } else {
        resolve({ isValid: true });
      }
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve({
        isValid: false,
        error: 'Invalid image file'
      });
    };
    
    img.src = url;
  });
}



