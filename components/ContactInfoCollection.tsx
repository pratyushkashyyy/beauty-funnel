'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { generateFingerprint, getDeviceInfo } from '../lib/fingerprint'

interface ContactInfoCollectionProps {
  onContinue: (contactInfo: { name: string; email: string; phone: string }) => void
  sessionId: string
}

export default function ContactInfoCollection({ onContinue, sessionId }: ContactInfoCollectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    console.log('Form submission started')
    console.log('Form data:', formData)
    console.log('Session ID:', sessionId)
    
    if (!validateForm()) {
      console.log('Form validation failed')
      return
    }

    setIsSubmitting(true)

    try {
      // Generate fingerprint and device info with error handling
      let fingerprint, deviceInfo;
      
      try {
        console.log('Generating fingerprint...')
        fingerprint = generateFingerprint()
        console.log('Fingerprint generated:', fingerprint)
      } catch (error) {
        console.error('Error generating fingerprint:', error)
        fingerprint = { hash: 'error', userAgent: navigator.userAgent }
      }
      
      try {
        console.log('Generating device info...')
        deviceInfo = getDeviceInfo()
        console.log('Device info generated:', deviceInfo)
      } catch (error) {
        console.error('Error generating device info:', error)
        deviceInfo = { browser: 'unknown', os: 'unknown' }
      }
      
      // Fallback if fingerprint functions are not available
      if (!fingerprint || !deviceInfo) {
        console.log('Using fallback fingerprint and device info')
        fingerprint = fingerprint || { hash: 'fallback', userAgent: navigator.userAgent || 'unknown' }
        deviceInfo = deviceInfo || { browser: 'unknown', os: 'unknown' }
      }
      
      // Save user to database
      const requestBody = {
        ...formData,
        sessionId,
        fingerprint: JSON.stringify(fingerprint),
        deviceInfo: JSON.stringify(deviceInfo)
      }
      
      console.log('Sending request to API:', requestBody)
      
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      })

      console.log('API response status:', response.status)
      console.log('API response headers:', response.headers)
      
      if (response.ok) {
        const responseData = await response.json()
        console.log('API response data:', responseData)
        console.log('Calling onContinue with:', formData)
        onContinue(formData)
      } else {
        const errorData = await response.json()
        console.error('Error saving user:', errorData)
        // Show error to user
        setErrors({ submit: `Failed to save your information. Error: ${errorData.error || 'Unknown error'}` })
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setErrors({ submit: `Network error: ${error instanceof Error ? error.message : 'Unknown error'}` })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
    // Clear submit error when user makes changes
    if (errors.submit) {
      setErrors(prev => ({ ...prev, submit: '' }))
    }
  }

  return (
    <div className="py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-3 leading-tight text-center">
          Let's Personalize Your Experience
        </h2>
        <p className="text-base text-gray-600 leading-relaxed text-center">
          We're almost there! Please share your details so we can send your personalized beauty recommendations.
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`w-full p-3 border-2 rounded-lg transition-all duration-200 ${
              errors.name 
                ? 'border-red-300 bg-red-50' 
                : 'border-gray-200 focus:border-black focus:bg-white'
            }`}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full p-3 border-2 rounded-lg transition-all duration-200 ${
              errors.email 
                ? 'border-red-300 bg-red-50' 
                : 'border-gray-200 focus:border-black focus:bg-white'
            }`}
            placeholder="Enter your email address"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className={`w-full p-3 border-2 rounded-lg transition-all duration-200 ${
              errors.phone 
                ? 'border-red-300 bg-red-50' 
                : 'border-gray-200 focus:border-black focus:bg-white'
            }`}
            placeholder="Enter your phone number"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        {errors.submit && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{errors.submit}</p>
          </div>
        )}

        <motion.button
          type="submit"
          disabled={isSubmitting}
          className={`w-full p-4 rounded-lg font-medium transition-all duration-200 ${
            isSubmitting
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-black text-white hover:bg-gray-800'
          }`}
          whileHover={!isSubmitting ? { scale: 1.02 } : {}}
          whileTap={!isSubmitting ? { scale: 0.98 } : {}}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Saving...
            </div>
          ) : (
            'Continue to Quiz'
          )}
        </motion.button>
      </motion.form>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-6 p-4 bg-blue-50 rounded-lg"
      >
        <p className="text-sm text-blue-800">
          <strong>Privacy Promise:</strong> Your information is secure and will only be used to send you personalized beauty recommendations.
        </p>
      </motion.div>
    </div>
  )
} 