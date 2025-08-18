'use client';

import { useRef } from 'react';

const categories = [
  { id: 1, name: 'Plumbing', icon: '🔧' },
  { id: 2, name: 'Electrical', icon: '💡' },
  { id: 3, name: 'Cleaning', icon: '🧹' },
  { id: 4, name: 'AC Repair', icon: '❄️' },
  { id: 5, name: 'Painting', icon: '🎨' },
  { id: 6, name: 'Carpentry', icon: '🪚' },
  { id: 7, name: 'Gardening', icon: '🌿' },
  { id: 8, name: 'Pest Control', icon: '🐜' },
];

export default function ServiceCategoryCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Service Categories</h2>
        
        <div className="relative">
          <div 
            ref={scrollRef}
            className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide"
          >
            {categories.map((category) => (
              <div 
                key={category.id}
                className="flex-shrink-0 w-40 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <h3 className="text-sm font-medium text-gray-900">{category.name}</h3>
              </div>
            ))}
            
            {/* More Button */}
            <div className="flex-shrink-0 flex items-center px-6">
              <button className="whitespace-nowrap px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium transition-colors">
                View All Categories →
              </button>
            </div>
            
          </div>
          
          {/* Scroll right button */}
          <button 
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-colors z-10"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Gradient overlay */}
          <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-white to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
