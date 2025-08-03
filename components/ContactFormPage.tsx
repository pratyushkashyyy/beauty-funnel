"use client";
declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    gtag?: (...args: any[]) => void;
  }
}
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ContactFormPage() {
  const [form, setForm] = useState({ name: '', contact: '', email: '' });
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fire QuizCompleted event when component mounts (user reached contact form)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Meta Pixel
      if (window.fbq) {
        window.fbq('trackCustom', 'QuizCompleted');
      }
      // Google Analytics 4
      if (window.gtag) {
        window.gtag('event', 'quiz_complete', {
          event_category: 'Quiz',
          event_label: 'Quiz Completed',
          custom_parameter_1: 'contact_form',
          custom_parameter_3: localStorage.getItem('sessionId') || 'unknown'
        });
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.contact || !form.email) {
      setError('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Set submitted state immediately since we're not sending to make.com anymore
      setSubmitted(true);
      
      // Fire Meta Lead event
      if (typeof window !== 'undefined') {
        if (window.fbq) {
          window.fbq('track', 'Lead');
        }
        if (window.gtag) {
          window.gtag('event', 'generate_lead', {
            event_category: 'Lead',
            event_label: 'Contact Form Submitted',
            custom_parameter_1: form.email,
            custom_parameter_3: localStorage.getItem('sessionId') || 'unknown'
          });
        }
      }
      
      // Fire Meta Purchase event after successful submission
      setTimeout(() => {
        // Get selected plan from localStorage
        const selectedPlanData = localStorage.getItem('selectedPlan');
        const plan = selectedPlanData ? JSON.parse(selectedPlanData) : null;
        
        // Extract price value (remove ₹ symbol and convert to number)
        const priceValue = plan?.price ? parseFloat(plan.price.replace('₹', '')) : 0.00;
        const planName = plan?.name || 'Beauty Quiz Consultation';
        const planId = plan?.id || 'beauty_quiz_consultation';
        
        if (typeof window !== 'undefined' && window.fbq) {
          window.fbq('track', 'Purchase', {
            value: priceValue,
            currency: 'INR',
            content_name: planName,
            content_category: 'Beauty Quiz',
            content_type: 'product',
            content_ids: [planId],
            num_items: 1,
            custom_parameter_1: form.email,
            custom_parameter_2: 'quiz_completed',
            custom_parameter_3: localStorage.getItem('sessionId') || 'unknown',
            custom_parameter_4: plan?.id || 'unknown_plan'
          });
        }
        
        // Google Analytics 4 Purchase event
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'purchase', {
            transaction_id: `quiz_${Date.now()}`,
            value: priceValue,
            currency: 'INR',
            items: [{
              item_id: planId,
              item_name: planName,
              item_category: 'Beauty Quiz',
              quantity: 1,
              price: priceValue
            }],
            custom_parameter_1: form.email,
            custom_parameter_3: localStorage.getItem('sessionId') || 'unknown',
            custom_parameter_4: plan?.id || 'unknown_plan'
          });
        }
      }, 1000); // 1 second delay to ensure thank you page is shown
    } catch (err) {
      console.error('Submission error:', err);
      setError('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Bar */}
      <header className="w-full bg-white/90 border-b border-gray-200 shadow-sm py-4 px-4 flex items-center justify-center sticky top-0 z-20">
        <span className="font-serif text-2xl font-bold text-gray-900">Skyfluence <span className="text-gray-500 font-normal">Beauty</span></span>
      </header>

      {/* Main Form or Thank You */}
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 mt-8 mb-8">
            <h1 className="text-2xl font-bold mb-6 text-center font-display">Contact Details</h1>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Number *
                </label>
                <input
                  type="tel"
                  id="contact"
                  value={form.contact}
                  onChange={(e) => setForm({...form, contact: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        ) : (
          <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 mt-8 mb-8 flex flex-col items-center justify-center">
            <div className="text-green-500 mb-4">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-4 text-center">Thank you!</h1>
            <p className="text-center text-gray-600">We will get back to you with your personalized beauty plan.</p>
          </div>
        )}
      </main>

      {/* Bottom Section */}
      <footer className="w-full bg-white/80 border-t border-gray-200 py-6 px-4 flex flex-col items-center">
        <div className="text-gray-700 text-center text-base font-serif mb-2">We're here to help you look and feel your best.</div>
        <div className="text-xs text-gray-500 text-center">Need help? Email us at <a href="mailto:support@skyfluence-beauty.com" className="underline">support@skyfluence-beauty.com</a></div>
      </footer>
    </div>
  );
} 