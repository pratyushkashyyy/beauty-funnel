'use client'

import { motion } from 'framer-motion'
import { QuizQuestion } from '../types/quiz'

interface QuizStepProps {
  question: QuizQuestion
  selectedOptions: string | string[]
  onOptionSelect: (optionId: string) => void
  isAutoAdvancing?: boolean
}

export default function QuizStep({ question, selectedOptions, onOptionSelect, isAutoAdvancing }: QuizStepProps) {
  const isSelected = (optionId: string) => {
    if (Array.isArray(selectedOptions)) {
      return selectedOptions.includes(optionId)
    }
    return selectedOptions === optionId
  }

  const renderTip = () => {
    // Show facts before selection for single-choice questions that auto-advance
    if (question.id === 'eyeColor') {
      return (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Did you know?</strong> Your eye color can influence which makeup shades look best on you! Brown eyes look stunning with purple and bronze shadows, while blue eyes pop with warm oranges and coppers.
          </p>
        </div>
      )
    }
    
    if (question.id === 'skinType') {
      return (
        <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Skin type insight:</strong> 60% of people have combination skin! Oily skin ages slower, while dry skin loses moisture 25% faster. Each type has unique advantages!
          </p>
        </div>
      )
    }

    if (question.id === 'skinConcerns') {
      return (
        <div className="mt-4 p-3 bg-pink-50 rounded-lg">
          <p className="text-sm text-pink-800">
            <strong>Skin concern fact:</strong> 85% of people experience skin concerns at some point. The good news? Most concerns can be addressed with the right skincare routine and products!
          </p>
        </div>
      )
    }

    if (question.id === 'beautySpending') {
      return (
        <div className="mt-4 p-3 bg-indigo-50 rounded-lg">
          <p className="text-sm text-indigo-800">
            <strong>Beauty spending insight:</strong> The average person spends ₹2,500-₹5,000 monthly on beauty products. Smart shopping and quality over quantity can give you better results for less!
          </p>
        </div>
      )
    }

    if (question.id === 'skinTone') {
      return (
        <div className="mt-4 p-3 bg-orange-50 rounded-lg">
          <p className="text-sm text-orange-800">
            <strong>Skin tone fact:</strong> Your skin tone can change throughout the year due to sun exposure and seasonal changes. It's normal to need different shades in summer vs winter!
          </p>
        </div>
      )
    }

    if (question.id === 'age') {
      return (
        <div className="mt-4 p-3 bg-teal-50 rounded-lg">
          <p className="text-sm text-teal-800">
            <strong>Age and beauty:</strong> Every age has its beauty advantages! Younger skin has natural collagen, while mature skin has wisdom and character. The key is embracing your unique beauty at every stage.
          </p>
        </div>
      )
    }

    if (question.id === 'lifestyle') {
      return (
        <div className="mt-4 p-3 bg-rose-50 rounded-lg">
          <p className="text-sm text-rose-800">
            <strong>Lifestyle impact:</strong> Your daily habits affect your skin more than you think! Stress, sleep, and diet can impact your skin's appearance more than expensive products.
          </p>
        </div>
      )
    }

    if (question.id === 'environment') {
      return (
        <div className="mt-4 p-3 bg-cyan-50 rounded-lg">
          <p className="text-sm text-cyan-800">
            <strong>Environment fact:</strong> Pollution can age your skin up to 10 years faster! Using antioxidants and proper cleansing can help protect your skin from environmental damage.
          </p>
        </div>
      )
    }

    if (question.id === 'faceShape') {
      return (
        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-green-800">
            <strong>Face shape insight:</strong> Only 9% of people have perfectly oval faces! Each face shape has unique beauty advantages - from strong jawlines to high cheekbones, your features are your signature.
          </p>
        </div>
      )
    }

    // Show specific tips after selection for multiple choice questions
    if (question.id === 'skinType' && selectedOptions === 'dry') {
      return (
        <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>A tip for dry skin:</strong> Look for hydrating products with ingredients like hyaluronic acid and ceramides. Your skin loses moisture 25% faster than other skin types!
          </p>
        </div>
      )
    }

    if (question.id === 'skinType' && selectedOptions === 'oily') {
      return (
        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-green-800">
            <strong>Oily skin fact:</strong> Oily skin actually ages slower! The natural oils help protect against fine lines and wrinkles. The key is finding the right balance with gentle, oil-controlling products.
          </p>
        </div>
      )
    }

    if (question.id === 'skinType' && selectedOptions === 'combination') {
      return (
        <div className="mt-4 p-3 bg-purple-50 rounded-lg">
          <p className="text-sm text-purple-800">
            <strong>Combination skin insight:</strong> 60% of people have combination skin! This means you need different products for different areas - lighter formulas for oily zones, richer ones for dry areas.
          </p>
        </div>
      )
    }

    if (question.id === 'faceShape' && selectedOptions) {
      const shape = selectedOptions as string
      const tips = {
        oval: "Oval faces are considered the most versatile - you can pull off almost any makeup style! Only 9% of people have perfectly oval faces.",
        square: "Square faces look great with soft, rounded makeup techniques to balance angular features. Your strong jawline is actually a beauty asset!",
        round: "Round faces benefit from contouring and angular makeup to add definition. Round faces are often associated with youthfulness and approachability.",
        heart: "Heart-shaped faces look stunning with focus on the eyes and soft lip colors. This shape is often considered the most feminine and romantic.",
        diamond: "Diamond faces can emphasize cheekbones and eyes for a balanced look. Your high cheekbones are a natural highlight!",
        rectangle: "Rectangle faces look great with rounded blush placement and soft eye makeup. Your balanced proportions are naturally harmonious."
      }
      
      return (
        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-green-800">
            <strong>Perfect for your face shape:</strong> {tips[shape as keyof typeof tips] || "Your face shape is unique and beautiful!"}
          </p>
        </div>
      )
    }

    return null
  }

  return (
    <div className="py-6">
      {/* Question */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-3 leading-tight text-center">
          {question.title}
        </h2>
        {question.subtitle && (
          <p className="text-base text-gray-600 leading-relaxed text-center">
            {question.subtitle}
          </p>
        )}
      </motion.div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <button
              onClick={() => onOptionSelect(option.id)}
              disabled={isAutoAdvancing}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 touch-manipulation font-display ${
                isSelected(option.id)
                  ? 'border-black bg-gray-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              } ${isAutoAdvancing ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {option.icon && (
                    <span className="text-lg">{option.icon}</span>
                  )}
                  <div>
                    <span className="text-base font-medium text-gray-900">
                      {option.label}
                    </span>
                    {option.description && (
                      <p className="text-sm text-gray-600 mt-1">
                        {option.description}
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Checkmark for multi-select */}
                {question.type === 'multiple' && isSelected(option.id) && (
                  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          </motion.div>
        ))}
      </div>

      {/* Auto-advancing indicator */}
      {isAutoAdvancing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center space-x-2 text-sm text-gray-500"
        >
          <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          <span>Moving to next question...</span>
        </motion.div>
      )}

      {/* Tips */}
      {renderTip()}
    </div>
  )
} 