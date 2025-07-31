'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { quizQuestions } from '../../data/quiz-questions'
import { getRecommendationsByAnswers } from '../../data/product-recommendations'
import { QuizState, QuizResult, ProductRecommendation } from '../../types/quiz'
import QuizHeader from '../../components/QuizHeader'
import QuizStep from '../../components/QuizStep'
import QuizNavigation from '../../components/QuizNavigation'
import LoadingScreen from '../../components/LoadingScreen'
import SocialProofPage from '../../components/SocialProofPage'
import MotivationalPage from '../../components/MotivationalPage'
import SecondMotivationalPage from '../../components/SecondMotivationalPage'
import FaceScanPage from '../../components/FaceScanPage'
import ResultsPreviewPage from '../../components/ResultsPreviewPage'
import SelfieInstructionPage from '../../components/SelfieInstructionPage'
import FaceScanAnalysisPage from '../../components/FaceScanAnalysisPage'
import ProfileSavingPage from '../../components/ProfileSavingPage'
import AnalysisProcessingPage from '../../components/AnalysisProcessingPage'
import PaymentPage from '../../components/PaymentPage'

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    gtag?: (...args: any[]) => void;
  }
}

export default function QuizPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Initialize with default state to prevent hydration mismatch
  const [quizState, setQuizState] = useState<QuizState>({
    currentStep: 1,
    answers: {},
    isComplete: false
  })
  const [isLoading, setIsLoading] = useState(false)

  const [showSocialProof, setShowSocialProof] = useState(false)
  const [showMotivational, setShowMotivational] = useState(false)
  const [showSecondMotivational, setShowSecondMotivational] = useState(false)
  const [showFaceScan, setShowFaceScan] = useState(false)
  const [showResultsPreview, setShowResultsPreview] = useState(false)
  const [showSelfieInstruction, setShowSelfieInstruction] = useState(false)
  const [showFaceScanAnalysis, setShowFaceScanAnalysis] = useState(false)
  const [showProfileSaving, setShowProfileSaving] = useState(false)
  const [showAnalysisProcessing, setShowAnalysisProcessing] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [capturedSelfie, setCapturedSelfie] = useState<string | null>(null)
  const [isAutoAdvancing, setIsAutoAdvancing] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Function to get current page ID based on state
  const getCurrentPageId = () => {

    if (showPayment) return 25
    if (showAnalysisProcessing) return 24
    if (showProfileSaving) return 23
    if (showResultsPreview) return 20
    if (showFaceScanAnalysis) return 19
    if (showSelfieInstruction) return 18
    if (showFaceScan) return 18
    if (showSecondMotivational) return 15
    if (showMotivational) return 10
    if (showSocialProof) return 8
    return quizState.currentStep
  }

  // Function to update URL with current page ID
  const updateURL = (pageId: number) => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      url.searchParams.set('id', pageId.toString())
      window.history.replaceState({}, '', url.toString())
    }
  }

  // Load saved progress and handle URL parameters after component mounts
  useEffect(() => {
    setIsClient(true)
    
    // Initialize session ID if not exists
    if (typeof window !== 'undefined' && !localStorage.getItem('sessionId')) {
      localStorage.setItem('sessionId', `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
    }
    
    const loadSavedProgress = () => {
      if (typeof window !== 'undefined') {
        const urlId = searchParams.get('id')
        const saved = localStorage.getItem('quizProgress')
        
        if (urlId) {
          // URL parameter takes precedence
          const pageId = parseInt(urlId)
          if (pageId >= 1 && pageId <= 26) {
            // Restore state based on page ID
            if (saved) {
              try {
                const parsedState = JSON.parse(saved)
                if (parsedState && !parsedState.isComplete) {
                  // Set the appropriate page based on ID
                  if (pageId === 8) {
                    setShowSocialProof(true)
                  } else if (pageId === 10) {
                    setShowMotivational(true)
                  } else if (pageId === 15) {
                    setShowSecondMotivational(true)
                  } else if (pageId === 18) {
                    setShowFaceScan(true)
                  } else if (pageId === 19) {
                    setShowFaceScanAnalysis(true)
                  } else if (pageId === 20) {
                    setShowResultsPreview(true)
                  } else if (pageId === 23) {
                    setShowProfileSaving(true)
                  } else if (pageId === 24) {
                    setShowAnalysisProcessing(true)
                  } else if (pageId === 25) {
                    setShowPayment(true)
                  } else {
                    // Regular quiz question
                    setQuizState(prev => ({ ...prev, currentStep: pageId }))
                  }
                }
              } catch (e) {
                console.error('Error parsing saved progress:', e)
                localStorage.removeItem('quizProgress')
              }
            }
          }
        } else if (saved) {
          // No URL parameter, load from localStorage
          try {
            const parsedState = JSON.parse(saved)
            if (parsedState && !parsedState.isComplete && parsedState.currentStep > 0) {
              setQuizState(parsedState)
            }
          } catch (e) {
            console.error('Error parsing saved progress:', e)
            localStorage.removeItem('quizProgress')
          }
        }
      }
    }
    
    // Small delay to ensure hydration is complete
    const timer = setTimeout(loadSavedProgress, 100)
    return () => clearTimeout(timer)
  }, [searchParams])

  // Fire Meta Pixel event on quiz start
  useEffect(() => {
    if (quizState.currentStep === 1 && typeof window !== 'undefined') {
      // Meta Pixel
      if (window.fbq) {
        window.fbq('trackCustom', 'QuizStarted');
      }
      // Google Analytics 4
      if (window.gtag) {
        window.gtag('event', 'quiz_start', {
          event_category: 'Quiz',
          event_label: 'Quiz Started',
          custom_parameter_1: 1,
          custom_parameter_3: localStorage.getItem('sessionId') || 'unknown'
        });
      }
    }
  }, [quizState.currentStep])

  const currentQuestion = quizQuestions[quizState.currentStep - 1]
  const currentAnswer = quizState.answers[currentQuestion?.id] || (currentQuestion?.type === 'multiple' ? [] : '')

  // Save progress to localStorage and update URL whenever state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('quizProgress', JSON.stringify(quizState))
      updateURL(getCurrentPageId())
    }
  }, [quizState, showSocialProof, showMotivational, showSecondMotivational, showFaceScan, showResultsPreview, showSelfieInstruction, showFaceScanAnalysis, showProfileSaving, showAnalysisProcessing, showPayment])

  const handleAnswer = (questionId: string, value: string | string[]) => {
    setQuizState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: value
      }
    }))
  }

  const handleOptionSelect = (optionId: string) => {
    // Meta Pixel tracking
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', 'QuizStep', {
        step: quizState.currentStep,
        question: currentQuestion?.id,
        answer: optionId
      });
    }

    // Google Analytics 4 tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'quiz_answer', {
        event_category: 'Quiz',
        event_label: currentQuestion?.id,
        custom_parameter_1: quizState.currentStep,
        custom_parameter_2: optionId,
        custom_parameter_3: localStorage.getItem('sessionId') || 'unknown'
      });
    }

    if (currentQuestion?.type === 'multiple') {
      // Handle multiple choice - toggle selection
      const currentAnswers = Array.isArray(currentAnswer) ? currentAnswer : [];
      const newAnswers = currentAnswers.includes(optionId)
        ? currentAnswers.filter(v => v !== optionId)
        : [...currentAnswers, optionId];
      
      setQuizState(prev => ({
        ...prev,
        answers: {
          ...prev.answers,
          [currentQuestion?.id || '']: newAnswers
        }
      }));

      // Save to localStorage
      const existingAnswers = JSON.parse(localStorage.getItem('quizAnswers') || '{}');
      const updatedAnswers = {
        ...existingAnswers,
        [currentQuestion?.id || 'unknown']: {
          question: currentQuestion?.title,
          answer: newAnswers,
          timestamp: new Date().toISOString()
        }
      };
      localStorage.setItem('quizAnswers', JSON.stringify(updatedAnswers));

      // Send partial progress to webhook
      sendPartialProgress(updatedAnswers, false);
    } else {
      // Handle single choice - auto-advance after delay
      setQuizState(prev => ({
        ...prev,
        answers: {
          ...prev.answers,
          [currentQuestion?.id || '']: optionId
        }
      }));

      // Save to localStorage
      const existingAnswers = JSON.parse(localStorage.getItem('quizAnswers') || '{}');
      const updatedAnswers = {
        ...existingAnswers,
        [currentQuestion?.id || 'unknown']: {
          question: currentQuestion?.title,
          answer: optionId,
          timestamp: new Date().toISOString()
        }
      };
      localStorage.setItem('quizAnswers', JSON.stringify(updatedAnswers));

      // Send partial progress to webhook
      sendPartialProgress(updatedAnswers, false);

      // Auto-advance for single-select questions after 0.8 seconds
      setTimeout(() => {
        handleNext();
      }, 800);
    }

    // Save quiz progress to localStorage
    const progress = {
      currentStep: quizState.currentStep,
      totalSteps: quizQuestions.length,
      completedSteps: Object.keys(JSON.parse(localStorage.getItem('quizAnswers') || '{}')).length,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem('quizProgress', JSON.stringify(progress));
  };

  // Function to send partial progress to webhook
  const sendPartialProgress = async (answers: any, isComplete: boolean = false) => {
    try {
      const progressData = {
        type: isComplete ? 'complete' : 'partial',
        progress: {
          currentStep: quizState.currentStep,
          totalSteps: quizQuestions.length,
          completedSteps: Object.keys(answers).length,
          lastUpdated: new Date().toISOString()
        },
        answers: answers,
        sessionId: localStorage.getItem('sessionId') || `session_${Date.now()}`,
        timestamp: new Date().toISOString()
      };

      // Send to Make.com webhook
      await fetch('https://hook.us1.make.com/ofmerat6a523wkdvohdisxwgiq6b7k14', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(progressData)
      });
    } catch (error) {
      console.error('Error sending partial progress:', error);
    }
  };

  const canProceed = () => {
    if (!currentQuestion) return false
    if (currentQuestion.type === 'multiple') {
      return Array.isArray(currentAnswer) && currentAnswer.length > 0
    }
    return currentAnswer !== '' && currentAnswer !== undefined
  }

  const handleNext = () => {
    console.log('handleNext called, currentStep:', quizState.currentStep, 'totalSteps:', quizQuestions.length)
    
    if (quizState.currentStep < quizQuestions.length) {
      // Check if we just completed the 8th question (skin concerns)
      if (quizState.currentStep === 8) {
        console.log('Showing social proof page')
        setShowSocialProof(true)
        updateURL(8)
      } else if (quizState.currentStep === 10) {
        // Check if we just completed the 10th question (look sexier)
        console.log('Showing motivational page')
        setShowMotivational(true)
        updateURL(10)
      } else if (quizState.currentStep === 15) {
        // Check if we just completed the 15th question (comfortable with attention)
        console.log('Showing second motivational page')
        setShowSecondMotivational(true)
        updateURL(15)
      } else if (quizState.currentStep === 18) {
        // Check if we just completed the 18th question (beauty spending)
        console.log('Showing face scan page')
        setShowFaceScan(true)
        updateURL(18)
      } else {
        console.log('Moving to next question:', quizState.currentStep + 1)
        setQuizState(prev => ({
          ...prev,
          currentStep: prev.currentStep + 1
        }))
        updateURL(quizState.currentStep + 1)
      }
    } else {
      // This is the last question (step 23), trigger profile saving
      console.log('Last question completed, showing profile saving page')
      setShowProfileSaving(true)
      updateURL(23)
    }
  }

  const handleSocialProofContinue = () => {
    setShowSocialProof(false)
    setQuizState(prev => ({
      ...prev,
      currentStep: prev.currentStep + 1
    }))
    updateURL(quizState.currentStep + 1)
  }

  const handleMotivationalContinue = () => {
    setShowMotivational(false)
    setQuizState(prev => ({
      ...prev,
      currentStep: prev.currentStep + 1
    }))
    updateURL(quizState.currentStep + 1)
  }

  const handleSecondMotivationalContinue = () => {
    setShowSecondMotivational(false)
    setQuizState(prev => ({
      ...prev,
      currentStep: prev.currentStep + 1
    }))
    updateURL(quizState.currentStep + 1)
  }

  const handleFaceScanContinue = () => {
    setShowFaceScan(false)
    setShowSelfieInstruction(true)
    updateURL(18)
  }

  const handleFaceScanSkip = () => {
    setShowFaceScan(false)
    setShowResultsPreview(true)
    updateURL(20)
  }

  const handleSelfieInstructionTakeSelfie = (imageData: string) => {
    setCapturedSelfie(imageData)
    setShowSelfieInstruction(false)
    setShowFaceScanAnalysis(true)
    updateURL(19)
  }

  const handleSelfieInstructionUploadGallery = (imageData: string) => {
    setCapturedSelfie(imageData)
    setShowSelfieInstruction(false)
    setShowFaceScanAnalysis(true)
    updateURL(19)
  }

  const handleFaceScanAnalysisComplete = () => {
    setShowFaceScanAnalysis(false)
    setShowResultsPreview(true)
    updateURL(20)
  }

  const handleResultsPreviewContinue = () => {
    setShowResultsPreview(false)
    setQuizState(prev => ({
      ...prev,
      currentStep: prev.currentStep + 1
    }))
    updateURL(quizState.currentStep + 1)
  }

  const handleProfileSavingContinue = () => {
    setShowProfileSaving(false)
    setShowAnalysisProcessing(true)
    updateURL(24)
  }

  const handleAnalysisProcessingComplete = () => {
    setShowAnalysisProcessing(false)
    setShowPayment(true)
    updateURL(25)
  }

  const handlePaymentComplete = () => {
    setShowPayment(false)
    setIsLoading(true)
    setTimeout(() => {
      setQuizState(prev => ({ ...prev, isComplete: true }))
      setIsLoading(false)
      router.push('/contact-form')
    }, 2000)
  }

  const handlePrevious = () => {
    if (quizState.currentStep > 1) {
      setQuizState(prev => ({
        ...prev,
        currentStep: prev.currentStep - 1
      }))
      updateURL(quizState.currentStep - 1)
    } else {
      router.push('/')
    }
    setShowSocialProof(false) // Ensure social proof is hidden if going back
    setShowMotivational(false) // Ensure motivational page is hidden if going back
    setShowSecondMotivational(false) // Ensure second motivational page is hidden if going back
    setShowFaceScan(false) // Ensure face scan page is hidden if going back
    setShowResultsPreview(false) // Ensure results preview page is hidden if going back
    setShowSelfieInstruction(false) // Ensure selfie instruction page is hidden if going back
    setShowFaceScanAnalysis(false) // Ensure face scan analysis page is hidden if going back
    setShowProfileSaving(false) // Ensure profile saving page is hidden if going back
    setShowAnalysisProcessing(false) // Ensure analysis processing page is hidden if going back
    setShowPayment(false) // Ensure payment page is hidden if going back
  }

  const handleRestart = () => {
    // Clear saved progress
    if (typeof window !== 'undefined') {
      localStorage.removeItem('quizProgress')
    }
    
    setQuizState({
      currentStep: 1,
      answers: {},
      isComplete: false
    })
    setShowSocialProof(false)
    setShowMotivational(false)
    setShowSecondMotivational(false)
    setShowFaceScan(false)
    setShowResultsPreview(false)
    setShowSelfieInstruction(false)
    setShowFaceScanAnalysis(false)
    setShowProfileSaving(false)
    setShowAnalysisProcessing(false)
    setShowPayment(false)
    setCapturedSelfie(null)
    updateURL(1)
  }

  const handleBackToHome = () => {
    router.push('/')
  }



  if (isLoading) {
    return <LoadingScreen />
  }

  // Show loading until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm text-gray-600">Loading quiz...</p>
        </div>
      </div>
    )
  }



  // Show special pages
  if (showSocialProof) {
    return (
      <div className="min-h-screen bg-white">
        <QuizHeader 
          currentStep={8} 
          totalSteps={quizQuestions.length}
          onBack={handlePrevious}
          isSpecialPage={true}
          currentPageId={8}
        />
        <div className="pb-20">
          <SocialProofPage onContinue={handleSocialProofContinue} />
        </div>
      </div>
    )
  }

  if (showMotivational) {
    return (
      <div className="min-h-screen bg-white">
        <QuizHeader 
          currentStep={10} 
          totalSteps={quizQuestions.length}
          onBack={handlePrevious}
          isSpecialPage={true}
          currentPageId={10}
        />
        <div className="pb-20">
          <MotivationalPage onContinue={handleMotivationalContinue} />
        </div>
      </div>
    )
  }

  if (showSecondMotivational) {
    return (
      <div className="min-h-screen bg-white">
        <QuizHeader 
          currentStep={15} 
          totalSteps={quizQuestions.length}
          onBack={handlePrevious}
          isSpecialPage={true}
          currentPageId={15}
        />
        <div className="pb-20">
          <SecondMotivationalPage onContinue={handleSecondMotivationalContinue} />
        </div>
      </div>
    )
  }

  if (showFaceScan) {
    return (
      <div className="min-h-screen bg-white">
        <QuizHeader 
          currentStep={18} 
          totalSteps={quizQuestions.length}
          onBack={handlePrevious}
          isSpecialPage={true}
          currentPageId={18}
        />
        <div className="pb-20">
          <FaceScanPage 
            onContinue={handleFaceScanContinue}
            onSkip={handleFaceScanSkip}
          />
        </div>
      </div>
    )
  }

  if (showSelfieInstruction) {
    return (
      <div className="min-h-screen bg-white">
        <QuizHeader 
          currentStep={18} 
          totalSteps={quizQuestions.length}
          onBack={handlePrevious}
          isSpecialPage={true}
          currentPageId={18}
        />
        <div className="pb-20">
          <SelfieInstructionPage 
            onTakeSelfie={handleSelfieInstructionTakeSelfie}
            onUploadFromGallery={handleSelfieInstructionUploadGallery}
          />
        </div>
      </div>
    )
  }

  if (showFaceScanAnalysis) {
    return (
      <div className="min-h-screen bg-white">
        <QuizHeader 
          currentStep={18} 
          totalSteps={quizQuestions.length}
          onBack={handlePrevious}
          isSpecialPage={true}
          currentPageId={19}
        />
        <div className="pb-20">
          <FaceScanAnalysisPage 
            onComplete={handleFaceScanAnalysisComplete}
            capturedImage={capturedSelfie}
          />
        </div>
      </div>
    )
  }

  if (showResultsPreview) {
    return (
      <div className="min-h-screen bg-white">
        <QuizHeader 
          currentStep={20} 
          totalSteps={quizQuestions.length}
          onBack={handlePrevious}
          isSpecialPage={true}
          currentPageId={20}
        />
        <div className="pb-20">
          <ResultsPreviewPage onContinue={handleResultsPreviewContinue} />
        </div>
      </div>
    )
  }

  if (showProfileSaving) {
    return (
      <div className="min-h-screen bg-white">
        <QuizHeader 
          currentStep={23} 
          totalSteps={quizQuestions.length}
          onBack={handlePrevious}
          isSpecialPage={true}
          currentPageId={23}
        />
        <div className="pb-20">
          <ProfileSavingPage onContinue={handleProfileSavingContinue} />
        </div>
      </div>
    )
  }

  if (showAnalysisProcessing) {
    return (
      <div className="min-h-screen bg-white">
        <QuizHeader 
          currentStep={24} 
          totalSteps={quizQuestions.length}
          onBack={handlePrevious}
          isSpecialPage={true}
          currentPageId={24}
        />
        <div className="pb-20">
          <AnalysisProcessingPage onComplete={handleAnalysisProcessingComplete} />
        </div>
      </div>
    )
  }

  if (showPayment) {
    return (
      <div className="min-h-screen bg-white">
        <QuizHeader 
          currentStep={25} 
          totalSteps={quizQuestions.length}
          onBack={handlePrevious}
          isSpecialPage={true}
          currentPageId={25}
        />
        <div className="pb-20">
          <PaymentPage onComplete={handlePaymentComplete} />
        </div>
      </div>
    )
  }

  // Show current question
  return (
    <div className="min-h-screen bg-white">
      <QuizHeader 
        currentStep={quizState.currentStep} 
        totalSteps={quizQuestions.length}
        onBack={handlePrevious}
        currentPageId={quizState.currentStep}
      />
      
      <div className="flex justify-center">
        <div className="w-full max-w-md px-4">
          <div className="pb-20">
            <QuizStep
              question={currentQuestion}
              selectedOptions={currentAnswer}
              onOptionSelect={handleOptionSelect}
              isAutoAdvancing={isAutoAdvancing}
            />
          </div>

          <QuizNavigation
            currentStep={quizState.currentStep}
            totalSteps={quizQuestions.length}
            canProceed={canProceed()}
            onNext={handleNext}
            onPrevious={handlePrevious}
            isMultiSelect={currentQuestion?.type === 'multiple'}
          />
        </div>
      </div>
    </div>
  )
} 