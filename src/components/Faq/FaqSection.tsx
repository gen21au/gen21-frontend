"use client";
import { useState } from 'react';

const faqItems = [
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

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto">
      {faqItems.map((item, index) => (
        <div key={index} className="border-b border-gray-200 mb-4">
          <button
            className="w-full text-left py-4 px-6 hover:bg-gray-50"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <h3 className="text-lg font-semibold">{item.question}</h3>
          </button>
          {openIndex === index && (
            <div className="px-6 pb-4 text-gray-600">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
