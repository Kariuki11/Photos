'use client'

import { useState, useCallback } from 'react'
import { FileUpload } from './FileUpload'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Camera, Shirt } from 'lucide-react'
import { validateFile } from '@/utils/validation'
import { createImagePreview } from '@/utils/image'

interface UploadFormProps {
  onProcessingStart: () => void
  onProcessingComplete: (image: string, step: number) => void
}

export function UploadForm({ onProcessingStart, onProcessingComplete }: UploadFormProps) {
  const [modelPhoto, setModelPhoto] = useState<File | null>(null)
  const [clothingPhoto, setClothingPhoto] = useState<File | null>(null)
  // const [step, setStep] = useState<number>(0)
  const [modelPreview, setModelPreview] = useState<string | null>(null)
  const [clothingPreview, setClothingPreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileSelect = useCallback(async (file: File, type: 'model' | 'clothing') => {
    setError(null)
    
    // Validate file
    const validation = validateFile(file)
    if (!validation.isValid) {
      setError(validation.error || 'Invalid file')
      return
    }

    try {
      // Create preview
      const preview = await createImagePreview(file)
      
      if (type === 'model') {
        setModelPhoto(file)
        setModelPreview(preview)
      } else {
        setClothingPhoto(file)
        setClothingPreview(preview)
      }
    } catch (err) {
      setError('Failed to process image')
      console.log (err)
    }
  }, [])

  const handleGenerate = async () => {
    if (!modelPhoto || !clothingPhoto) {
      setError('Please upload both model and clothing photos')
      return
    }

    setIsUploading(true)
    setError(null)
    onProcessingStart()

    try {
      // Create FormData
      const formData = new FormData()
      formData.append('modelPhoto', modelPhoto)
      formData.append('clothingPhoto', clothingPhoto)

      for (let index = 0; index < 4; index++) {
        formData.append('step', index.toString())
        const response = await fetch('/api/ai', {
          method: 'POST',
          body: formData,
        })
        if (!response.ok) {
          throw new Error('Failed to process images')
        }
  
        const results = await response.json()
        onProcessingComplete(results.data.image, index++)
      }

      
      // }
      // Call API
      // const response = await fetch('/api/ai', {
      //   method: 'POST',
      //   body: formData,
      // })

      // if (!response.ok) {
      //   throw new Error('Failed to process images')
      // }

      // const results = await response.json()
      // onProcessingComplete(results)
    } catch (err) {
      setError('Failed to generate images. Please try again.')
      setIsUploading(false)
      console.log (err)
    }
  }

  const canGenerate = modelPhoto && clothingPhoto && !isUploading

  return (
    <div className="space-y-8">
      {/* Upload Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Model Photo Upload */}
        <Card className="p-6 upload-hover">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Camera className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Upload Model Photo</h3>
            <FileUpload
              onFileSelect={(file) => handleFileSelect(file, 'model')}
              preview={modelPreview}
              type="model"
            />
          </div>
        </Card>

        {/* Clothing Photo Upload */}
        <Card className="p-6 upload-hover">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Shirt className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Upload Clothing Item</h3>
            <FileUpload
              onFileSelect={(file) => handleFileSelect(file, 'clothing')}
              preview={clothingPreview}
              type="clothing"
            />
          </div>
        </Card>
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-center">
          <p className="text-red-600 bg-red-50 px-4 py-2 rounded-lg inline-block">
            {error}
          </p>
        </div>
      )}

      {/* Generate Button */}
      <div className="text-center">
        <Button
          onClick={handleGenerate}
          disabled={!canGenerate}
          className={`px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 ${
            canGenerate
              ? 'gradient-button text-white hover:shadow-lg hover:scale-105 glow-effect'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          ✨ Generate AI Images
        </Button>
      </div>

      {/* Upload Status */}
      {isUploading && (
        <div className="text-center">
          <p className="text-gray-600">Preparing your images...</p>
        </div>
      )}
    </div>
  )
}

