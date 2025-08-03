'use client'

import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import OptimizedImage from './OptimizedImage'

interface SelfieInstructionPageProps {
  onTakeSelfie: (imageData: string) => void
  onUploadFromGallery: (imageData: string) => void
}

export default function SelfieInstructionPage({ onTakeSelfie, onUploadFromGallery }: SelfieInstructionPageProps) {
  const router = useRouter()
  const [showCamera, setShowCamera] = useState(false)
  const [showFileUpload, setShowFileUpload] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const handleBack = () => {
    router.push('/')
  }

  const startCamera = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setShowCamera(true)
      }
    } catch (err) {
      console.error('Error accessing camera:', err)
      setError('Unable to access camera. Please check your camera permissions or try uploading from gallery.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    setShowCamera(false)
  }, [])

  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      
      if (context) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        context.drawImage(video, 0, 0)
        
        const imageData = canvas.toDataURL('image/jpeg', 0.8)
        setCapturedImage(imageData)
        stopCamera()
      }
    }
  }, [stopCamera])

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setError('File size too large. Please select an image smaller than 10MB.')
        return
      }
      
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file.')
        return
      }
      
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setCapturedImage(result)
        setShowFileUpload(false)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const retakePhoto = () => {
    setCapturedImage(null)
    setError(null)
  }

  const confirmPhoto = () => {
    if (capturedImage) {
      onTakeSelfie(capturedImage)
    }
  }

  const openFileUpload = () => {
    setShowFileUpload(true)
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  // Camera Interface
  if (showCamera) {
    return (
      <div className="min-h-screen bg-black">
        <header className="sticky top-0 z-40 bg-black border-b border-gray-700">
          <div className="max-w-2xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={stopCamera}
                className="p-2 text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="flex flex-col items-center">
                <span className="text-xl font-semibold text-white">Camera</span>
                <span className="text-sm text-gray-400">Take your selfie</span>
              </div>
              <div className="w-24"></div>
            </div>
          </div>
        </header>

        <main className="relative">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-screen object-cover"
          />
          
          {/* Camera overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-80 h-96 border-4 border-white rounded-lg relative">
              {/* Face guide overlay */}
              <div className="absolute inset-4 border-2 border-white border-dashed rounded-lg opacity-50"></div>
            </div>
          </div>

          {/* Camera controls */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center">
            <div className="flex items-center space-x-6">
              <button
                onClick={stopCamera}
                className="p-4 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <button
                onClick={capturePhoto}
                className="p-6 bg-white rounded-full hover:bg-gray-100 transition-colors"
              >
                <div className="w-12 h-12 bg-white rounded-full border-4 border-gray-300"></div>
              </button>
              
              <button
                onClick={openFileUpload}
                className="p-4 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </button>
            </div>
          </div>
        </main>

        <canvas ref={canvasRef} className="hidden" />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>
    )
  }

  // Photo Preview
  if (capturedImage) {
    return (
      <div className="min-h-screen bg-white">
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
          <div className="max-w-2xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={retakePhoto}
                className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex flex-col items-center">
                <span className="text-xl font-semibold text-gray-800">Review Photo</span>
                <span className="text-sm text-gray-600">Is this photo good?</span>
              </div>
              <div className="w-24"></div>
            </div>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Review Your Photo
            </h1>
            <p className="text-lg text-gray-600">
              Make sure your face is clearly visible and well-lit
            </p>
          </div>

          <div className="mb-8">
            <div className="relative w-full max-w-md mx-auto">
              <img
                src={capturedImage}
                alt="Captured selfie"
                className="w-full h-auto rounded-lg border-4 border-gray-200"
                loading="lazy"
              />
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={confirmPhoto}
              className="w-full bg-black text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              USE THIS PHOTO
            </button>
            <button
              onClick={retakePhoto}
              className="w-full bg-gray-200 text-gray-800 py-4 px-8 rounded-lg font-semibold text-lg hover:bg-gray-300 transition-all duration-300"
            >
              RETAKE PHOTO
            </button>
          </div>
        </main>
      </div>
    )
  }

  // Main Instruction Page
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-2xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
            Take a selfie as instructed below
          </h1>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
          >
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-red-700">{error}</span>
            </div>
          </motion.div>
        )}

        {/* Single Provided Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 flex justify-center"
        >
          <OptimizedImage
            src="/images/optimized/Frame_1261155189_hhrqjt.webp"
            alt="Selfie instruction"
            width={320}
            height={400}
            className="w-80 h-auto rounded-lg border-2 border-gray-300"
            quality={85}
            sizes="(max-width: 768px) 320px, 400px"
          />
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="space-y-4 mb-8"
        >
          <button
            onClick={startCamera}
            disabled={isLoading}
            className={`w-full py-4 px-8 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl ${
              isLoading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Accessing Camera...
              </div>
            ) : (
              'TAKE A SELFIE'
            )}
          </button>
          <button
            onClick={openFileUpload}
            className="w-full bg-black text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            UPLOAD FROM GALLERY
          </button>
        </motion.div>

        {/* Privacy Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex items-center justify-center space-x-2 text-sm text-gray-600"
        >
          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span>Your privacy is our priority. You remain anonymous - no one will see your face when you scan it.</span>
        </motion.div>
      </main>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  )
} 