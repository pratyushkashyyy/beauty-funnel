import { ProductRecommendation } from '../types/quiz'

export const productRecommendations: ProductRecommendation[] = [
  {
    id: 'cleanser-1',
    name: 'Gentle Foaming Cleanser',
    description: 'A mild, pH-balanced cleanser that removes impurities without stripping natural oils.',
    category: 'Cleanser',
    price: 28,
    image: '/images/cleanser.jpg',
    whyRecommended: 'Perfect for your skin type and concerns',
    benefits: ['Removes makeup and impurities', 'Maintains skin barrier', 'Suitable for daily use']
  },
  {
    id: 'serum-1',
    name: 'Vitamin C Brightening Serum',
    description: 'Potent antioxidant serum that brightens skin and protects against environmental damage.',
    category: 'Serum',
    price: 65,
    image: '/images/serum.jpg',
    whyRecommended: 'Targets your main skin concerns',
    benefits: ['Brightens complexion', 'Reduces dark spots', 'Protects against free radicals']
  },
  {
    id: 'moisturizer-1',
    name: 'Hydrating Gel Moisturizer',
    description: 'Lightweight, non-comedogenic moisturizer that provides long-lasting hydration.',
    category: 'Moisturizer',
    price: 42,
    image: '/images/moisturizer.jpg',
    whyRecommended: 'Fits your lifestyle and budget',
    benefits: ['Lightweight formula', '24-hour hydration', 'Non-greasy finish']
  },
  {
    id: 'sunscreen-1',
    name: 'Broad Spectrum SPF 50',
    description: 'Daily sunscreen that protects against UVA/UVB rays while feeling weightless on skin.',
    category: 'Sunscreen',
    price: 38,
    image: '/images/sunscreen.jpg',
    whyRecommended: 'Essential for your environment',
    benefits: ['Broad spectrum protection', 'Weightless feel', 'Works under makeup']
  },
  {
    id: 'treatment-1',
    name: 'Retinol Night Treatment',
    description: 'Advanced anti-aging treatment that reduces fine lines and improves skin texture.',
    category: 'Treatment',
    price: 85,
    image: '/images/treatment.jpg',
    whyRecommended: 'Addresses your aging concerns',
    benefits: ['Reduces fine lines', 'Improves texture', 'Increases cell turnover']
  },
  {
    id: 'mask-1',
    name: 'Hydrating Sheet Mask',
    description: 'Intensive hydration mask that delivers moisture deep into the skin.',
    category: 'Mask',
    price: 15,
    image: '/images/mask.jpg',
    whyRecommended: 'Perfect for your routine level',
    benefits: ['Instant hydration', 'Soothes skin', 'Quick treatment']
  }
]

export const getRecommendationsByAnswers = (answers: Record<string, string | string[]>): ProductRecommendation[] => {
  // This is a simplified recommendation algorithm
  // In a real app, you'd have more sophisticated logic
  
  const recommendations: ProductRecommendation[] = []
  
  // Always recommend a cleanser
  recommendations.push(productRecommendations[0])
  
  // Recommend serum based on concerns
  const concerns = answers.concerns as string[]
  if (concerns?.includes('aging') || concerns?.includes('dark-spots')) {
    recommendations.push(productRecommendations[1]) // Vitamin C serum
  }
  
  // Always recommend moisturizer
  recommendations.push(productRecommendations[2])
  
  // Always recommend sunscreen
  recommendations.push(productRecommendations[3])
  
  // Recommend treatment based on age and concerns
  const age = answers.age as string
  if (age === '35-44' || age === '45-54' || age === '55+' || concerns?.includes('aging')) {
    recommendations.push(productRecommendations[4]) // Retinol treatment
  }
  
  // Recommend mask for pampering or hydration needs
  const lifestyle = answers.lifestyle as string
  const skinType = answers.skinType as string
  if (lifestyle === 'relaxed' || skinType === 'dry' || concerns?.includes('dryness')) {
    recommendations.push(productRecommendations[5]) // Hydrating mask
  }
  
  return recommendations.slice(0, 4) // Return max 4 recommendations
} 