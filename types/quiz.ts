export interface QuizAnswer {
  questionId: string
  value: string | string[]
}

export interface QuizQuestion {
  id: string
  title: string
  subtitle: string
  type: 'single' | 'multiple'
  options: QuizOption[]
}

export interface QuizOption {
  id: string
  value: string
  label: string
  description?: string
  icon?: string
}

export interface QuizResult {
  age: string
  skinType: string
  concerns: string[]
  currentRoutine: string
  lifestyle: string
  environment: string
  budget: string
  email?: string
  newsletter?: boolean
}

export interface ProductRecommendation {
  id: string
  name: string
  description: string
  category: string
  price: number
  image: string
  whyRecommended: string
  benefits: string[]
}

export interface QuizState {
  currentStep: number
  answers: Record<string, string | string[]>
  isComplete: boolean
  results?: QuizResult
  recommendations?: ProductRecommendation[]
} 