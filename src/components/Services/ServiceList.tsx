'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useGetAllCategoryServicesQuery } from '@/store/apiSlice';
import { ServiceItem, CategoryWithServices } from '@/types/services';
import { generateSlug } from '@/helper/common.helper';
import Spinner from '@/components/Common/Spinner';

// Skeleton loader component for service cards
const ServiceCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col animate-pulse">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
        <div className="mt-auto flex justify-between items-center">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/5"></div>
        </div>
      </div>
    </div>
  );
};

interface ServiceListProps {
  activeCategoryId?: number;
  onCategoryVisible?: (categoryId: number) => void;
}

interface ServicesPerCategoryState {
  [categoryId: number]: number;
}

const ServiceList: React.FC<ServiceListProps> = ({
  activeCategoryId = 1,
  onCategoryVisible
}) => {
  // Initial number of services to show per category
  const initialServicesPerCategory = 3;

  // State to track how many services to show for each category
  const [visibleServicesCount, setVisibleServicesCount] = useState<ServicesPerCategoryState>({});

  // State to track which images are loaded
  const [loadedImages, setLoadedImages] = useState<{[key: number]: boolean}>({});

  const { data: categoriesData, isLoading, error } = useGetAllCategoryServicesQuery();

  // Handle image load
  const handleImageLoad = (serviceId: number) => {
    setLoadedImages(prev => ({
      ...prev,
      [serviceId]: true
    }));
  };

  // Create refs for each category section
  const categoryRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  
  // Function to set ref that returns void instead of the element
  const setRef = (categoryId: number) => (el: HTMLDivElement | null) => {
    categoryRefs.current[categoryId] = el;
  };

  // Set up intersection observer for scroll-based category selection
  useEffect(() => {
    if (!onCategoryVisible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const categoryId = Number(entry.target.getAttribute('data-category-id'));
            if (categoryId) {
              onCategoryVisible(categoryId);
            }
          }
        });
      },
      { threshold: 0.3, rootMargin: '-100px 0px -300px 0px' }
    );

    // Observe all category section elements
    Object.values(categoryRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      Object.values(categoryRefs.current).forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [onCategoryVisible]);

  // Get services data from API response
  const servicesByCategory = categoriesData?.reduce<{ [key: number]: ServiceItem[] }>((acc: { [key: number]: ServiceItem[] }, category: CategoryWithServices) => {
    category.services.forEach((service: ServiceItem) => {
      if (!acc[category.id]) {
        acc[category.id] = [];
      }
      acc[category.id].push(service);
    });
    return acc;
  }, {}) || {};

  // Get unique category IDs
  const categoryIds = Object.keys(servicesByCategory).map(Number);
  
  // Initialize visible services count for each category
  useEffect(() => {
    const initialCounts: ServicesPerCategoryState = {};
    categoryIds.forEach(categoryId => {
      initialCounts[categoryId] = initialServicesPerCategory;
    });
    
    // Only update if the values are different to prevent infinite loops
    setVisibleServicesCount(prev => {
      // Check if we need to update
      const needsUpdate = categoryIds.some(id => prev[id] === undefined);
      return needsUpdate ? initialCounts : prev;
    });
  }, [categoryIds, initialServicesPerCategory]);
  
  // Function to load more services for a category
  const handleLoadMore = (categoryId: number) => {
    setVisibleServicesCount(prev => ({
      ...prev,
      [categoryId]: prev[categoryId] + initialServicesPerCategory
    }));
  };

  // Get category name from API data
  const getCategoryName = (categoryId: number): string => {
    const category = categoriesData?.find(cat => cat.id === categoryId);
    return category?.name || 'Unknown Category';
  };

  // Convert HTML to plain text and truncate
  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  return (
    <div className="space-y-12">
      {categoryIds.map((categoryId) => (
        <div 
          key={categoryId}
          ref={setRef(categoryId)}
          data-category-id={categoryId}
          className={`scroll-mt-24 ${activeCategoryId === categoryId ? 'animate-fadeIn' : ''}`}
          id={`category-${categoryId}`}
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{getCategoryName(categoryId)}</h2>
            <div className="w-20 h-1 bg-blue-500 mt-2"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <Spinner />
            ) : (
              // Show actual services when loaded
              servicesByCategory[categoryId]
                .slice(0, visibleServicesCount[categoryId] || initialServicesPerCategory)
                .map((service) => (
              <Link 
                // href={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                href={`/services/${generateSlug(service.title, service.id)}`}
                key={service.id} 
                className="group"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col">
                  <div className="relative">
                    <div className="h-48 overflow-hidden">
                      {!loadedImages[service.id] && (
                        <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                      )}
                      <Image 
                        src={service.image || '/images/default-service.png'}
                        alt={service.title}
                        width={400}
                        height={300}
                        className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${!loadedImages[service.id] ? 'opacity-0' : 'opacity-100'}`}
                        onLoad={() => handleImageLoad(service.id)}
                        onError={(e) => {
                          e.currentTarget.src = '/images/default-service.png';
                          handleImageLoad(service.id);
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="font-semibold text-lg mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-2">
                      {stripHtml(service.description || '').slice(0, 100)}{stripHtml(service.description || '').length > 100 ? '...' : ''}
                    </p>
                    
                    <div className="flex justify-between items-center mt-auto">
                      <div className="flex items-center">
                        <div className="flex text-yellow-400">
                          <span>★</span>
                        <span className="ml-1 text-gray-700">{service.total_rate}</span>
                      </div>
                      <span className="text-gray-500 text-sm ml-1">({service.total_reviews})</span>
                      </div>
                      <div className="font-bold text-lg text-blue-600">${service.price}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
            )}
          </div>
          
          {/* Load More Button */}
          {servicesByCategory[categoryId].length > (visibleServicesCount[categoryId] || initialServicesPerCategory) && (
            <div className="mt-8 text-center">
              <button 
                onClick={() => handleLoadMore(categoryId)}
                className="bg-white border border-blue-500 text-blue-600 hover:bg-blue-50 font-medium py-2 px-6 rounded-md transition-colors"
              >
                Load More Services
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ServiceList;
