'use client'

import { useState, useRef, useCallback } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FileUploadProps {
  onFileSelect: (file: File) => void
  preview: string | null
  type: 'model' | 'clothing'
}

export function FileUpload({ onFileSelect, preview, type }: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      onFileSelect(files[0])
    }
  }, [onFileSelect])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      onFileSelect(files[0])
    }
  }, [onFileSelect])

  const handleClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleRemove = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    onFileSelect(null as any)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [onFileSelect])

  if (preview) {
    return (
      <div className="relative group">
        <div className="relative rounded-xl overflow-hidden bg-gray-100">
          <img
            src={preview}
            alt={`${type} preview`}
            className="w-full h-48 object-cover"
          />
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-2">Click to change image</p>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'border-2 border-dashed rounded-xl p-8 cursor-pointer transition-all duration-300',
        isDragOver
          ? 'border-cyan-400 bg-cyan-50 scale-105'
          : 'border-gray-300 hover:border-cyan-400 hover:bg-gray-50',
        'min-h-[200px] flex flex-col items-center justify-center space-y-4'
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
      />
      
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          {isDragOver ? (
            <Upload className="h-12 w-12 text-cyan-500 animate-bounce" />
          ) : (
            <ImageIcon className="h-12 w-12 text-gray-400" />
          )}
        </div>
        
        <div className="space-y-2">
          <p className="text-lg font-medium text-gray-700">
            {isDragOver ? 'Drop your image here' : 'Drag & drop your image'}
          </p>
          <p className="text-sm text-gray-500">
            or click to browse
          </p>
        </div>
        
        <div className="text-xs text-gray-400 space-y-1">
          <p>Supports: JPEG, PNG, WebP</p>
          <p>Max size: 10MB</p>
        </div>
      </div>
    </div>
  )
}

