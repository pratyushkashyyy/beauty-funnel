'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  const handleContinue = () => {
    router.push('/quiz')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="px-4">
          <div className="flex justify-between items-center h-14">
            {/* Brand Logo - Mobile optimized */}
            <div className="flex flex-col">
              <span className="text-lg font-serif text-gray-800">Skyfluence</span>
              <span className="text-xs font-serif text-gray-600 ml-3">Beauty</span>
            </div>

            {/* Mobile Header Buttons */}
            <div className="flex items-center space-x-2">
              {/* Support Button - Mobile sized */}
              <button className="flex items-center space-x-1 px-3 py-2 bg-black text-white rounded-lg text-xs font-medium hover:bg-gray-800 transition-colors">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                <span>Support</span>
              </button>

              {/* Hamburger Menu - Mobile sized */}
              <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Main Content */}
      <main className="pt-14 min-h-screen flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-sm mx-auto text-center">
          {/* Mobile Central Woman Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <div className="relative w-64 h-80 mx-auto">
              <img
                src="/images/main-page_cwff8h.jpg"
                alt="Woman with beautiful makeup"
                className="w-full h-full object-cover rounded-lg"
                loading="lazy"
                style={{
                  boxShadow: '0 0 20px rgba(0,0,0,0.1)'
                }}
              />
            </div>
          </motion.div>

          {/* Mobile Headline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <h1 className="text-2xl font-serif text-gray-900 mb-2 leading-tight">
              Become More Confident
            </h1>
            <p className="text-base font-serif text-gray-700 leading-relaxed">
              with a plan based on face analysis
            </p>
          </motion.div>

          {/* Mobile Continue Button - Touch friendly */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleContinue}
            className="w-full bg-black text-white px-6 py-4 rounded-lg font-semibold text-base hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl touch-manipulation"
          >
            CONTINUE
          </motion.button>
        </div>
      </main>

      {/* Mobile Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 py-3">
        <div className="px-4">
          <p className="text-center text-xs font-serif text-gray-600 leading-relaxed">
            By continuing, I agree to Skyfluence's{' '}
            <a href="#" className="underline hover:text-gray-800">Privacy policy</a>
            {' '}and{' '}
            <a href="#" className="underline hover:text-gray-800">Terms of Use</a>
          </p>
        </div>
      </footer>
    </div>
  )
} 