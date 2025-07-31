import { QuizQuestion } from '../types/quiz'

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'age',
    title: 'What Is Your Age?',
    subtitle: 'Take the first step toward looking your absolute best.',
    type: 'single',
    options: [
      {
        id: '18-34',
        value: '18-34',
        label: '18-34',
        description: '',
        icon: ''
      },
      {
        id: '35-44',
        value: '35-44',
        label: '35-44',
        description: '',
        icon: ''
      },
      {
        id: '45-54',
        value: '45-54',
        label: '45-54',
        description: '',
        icon: ''
      },
      {
        id: '55+',
        value: '55+',
        label: '55+',
        description: '',
        icon: ''
      }
    ]
  },
  {
    id: 'eyeColor',
    title: 'What Color Are Your Eyes?',
    subtitle: '',
    type: 'single',
    options: [
      {
        id: 'dark-brown',
        value: 'dark-brown',
        label: 'Dark Brown',
        description: '',
        icon: ''
      },
      {
        id: 'brown',
        value: 'brown',
        label: 'Brown',
        description: '',
        icon: ''
      },
      {
        id: 'light-brown',
        value: 'light-brown',
        label: 'Light Brown',
        description: '',
        icon: ''
      },
      {
        id: 'hazel',
        value: 'hazel',
        label: 'Hazel',
        description: '',
        icon: ''
      },
      {
        id: 'other',
        value: 'other',
        label: 'Other',
        description: '',
        icon: ''
      }
    ]
  },
  {
    id: 'photoAttractiveness',
    title: 'I Often Appear Less Attractive In Photos Than In Real Life',
    subtitle: 'Do you agree with the statement above?',
    type: 'single',
    options: [
      {
        id: 'yes',
        value: 'yes',
        label: 'Yes',
        description: '',
        icon: ''
      },
      {
        id: 'no',
        value: 'no',
        label: 'No',
        description: '',
        icon: ''
      },
      {
        id: 'notSure',
        value: 'notSure',
        label: 'Not Sure',
        description: '',
        icon: ''
      }
    ]
  },
  {
    id: 'mirrorReflection',
    title: 'I Sometimes Don\'t Like My Reflection In The Mirror',
    subtitle: 'Do you agree with the statement above?',
    type: 'single',
    options: [
      {
        id: 'yes',
        value: 'yes',
        label: 'Yes',
        description: '',
        icon: ''
      },
      {
        id: 'no',
        value: 'no',
        label: 'No',
        description: '',
        icon: ''
      },
      {
        id: 'notSure',
        value: 'notSure',
        label: 'Not Sure',
        description: '',
        icon: ''
      }
    ]
  },
  {
    id: 'skinTone',
    title: 'Select The Color Closest To Your Skin Tone',
    subtitle: '',
    type: 'single',
    options: [
      {
        id: 'fair',
        value: 'fair',
        label: 'Fair',
        description: '',
        icon: ''
      },
      {
        id: 'wheatish',
        value: 'wheatish',
        label: 'Wheatish',
        description: '',
        icon: ''
      },
      {
        id: 'medium-brown',
        value: 'medium-brown',
        label: 'Medium Brown',
        description: '',
        icon: ''
      },
      {
        id: 'dark-brown',
        value: 'dark-brown',
        label: 'Dark Brown',
        description: '',
        icon: ''
      },
      {
        id: 'other',
        value: 'other',
        label: 'Other',
        description: '',
        icon: ''
      }
    ]
  },
  {
    id: 'monolidEyes',
    title: 'Do You Have Monolid Eyes?',
    subtitle: '',
    type: 'single',
    options: [
      {
        id: 'yes',
        value: 'yes',
        label: 'Yes',
        description: 'Flat eyelid surface, no visible crease, commonly found in people of Asian descent.',
        icon: ''
      },
      {
        id: 'no',
        value: 'no',
        label: 'No',
        description: 'Defined eyelid crease creating a fold above the lash line.',
        icon: ''
      }
    ]
  },
  {
    id: 'skinSensitivity',
    title: 'Do You Feel Your Skin Is Sensitive?',
    subtitle: '',
    type: 'single',
    options: [
      {
        id: 'sensitive',
        value: 'sensitive',
        label: 'Sensitive',
        description: '',
        icon: ''
      },
      {
        id: 'nonSensitive',
        value: 'nonSensitive',
        label: 'Non-sensitive',
        description: '',
        icon: ''
      }
    ]
  },
  {
    id: 'skinConcerns',
    title: 'What Are Your Skin Concerns?',
    subtitle: '',
    type: 'multiple',
    options: [
      {
        id: 'acne',
        value: 'acne',
        label: 'Acne',
        description: '',
        icon: ''
      },
      {
        id: 'oily-skin',
        value: 'oily-skin',
        label: 'Oily skin',
        description: '',
        icon: ''
      },
      {
        id: 'dryness',
        value: 'dryness',
        label: 'Dryness',
        description: '',
        icon: ''
      },
      {
        id: 'dark-circles',
        value: 'dark-circles',
        label: 'Dark circles',
        description: '',
        icon: ''
      },
      {
        id: 'pigmentation',
        value: 'pigmentation',
        label: 'Pigmentation',
        description: '',
        icon: ''
      },
      {
        id: 'tanning',
        value: 'tanning',
        label: 'Tanning',
        description: '',
        icon: ''
      },
      {
        id: 'uneven-skin-tone',
        value: 'uneven-skin-tone',
        label: 'Uneven skin tone',
        description: '',
        icon: ''
      },
      {
        id: 'wrinkles',
        value: 'wrinkles',
        label: 'Wrinkles',
        description: '',
        icon: ''
      },
      {
        id: 'sagging-skin',
        value: 'sagging-skin',
        label: 'Sagging skin',
        description: '',
        icon: ''
      },
      {
        id: 'other',
        value: 'other',
        label: 'Other',
        description: '',
        icon: ''
      }
    ]
  },
  {
    id: 'lookSexier',
    title: 'I Want To Look Sexier, Not Just Cute',
    subtitle: 'Do you agree with the statement above?',
    type: 'single',
    options: [
      {
        id: 'yes',
        value: 'yes',
        label: 'Yes',
        description: '',
        icon: ''
      },
      {
        id: 'no',
        value: 'no',
        label: 'No',
        description: '',
        icon: ''
      },
      {
        id: 'notSure',
        value: 'notSure',
        label: 'Not Sure',
        description: '',
        icon: ''
      }
    ]
  },
  {
    id: 'skinType',
    title: 'What Is Your Skin Type?',
    subtitle: '',
    type: 'single',
    options: [
      {
        id: 'oily',
        value: 'oily',
        label: 'Oily',
        description: '',
        icon: ''
      },
      {
        id: 'dry',
        value: 'dry',
        label: 'Dry',
        description: '',
        icon: ''
      },
      {
        id: 'normal',
        value: 'normal',
        label: 'Normal',
        description: '',
        icon: ''
      },
      {
        id: 'combination',
        value: 'combination',
        label: 'Combination',
        description: '',
        icon: ''
      }
    ]
  },
  {
    id: 'firstImpression',
    title: 'I Want to Leave a Good First Impression',
    subtitle: 'Do you agree with the statement above?',
    type: 'single',
    options: [
      {
        id: 'yes',
        value: 'yes',
        label: 'Yes',
        description: '',
        icon: ''
      },
      {
        id: 'no',
        value: 'no',
        label: 'No',
        description: '',
        icon: ''
      },
      {
        id: 'notSure',
        value: 'notSure',
        label: 'Not Sure',
        description: '',
        icon: ''
      }
    ]
  },
  {
    id: 'howToFeel',
    title: 'How do you want to feel when you love your appearance?',
    subtitle: '',
    type: 'multiple',
    options: [
      {
        id: 'confident',
        value: 'confident',
        label: 'Confident',
        description: '',
        icon: ''
      },
      {
        id: 'desireable',
        value: 'desireable',
        label: 'Desireable',
        description: '',
        icon: ''
      },
      {
        id: 'attractive',
        value: 'attractive',
        label: 'Attractive',
        description: '',
        icon: ''
      },
      {
        id: 'romantic',
        value: 'romantic',
        label: 'Romantic',
        description: '',
        icon: ''
      },
      {
        id: 'youthful',
        value: 'youthful',
        label: 'Youthful',
        description: '',
        icon: ''
      },
      {
        id: 'ambitious',
        value: 'ambitious',
        label: 'Ambitious',
        description: '',
        icon: ''
      },
      {
        id: 'other',
        value: 'other',
        label: 'Other',
        description: '',
        icon: ''
      }
    ]
  },
  {
    id: 'comfortableWithAttention',
    title: 'Are you comfortable receiving compliments on your appearance?',
    subtitle: 'This helps us understand your confidence level.',
    type: 'single',
    options: [
      {
        id: 'yes',
        value: 'yes',
        label: 'Yes, I appreciate compliments',
        description: '',
        icon: ''
      },
      {
        id: 'no',
        value: 'no',
        label: 'No, I feel uncomfortable',
        description: '',
        icon: ''
      },
      {
        id: 'notSure',
        value: 'notSure',
        label: 'Sometimes, it depends',
        description: '',
        icon: ''
      }
    ]
  },
  {
    id: 'faceShape',
    title: 'What Shape Is Your Face?',
    subtitle: '',
    type: 'single',
    options: [
      {
        id: 'oval',
        value: 'oval',
        label: 'Oval',
        description: 'Long, balanced, softly curbed jawline',
        icon: ''
      },
      {
        id: 'square',
        value: 'square',
        label: 'Square',
        description: 'Angular jaw, broad forehead',
        icon: ''
      },
      {
        id: 'round',
        value: 'round',
        label: 'Round',
        description: 'Equal length and width, soft edges',
        icon: ''
      },
      {
        id: 'heart',
        value: 'heart',
        label: 'Heart',
        description: 'Broad forehead, narrow, pointed chin',
        icon: ''
      },
      {
        id: 'diamond',
        value: 'diamond',
        label: 'Diamond',
        description: 'Wide cheeks, narrow forehead and jaw',
        icon: ''
      },
      {
        id: 'rectangle',
        value: 'rectangle',
        label: 'Rectangle',
        description: 'Long face, strong jaw, straight sides',
        icon: ''
      }
    ]
  },
  {
    id: 'beautySpending',
    title: 'How much do you usually spend on beauty per month?',
    subtitle: 'Include makeup, skincare, and other beauty procedures.',
    type: 'single',
    options: [
      {
        id: 'lessThan1k',
        value: 'lessThan1k',
        label: 'Less than ₹1,000',
        description: '',
        icon: ''
      },
      {
        id: '1kto3k',
        value: '1kto3k',
        label: '₹1,000 – ₹3,000',
        description: '',
        icon: ''
      },
      {
        id: '3kto7k',
        value: '3kto7k',
        label: '₹3,000 – ₹7,000',
        description: '',
        icon: ''
      },
      {
        id: 'moreThan7k',
        value: 'moreThan7k',
        label: 'More than ₹7,000',
        description: '',
        icon: ''
      }
    ]
  },
  {
    id: 'makeupSkills',
    title: 'What are your makeup skills?',
    subtitle: '',
    type: 'single',
    options: [
      {
        id: 'beginner',
        value: 'beginner',
        label: 'Beginner',
        description: 'I\'m not sure which makeup products to use',
        icon: ''
      },
      {
        id: 'novice',
        value: 'novice',
        label: 'Novice',
        description: 'I know basic products but struggle with the techniques',
        icon: ''
      },
      {
        id: 'intermediate',
        value: 'intermediate',
        label: 'Intermediate',
        description: 'I manage everyday makeup but struggle with special looks.',
        icon: ''
      },
      {
        id: 'proficient',
        value: 'proficient',
        label: 'Proficient',
        description: 'I handle basic techniques but seek advanced skills.',
        icon: ''
      },
      {
        id: 'expert',
        value: 'expert',
        label: 'Expert',
        description: 'I\'m a pro at makeup, but crave fresh inspiration',
        icon: ''
      }
    ]
  },
  {
    id: 'hopingToIncrease',
    title: 'I\'m hoping Skyfluence Beauty will help me increase my...',
    subtitle: 'Select all that apply',
    type: 'multiple',
    options: [
      {
        id: 'selfConfidence',
        value: 'selfConfidence',
        label: 'Self-confidence',
        description: '',
        icon: ''
      },
      {
        id: 'selfWorth',
        value: 'selfWorth',
        label: 'Self-worth',
        description: '',
        icon: ''
      },
      {
        id: 'selfAwareness',
        value: 'selfAwareness',
        label: 'Self-awareness',
        description: '',
        icon: ''
      },
      {
        id: 'selfAcceptance',
        value: 'selfAcceptance',
        label: 'Self-acceptance',
        description: '',
        icon: ''
      },
      {
        id: 'selfCare',
        value: 'selfCare',
        label: 'Self-care',
        description: '',
        icon: ''
      },
      {
        id: 'other',
        value: 'other',
        label: 'Other',
        description: '',
        icon: ''
      }
    ]
  },
  {
    id: 'whenHappyWithLook',
    title: 'When I\'m happy with how I look, I\'d like to...',
    subtitle: 'Select all that apply',
    type: 'multiple',
    options: [
      {
        id: 'doWhatILove',
        value: 'doWhatILove',
        label: 'Do what I love with more confidence',
        description: '',
        icon: ''
      },
      {
        id: 'attendSpecialEvent',
        value: 'attendSpecialEvent',
        label: 'Attend a special event',
        description: '',
        icon: ''
      },
      {
        id: 'spendTimeWithClosePeople',
        value: 'spendTimeWithClosePeople',
        label: 'Spend more time with close people',
        description: '',
        icon: ''
      },
      {
        id: 'surpriseSignificantOther',
        value: 'surpriseSignificantOther',
        label: 'Surprise my significant other',
        description: '',
        icon: ''
      },
      {
        id: 'shareSelfies',
        value: 'shareSelfies',
        label: 'Share selfies',
        description: '',
        icon: ''
      },
      {
        id: 'enjoyHowPeopleLook',
        value: 'enjoyHowPeopleLook',
        label: 'Enjoy how people look at me',
        description: '',
        icon: ''
      }
    ]
  },
  {
    id: 'concerns',
    title: 'What Are Your Main Skin Concerns?',
    subtitle: 'Select all that apply to your skin goals.',
    type: 'multiple',
    options: [
      { 
        id: 'concern-aging', 
        value: 'aging', 
        label: 'Aging & Wrinkles',
        icon: ''
      },
      { 
        id: 'concern-acne', 
        value: 'acne', 
        label: 'Acne & Breakouts',
        icon: ''
      },
      { 
        id: 'concern-dark-spots', 
        value: 'dark-spots', 
        label: 'Dark Spots & Hyperpigmentation',
        icon: ''
      },
      { 
        id: 'concern-dryness', 
        value: 'dryness', 
        label: 'Dryness & Dehydration',
        icon: ''
      },
      { 
        id: 'concern-pores', 
        value: 'pores', 
        label: 'Large Pores',
        icon: ''
      },
      { 
        id: 'concern-redness', 
        value: 'redness', 
        label: 'Redness & Inflammation',
        icon: ''
      },
      { 
        id: 'concern-dullness', 
        value: 'dullness', 
        label: 'Dullness & Lack of Radiance',
        icon: ''
      },
      { 
        id: 'concern-texture', 
        value: 'texture', 
        label: 'Uneven Texture',
        icon: ''
      },
    ]
  },
  {
    id: 'currentRoutine',
    title: "What's Your Current Skincare Routine?",
    subtitle: 'This helps us recommend the right products for your routine.',
    type: 'single',
    options: [
      { 
        id: 'routine-minimal', 
        value: 'minimal', 
        label: 'Minimal',
        description: 'Just cleanser and moisturizer',
        icon: ''
      },
      { 
        id: 'routine-basic', 
        value: 'basic', 
        label: 'Basic',
        description: 'Cleanser, toner, moisturizer',
        icon: ''
      },
      { 
        id: 'routine-advanced', 
        value: 'advanced', 
        label: 'Advanced',
        description: 'Multiple serums and treatments',
        icon: ''
      },
      { 
        id: 'routine-none', 
        value: 'none', 
        label: 'No Routine',
        description: 'Starting from scratch',
        icon: ''
      },
    ]
  },
  {
    id: 'lifestyle',
    title: "What's Your Lifestyle Like?",
    subtitle: 'This helps us recommend products that fit your daily routine.',
    type: 'single',
    options: [
      { 
        id: 'lifestyle-busy', 
        value: 'busy', 
        label: 'Busy & Active',
        description: 'Quick, effective solutions',
        icon: ''
      },
      { 
        id: 'lifestyle-relaxed', 
        value: 'relaxed', 
        label: 'Relaxed & Pampering',
        description: 'Luxurious, indulgent routine',
        icon: ''
      },
      { 
        id: 'lifestyle-natural', 
        value: 'natural', 
        label: 'Natural & Organic',
        description: 'Clean, green ingredients',
        icon: ''
      },
      { 
        id: 'lifestyle-results', 
        value: 'results', 
        label: 'Results-Driven',
        description: 'Clinical, proven formulas',
        icon: ''
      },
    ]
  },
  {
    id: 'environment',
    title: "What's Your Environment Like?",
    subtitle: 'Environmental factors affect your skin\'s needs.',
    type: 'single',
    options: [
      { 
        id: 'env-dry', 
        value: 'dry-climate', 
        label: 'Dry Climate',
        description: 'Desert, low humidity',
        icon: ''
      },
      { 
        id: 'env-humid', 
        value: 'humid-climate', 
        label: 'Humid Climate',
        description: 'Tropical, high humidity',
        icon: ''
      },
      { 
        id: 'env-polluted', 
        value: 'polluted', 
        label: 'Urban/Polluted',
        description: 'City living, pollution',
        icon: ''
      },
      { 
        id: 'env-seasonal', 
        value: 'seasonal', 
        label: 'Seasonal Changes',
        description: 'Four distinct seasons',
        icon: ''
      },
    ]
  },
  {
    id: 'budget',
    title: "What's Your Budget Range?",
    subtitle: 'We\'ll recommend products that fit your investment level.',
    type: 'single',
    options: [
      { 
        id: 'budget-low', 
        value: 'budget', 
        label: 'Budget-Friendly',
        description: '₹200–₹500 per product'
      },
      { 
        id: 'budget-mid', 
        value: 'mid-range', 
        label: 'Mid-Range',
        description: '₹500–₹1,500 per product'
      },
      { 
        id: 'budget-high', 
        value: 'premium', 
        label: 'Premium',
        description: '₹1,500+ per product'
      },
      { 
        id: 'budget-unlimited', 
        value: 'no-limit', 
        label: 'No Limit',
        description: 'Best of the best'
      },
    ]
  },
] 