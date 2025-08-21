"use client";
import { useState } from 'react';

const defaultFaqs = [
  {
    question: "How do I get started?",
    answer: "Begin by creating an account and completing your profile setup."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards and PayPal."
  },
  {
    question: "Can I cancel my subscription?",
    answer: "Yes, you can cancel anytime from your account settings."
  }
];

interface FAQ {
  question: string;
  answer: string;
}

export default function FaqSection({ faqs = defaultFaqs, title = "Frequently Asked Questions" }: { faqs?: FAQ[], title?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      
      <div className="space-y-4">
        {faqs.map((item, index) => (
          <div 
            key={index} 
            className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md"
          >
            <button
              className={`w-full text-left py-4 px-6 flex justify-between items-center ${openIndex === index ? 'bg-blue-50' : 'bg-white hover:bg-gray-50'}`}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <h3 className="text-lg font-semibold text-gray-800">{item.question}</h3>
              <svg 
                className={`w-5 h-5 text-blue-600 transition-transform duration-200 ${openIndex === index ? 'transform rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <div 
              className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}
            >
              <div className="px-6 py-4 bg-white text-gray-700 leading-relaxed border-t border-gray-100">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {faqs.length === 0 && (
        <p className="text-gray-500 text-center py-4">No FAQs available for this service.</p>
      )}
    </div>
  );
}
