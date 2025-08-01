'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

interface AnalysisProcessingPageProps {
  onComplete: () => void
}

export default function AnalysisProcessingPage({ onComplete }: AnalysisProcessingPageProps) {
  const router = useRouter()
  const [stepProgress, setStepProgress] = useState([65, 0, 0, 0])
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const stepDurations = [
      4000 + Math.random() * 3000, // Step 1: 8-12 seconds
      3000 + Math.random() * 4000, // Step 2: 7-12 seconds  
      4000 + Math.random() * 3000, // Step 3: 8-12 seconds
      3000 + Math.random() * 4000  // Step 4: 7-12 seconds
    ]

    const totalDuration = stepDurations.reduce((sum, duration) => sum + duration, 0)
    console.log('Total duration:', totalDuration / 1000, 'seconds')

    let currentStepIndex = 0
    let stepStartTime = Date.now()

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - stepStartTime
      const currentStepDuration = stepDurations[currentStepIndex]
      
      if (currentStepIndex === 0) {
        // First step: progress from 65% to 100%
        const progress = Math.min(65 + (elapsed / currentStepDuration) * 35, 100)
        setStepProgress(prev => [progress, prev[1], prev[2], prev[3]])
        
        if (progress >= 100) {
          currentStepIndex = 1
          stepStartTime = Date.now()
          setCurrentStep(1)
        }
      } else if (currentStepIndex === 1) {
        // Second step: progress from 0% to 100%
        const progress = Math.min((elapsed / currentStepDuration) * 100, 100)
        setStepProgress(prev => [100, progress, prev[2], prev[3]])
        
        if (progress >= 100) {
          currentStepIndex = 2
          stepStartTime = Date.now()
          setCurrentStep(2)
        }
      } else if (currentStepIndex === 2) {
        // Third step: progress from 0% to 100%
        const progress = Math.min((elapsed / currentStepDuration) * 100, 100)
        setStepProgress(prev => [100, 100, progress, prev[3]])
        
        if (progress >= 100) {
          currentStepIndex = 3
          stepStartTime = Date.now()
          setCurrentStep(3)
        }
      } else if (currentStepIndex === 3) {
        // Fourth step: progress from 0% to 100%
        const progress = Math.min((elapsed / currentStepDuration) * 100, 100)
        setStepProgress(prev => [100, 100, 100, progress])
        
        if (progress >= 100) {
          clearInterval(progressInterval)
          setTimeout(() => {
            onComplete()
          }, 1000)
        }
      }
    }, 100)

    return () => clearInterval(progressInterval)
  }, [onComplete])

  const handleBack = () => {
    router.push('/')
  }

  const analysisSteps = [
    { name: 'Analysing your profile', progress: stepProgress[0] },
    { name: 'Analysing your preferences', progress: stepProgress[1] },
    { name: 'Identifying your perfect styles', progress: stepProgress[2] },
    { name: 'Personalising your plan', progress: stepProgress[3] }
  ]

  const overallProgress = Math.round(stepProgress.reduce((sum, progress) => sum + progress, 0) / 4)

  // Testimonial data
  const testimonials = [
    {
      initials: 'AR',
      name: 'April Renee Delepine',
      time: '5 hours ago',
      quote: 'Skyfluence made my life so easy!',
      text: "When I was younger, I never had to worry about my age. Skyfluence Beauty has been essential for me because it's helped me feel confident and elegant."
    },
    {
      initials: 'SJ',
      name: 'Saanvi Joshi',
      time: '1 day ago',
      quote: 'I love how personalized my routine feels now!',
      text: 'I always struggled to find products that worked for me. With Skyfluence, I finally feel like my skincare is made just for me.'
    },
    {
      initials: 'MR',
      name: 'Meera Rao',
      time: '2 days ago',
      quote: 'The progress tracking keeps me motivated!',
      text: 'Seeing my improvements week by week is so encouraging. I feel more confident every day.'
    },
    {
      initials: 'ZT',
      name: 'Zoya Thakur',
      time: '3 days ago',
      quote: 'I never thought beauty could be this easy!',
      text: 'The recommendations are spot on and save me so much time. I love the simplicity and results.'
    }
  ]

  const [testimonialIndex, setTestimonialIndex] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex(idx => (idx + 1) % testimonials.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Removed duplicate header here */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Overall Progress Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Processing Your Analysis</h2>
            <div className="text-6xl font-bold text-gray-800 mb-2">
              {overallProgress}%
            </div>
            <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-3">
              <motion.div
                className="bg-black h-3 rounded-full"
                initial={{ width: '16%' }}
                animate={{ width: `${overallProgress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Analysis Steps */}
          <div className="space-y-6">
            {analysisSteps.map((step, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-lg font-medium ${step.progress > 0 ? 'text-gray-900' : 'text-gray-400'}`}>
                      {step.name}
                    </span>
                    <span className="text-sm font-medium text-gray-600">
                      {Math.round(step.progress)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-black h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${step.progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Social Proof Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            1.5 Million Women
          </h2>
          <p className="text-lg md:text-xl text-gray-700 font-medium">
            HAVE CHOSEN SKYFLUENCE BEAUTY
          </p>
        </motion.div>

        {/* Testimonial Cards - Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <motion.div
            key={testimonialIndex}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.5 }}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <span className="text-sm text-gray-500">{testimonials[testimonialIndex].time}</span>
            </div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">{testimonials[testimonialIndex].initials}</span>
              </div>
              <span className="font-medium text-gray-900">{testimonials[testimonialIndex].name}</span>
            </div>
            <blockquote className="text-lg font-bold text-gray-900 mb-3">
              "{testimonials[testimonialIndex].quote}"
            </blockquote>
            <p className="text-gray-700 leading-relaxed">
              {testimonials[testimonialIndex].text}
            </p>
          </motion.div>
          {/* Carousel Dots */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full ${idx === testimonialIndex ? 'bg-black' : 'bg-gray-300'}`}
              ></div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
} 