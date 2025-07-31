'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface PaymentPageProps {
  onComplete: () => void
}

export default function PaymentPage({ onComplete }: PaymentPageProps) {
  const [selectedPlan, setSelectedPlan] = useState('4-week')
  const router = useRouter()
  const plans = [
    {
      id: '4-week',
      name: '4-WEEK PLAN',
      price: '₹499',
      dailyPrice: '₹18 per day',
      popular: false,
      originalPrice: '₹999'
    },
    {
      id: '12-week',
      name: '12-WEEK PLAN',
      price: '₹899',
      dailyPrice: '₹11 per day',
      popular: true,
      originalPrice: '₹1399'
    },
    {
      id: '52-week',
      name: '52-WEEK PLAN',
      price: '₹1499',
      dailyPrice: '₹4 per day',
      popular: false,
      originalPrice: '₹2499'
    }
  ]
  const selectedPlanData = plans.find(plan => plan.id === selectedPlan)

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const faqs = [
    {
      q: 'How do I get access to the plan?',
      a: "Once you begin your plan, you'll instantly access your content page. We'll also email you a link to your plan so you can return anytime."
    },
    {
      q: 'What if I don\'t like the beauty routines?',
      a: 'You can cancel anytime within 30 days for a full refund, no questions asked.'
    },
    {
      q: 'Will all the preferences I provided be taken into consideration?',
      a: 'Yes! Your plan is personalized based on your answers and preferences.'
    }
  ]
  // Reviews
  const reviews = [
    {
      name: 'Leilany Hall',
      date: 'Nov 21, 2024',
      stars: 5,
      title: 'Made me look great despite menopause!',
      text: "Recent hormonal changes made me less attractive in the mirror. Skyfluence Beauty has been essential for me because it's helped me feel confident and elegant.",
      location: 'New Jersey',
      age: 52
    },
    {
      name: 'Giuliana Tang',
      date: 'Nov 17, 2024',
      stars: 5,
      title: 'Helped me pick the right products',
      text: 'I felt like cosmetics shopping wasn\'t for me: too many products and brands, but nothing looked well on me. Skyfluence Beauty helped prove me wrong!',
      location: 'Los Angeles',
      age: 31
    },
    {
      name: 'Della Herrera',
      date: 'Nov 17, 2024',
      stars: 5,
      title: 'No more confusion',
      text: 'I finally have a routine that works for me. The guesswork and confusion is in the past.',
      location: 'Delaware',
      age: 47
    }
  ]
  // User images
  const userImages = [
    '/images/user1.jpg',
    '/images/user2.jpg',
    '/images/user3.jpg',
    '/images/user4.jpg'
  ]

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      {/* Discount Banner */}
      <div className="bg-black text-white text-center py-3 w-full">
        <span className="text-base font-serif">Your <span className="italic">Secret Discount</span> Has Been Applied</span>
      </div>

      <div className="w-full max-w-lg mx-auto flex flex-col items-center px-4 py-8">
        {/* Main Heading */}
        <h1 className="text-2xl md:text-3xl font-display font-bold text-center mb-2 mt-4">Your <span className="italic">4-week</span> plan is ready!</h1>

        {/* Plan Selection */}
        <div className="w-full space-y-3 mb-4 mt-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative border-2 rounded-lg p-4 flex items-center justify-between cursor-pointer transition-all touch-manipulation bg-white ${
                selectedPlan === plan.id
                  ? 'border-black shadow-lg'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              <div>
                <div className="text-base font-semibold font-display">{plan.name}</div>
                <div className="text-xs text-gray-500 line-through">{plan.originalPrice}</div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-2xl font-bold font-display">{plan.dailyPrice}</span>
                <span className="text-xs text-gray-600">per day</span>
                <span className="text-lg font-bold font-display">{plan.price}</span>
                {plan.popular && (
                  <span className="absolute top-2 right-3 bg-black text-white text-xs px-2 py-1 rounded-full">MOST POPULAR</span>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center text-xs text-gray-700 mb-4">30-DAY MONEY-BACK GUARANTEE</div>
        <button
          onClick={() => {
            // Save selected plan to localStorage
            const selectedPlanData = plans.find(plan => plan.id === selectedPlan);
            localStorage.setItem('selectedPlan', JSON.stringify({
              id: selectedPlan,
              name: selectedPlanData?.name || '',
              price: selectedPlanData?.price || '',
              originalPrice: selectedPlanData?.originalPrice || '',
              dailyPrice: selectedPlanData?.dailyPrice || ''
            }));
            router.push('/contact-form');
          }}
          className="w-full bg-black text-white py-4 rounded font-semibold text-lg mb-4 hover:bg-gray-900 transition-all"
        >
          GET MY PLAN
        </button>
        <div className="text-[11px] text-gray-500 text-center mb-8">
          By clicking "Get My Plan", you agree to enroll in a 4-week subscription to Skyfluence Beauty. You can cancel anytime within 30 days for a full refund. See our <a href="#" className="underline">Subscription Terms</a>.
        </div>

        {/* Benefits Section */}
        <h2 className="text-xl font-display font-bold text-center mb-2 mt-8">With Skyfluence Beauty <span className="italic">You Will:</span></h2>
        <ul className="w-full max-w-md mx-auto mb-8">
          {[
            'Appear decades younger',
            'Look confident and fresh',
            'Have stress-free shopping',
            'Stop being invisible',
            'Spend less but get more',
            'Leave judgement behind'
          ].map((benefit, i) => (
            <li key={i} className="flex items-center justify-between py-1 border-b border-gray-100 last:border-b-0">
              <span className="text-gray-800 text-base">{benefit}</span>
              <span className="text-green-600 text-lg">✓</span>
            </li>
          ))}
        </ul>

        {/* User Images Section */}
        <h2 className="text-xl font-display font-bold text-center mb-2 mt-8">People Just Like You <span className="italic">Achieved Great Results</span> Using Skyfluence Beauty</h2>
        <div className="flex justify-center space-x-2 mb-8">
          {userImages.map((img, i) => (
            <img key={i} src={img} alt="User" className="w-20 h-20 rounded-full object-cover border-2 border-gray-200" loading="lazy" />
          ))}
        </div>

        {/* FAQ Section */}
        <h2 className="text-xl font-display font-bold text-center mb-2 mt-8">People Often Ask</h2>
        <div className="w-full max-w-md mx-auto mb-8">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-gray-200 py-2">
              <button
                className="w-full flex justify-between items-center text-left text-base font-medium text-gray-900 focus:outline-none"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                {faq.q}
                <span className="ml-2">{openFaq === i ? '-' : '+'}</span>
              </button>
              {openFaq === i && (
                <div className="mt-2 text-gray-700 text-sm">{faq.a}</div>
              )}
            </div>
          ))}
        </div>

        {/* Reviews Section */}
        <h2 className="text-xl font-display font-bold text-center mb-2 mt-8">People Love <span className="italic">Our Plan</span></h2>
        <div className="w-full max-w-md mx-auto mb-8 space-y-4">
          {reviews.map((review, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 shadow">
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-500 mr-2">
                  {[...Array(review.stars)].map((_, idx) => (
                    <svg key={idx} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="font-semibold text-gray-900 mr-2">{review.name}</span>
                <span className="text-xs text-gray-500">{review.date}</span>
              </div>
              <div className="font-bold text-gray-900 mb-1">{review.title}</div>
              <div className="text-gray-700 text-sm mb-1">{review.text}</div>
              <div className="text-xs text-gray-500">Location: {review.location}</div>
              <div className="text-xs text-gray-500">Age: {review.age}</div>
            </div>
          ))}
        </div>

        {/* Money Back Policy Section */}
        <div className="w-full max-w-md mx-auto mb-8">
          <h3 className="text-lg font-bold text-center mb-2">Our money back policy</h3>
          <p className="text-xs text-gray-500 text-center">
            We believe that our challenge will work for you and you'll get visible results. We even are ready to return your money back if the content is defective or completely inaccurate.<br />
            Find more about applicable limitations in our <a href="#" className="underline">money-back policy</a>.
          </p>
        </div>
      </div>
      {/* Sticky Footer CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex items-center justify-between px-4 py-3 z-50">
        <span className="font-serif text-lg text-gray-900">Skyfluence <span className="text-gray-500">Beauty</span></span>
        <button
          onClick={() => {
            // Save selected plan to localStorage
            const selectedPlanData = plans.find(plan => plan.id === selectedPlan);
            localStorage.setItem('selectedPlan', JSON.stringify({
              id: selectedPlan,
              name: selectedPlanData?.name || '',
              price: selectedPlanData?.price || '',
              originalPrice: selectedPlanData?.originalPrice || '',
              dailyPrice: selectedPlanData?.dailyPrice || ''
            }));
            router.push('/contact-form');
          }}
          className="bg-black text-white px-8 py-3 rounded font-semibold text-base hover:bg-gray-900 transition-all"
        >
          GET MY PLAN
        </button>
      </div>
    </div>
  )
} 