'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface FaceScanAnalysisPageProps {
  onComplete: () => void
  capturedImage?: string
}

export default function FaceScanAnalysisPage({ onComplete, capturedImage }: FaceScanAnalysisPageProps) {
  const router = useRouter()

  const [step, setStep] = useState(0)
  const analysisTexts = [
    'Analyzing your chin...',
    'Analyzing your nose...',
    'Analyzing your lips...',
    'Analyzing your forehead...',
    'Analyzing your face shape...'
  ]

  // Step timer and completion
  useEffect(() => {
    if (step < analysisTexts.length - 1) {
      const timer = setTimeout(() => setStep(step + 1), 2500)
      return () => clearTimeout(timer)
    } else {
      // Wait 2.5s on last step, then complete
      const timer = setTimeout(() => onComplete(), 2500)
      return () => clearTimeout(timer)
    }
  }, [step])

  // Scanning line animation: loops from bottom to top every 3 seconds
  const [scanPos, setScanPos] = useState(0)
  useEffect(() => {
    let running = true
    let start = Date.now()
    function animate() {
      if (!running) return
      const elapsed = (Date.now() - start) % 3000 // 3s per scan
      setScanPos(elapsed / 3000)
      requestAnimationFrame(animate)
    }
    animate()
    return () => { running = false }
  }, [])

  const handleBack = () => {
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-2xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 leading-tight">
            Analyzing your
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            facial features
          </h2>
        </motion.div>

        {/* Face Scan Image with Scanning Line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-8"
        >
          <div className="relative w-full max-w-md mx-auto">
            <div className="relative">
              <img
                src={capturedImage || "/images/Frame_1261155189_hhrqjt.png"}
                alt="Your face for analysis"
                className="w-full h-auto rounded-lg"
                loading="lazy"
              />
              {/* Futuristic scanning line animation */}
              <div className="absolute left-0 right-0 pointer-events-none" style={{ top: `${(1 - scanPos) * 100}%`, height: '8px' }}>
                {/* Main neon line */}
                <div
                  className="w-full h-2 rounded-full animate-pulse"
                  style={{
                    background: 'linear-gradient(90deg, #38bdf8 0%, #06b6d4 100%)',
                    boxShadow: '0 0 24px 8px #38bdf8, 0 0 64px 16px #06b6d4',
                    filter: 'blur(1.5px)'
                  }}
                ></div>
                {/* Trailing effect */}
                <div
                  className="w-full h-6 mt-1 rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, rgba(56,189,248,0.15) 0%, rgba(6,182,212,0.10) 100%)',
                    filter: 'blur(6px)'
                  }}
                ></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Instructional Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-8"
        >
          <p className="text-lg text-gray-700 leading-relaxed">
            {analysisTexts[step]}
          </p>
        </motion.div>

        {/* Loading Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </motion.div>
      </main>
    </div>
  )
} 