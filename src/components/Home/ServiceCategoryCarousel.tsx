'use client';
import { useRef } from 'react';
import { useGetCategoriesQuery } from '@/store/apiSlice';
import Link from 'next/link';

export default function ServiceCategoryCarousel() {
  const { data: categories = [], isLoading, error } = useGetCategoriesQuery();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  console.log({error, categories});
  

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Service Categories</h2>
        
        <div className="relative">
          <div 
            ref={scrollRef}
            className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide"
          >
            {isLoading && <div className="text-center p-4">Loading categories...</div>}
            {error && <div className="text-red-500 p-4">Error loading categories</div>}
            {categories?.map((category: {
              id: number;
              name: { en: string };
              media: Array<{ url: string }>;
              color: string;
              has_media: boolean;
              featured: boolean;
            }) => (
              <div 
                key={category.id}
                className="flex-shrink-0 w-40 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                style={{ borderColor: category.color }}
              >
                <img 
                  src={category.media?.[0]?.url || '/icons/default-service.png'}
                  alt={category.name.en}
                  className="w-12 h-12 object-contain mx-auto mb-2"
                />
                <h3 className="text-sm font-medium text-gray-900 text-center">
                  {category.name.en}
                </h3>
              </div>
            ))}
            
            {/* More Button */}
            <div className="flex-shrink-0 flex items-center px-6">
                <Link
                href="/services" 
                className="whitespace-nowrap px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium transition-colors cursor-pointer"
                >
                View All Categories →
                </Link>
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
