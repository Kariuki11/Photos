'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Download, Eye } from 'lucide-react'

interface ResultCardProps {
  imageUrl: string
  label: string
  index: number
}

export function ResultCard({ imageUrl, label, index }: ResultCardProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${label.toLowerCase().replace(/\s+/g, '-')}.jpg`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
      <div
        className="relative aspect-square bg-gray-100"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image */}
        <img
          src={imageUrl}
          alt={label}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          onLoad={() => setIsLoaded(true)}
        />
        
        {/* Loading placeholder */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-cyan-400 rounded-full animate-spin"></div>
          </div>
        )}
        
        {/* Overlay with actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-black/50 flex items-center justify-center space-x-4"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            className="p-3 bg-white/90 text-gray-800 rounded-full hover:bg-white transition-colors"
          >
            <Download className="h-5 w-5" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open(imageUrl, '_blank')}
            className="p-3 bg-white/90 text-gray-800 rounded-full hover:bg-white transition-colors"
          >
            <Eye className="h-5 w-5" />
          </motion.button>
        </motion.div>
      </div>
      
      {/* Label */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-center">{label}</h3>
      </div>
    </Card>
  )
}
