'use client'

import { UploadForm } from '@/components/upload/UploadForm'
import { LoadingSpinner } from '@/components/results/LoadingSpinner'
import { ResultGrid } from '@/components/results/ResultGrid'
import { useState } from 'react'

export interface ImageResults {
  enhanced_product?: string
  model_front?: string
  product_back?: string
  model_back?: string
}

export default function Home() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [results, setResults] = useState <ImageResults | null >(null)

 

  const handleProcessingStart = () => {
    setIsProcessing(true)
    setResults(null)
  }


  function handleProcessingComplete(images: ImageResults) {
    setIsProcessing(false);
    setResults(images);
  }

  
  const handleReset = () => {
    setResults(null)
    setIsProcessing(false)
  }

  return (
    <div className="min-h-screen gradient-bg">
      {/* Hero Section */}
      <div className="text-center py-12 px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 fade-in">
          AI Virtual Try-On
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 fade-in">
          Upload your model and clothing — let AI visualize the look for you.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        {!results ? (
          <div className="space-y-8">
            <UploadForm 
              onProcessingStart={handleProcessingStart}
              onProcessingComplete={handleProcessingComplete}
            />
          </div>
        ) : (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 slide-up">
                Your AI-Generated Images
              </h2>
              <button
                onClick={handleReset}
                className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
            <ResultGrid images={results} />
          </div>
        )}
      </div>

      {/* Loading Overlay */}
      {isProcessing && <LoadingSpinner />}
    </div>
  )
}