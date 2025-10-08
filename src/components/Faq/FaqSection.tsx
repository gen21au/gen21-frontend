"use client";
import { useState } from 'react';
import { useGetFaqsQuery } from '@/store/apiSlice';
import { FaqCategory } from '@/types/faq';

interface FAQ {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  faqs?: FAQ[];
  title?: string;
}

export default function FaqSection({ faqs, title = "Frequently Asked Questions" }: FaqSectionProps = {}) {
  // Always call hooks at the top level, before any conditional logic
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { data: faqCategories, isLoading, error } = useGetFaqsQuery();
  const [activeTab, setActiveTab] = useState<number>(0);

  // If faqs prop is provided, render static FAQs (for service details)
  if (faqs) {
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

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-red-500">Failed to load FAQs. Please try again later.</p>
      </div>
    );
  }

  if (!faqCategories || faqCategories.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
        <p className="text-gray-500 text-center py-4">No FAQs available.</p>
      </div>
    );
  }

  const currentCategory = faqCategories[activeTab];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>

      {/* Tabs */}
      <div className="flex flex-wrap border-b border-gray-200 mb-6">
        {faqCategories.map((category: FaqCategory, index: number) => (
          <button
            key={category.id}
            className={`py-2 px-4 font-medium text-sm border-b-2 transition-colors ${
              activeTab === index
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => {
              setActiveTab(index);
              setOpenIndex(null); // Reset open accordion when switching tabs
            }}
          >
            {category.name.en}
          </button>
        ))}
      </div>

      {/* FAQs for current category */}
      <div className="space-y-4">
        {currentCategory.faqs.map((item, index) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md"
          >
            <button
              className={`w-full text-left py-4 px-6 flex justify-between items-center ${openIndex === index ? 'bg-blue-50' : 'bg-white hover:bg-gray-50'}`}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <h3 className="text-lg font-semibold text-gray-800" dangerouslySetInnerHTML={{ __html: item.question.en }} />
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
              <div className="px-6 py-4 bg-white text-gray-700 leading-relaxed border-t border-gray-100" dangerouslySetInnerHTML={{ __html: item.answer.en }} />
            </div>
          </div>
        ))}
      </div>

      {currentCategory.faqs.length === 0 && (
        <p className="text-gray-500 text-center py-4">No FAQs available for this category.</p>
      )}
    </div>
  );
}
