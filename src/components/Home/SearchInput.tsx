'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useGetAdvancedSearchQuery } from '@/store/apiSlice';
import { CategoryType, EServiceType } from '@/types/services';
import { CategoryService } from '@/services/categoryService';
import { generateServiceSlug, getThumbnail } from '@/helper/search.helper';

// Debounce hook
function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function SearchInput() {
  const [query, setQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const debouncedQuery = useDebounce(query, 300);

  const { data: searchResults, isFetching } = useGetAdvancedSearchQuery(
    debouncedQuery,
    {
      skip: debouncedQuery.length < 2,
    }
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsDropdownOpen(value.length >= 2);
  };

  const handleCategoryClick = (category: CategoryType) => {
    const slug = CategoryService.generateCategorySlug(category.name.en, category.id);
    router.push(`/category/${slug}`);
    setIsDropdownOpen(false);
    setQuery('');
  };

  const handleServiceClick = (service: EServiceType) => {
    const slug = generateServiceSlug(service.name.en, service.id);
    router.push(`/services/${slug}`);
    setIsDropdownOpen(false);
    setQuery('');
  };


  return (
    <div className="relative" ref={dropdownRef}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="What service are you looking for?"
        className="w-full px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      {isDropdownOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {isFetching ? (
            <div className="p-4 text-center text-gray-500">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2 text-sm">Searching...</p>
            </div>
          ) : (searchResults?.categories?.length || searchResults?.e_services?.length) ? (
            <>
              {/* Categories */}
              {searchResults.categories && searchResults.categories.length > 0 && (
                <div className="p-2">
                  <h3 className="text-sm font-semibold text-gray-600 mb-2 px-2">Categories</h3>
                  {searchResults.categories.map((category) => (
                    <div
                      key={`category-${category.id}`}
                      onClick={() => handleCategoryClick(category)}
                      className="flex items-center p-3 hover:bg-gray-50 cursor-pointer rounded-md transition-colors"
                    >
                      <img
                        // src={getThumbnail(category)}
                        src={category.media?.[0]?.url || '/images/default-service.png'}
                        alt={category.name.en}
                        className="w-12 h-12 rounded-md object-cover mr-3"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900">{category.name.en}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Services */}
              {searchResults.e_services && searchResults.e_services.length > 0 && (
                <div className="p-2 border-t border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-600 mb-2 px-2">Services</h3>
                  {searchResults.e_services.map((service) => (
                    <div
                      key={`service-${service.id}`}
                      onClick={() => handleServiceClick(service)}
                      className="flex items-center p-3 hover:bg-gray-50 cursor-pointer rounded-md transition-colors"
                    >
                      <img
                        src={getThumbnail(service)}
                        alt={service.name.en}
                        className="w-12 h-12 rounded-md object-cover mr-3"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{service.name.en}</h4>
                        <p className="text-sm text-green-600 font-semibold">
                          ${service.discount_price > 0 ? service.discount_price : service.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="p-4 text-center text-gray-500">
              <p className="text-sm">No results found!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
