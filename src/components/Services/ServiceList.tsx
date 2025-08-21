'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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

interface ServiceProps {
  id: number;
  categoryId: number;
  title: string;
  description: string;
  rating: number;
  reviews: number;
  price: number;
  image: string;
  featured?: boolean;
}

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
  
  // State to track if services are loading
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading delay (remove this in production and replace with actual API call)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle image load
  const handleImageLoad = (serviceId: number) => {
    setLoadedImages(prev => ({
      ...prev,
      [serviceId]: true
    }));
  };
  // TODO: Replace with API data
  const services: ServiceProps[] = [
    // Design & Creative (Category 1)
    { 
      id: 1,
      categoryId: 1,
      title: 'Logo Design',
      description: 'Professional logo design with unlimited revisions',
      rating: 4.9,
      reviews: 128,
      price: 199,
      image: '/service-thumb.png',
      featured: true
    },
    { 
      id: 2,
      categoryId: 1,
      title: 'Brand Identity Design',
      description: 'Complete brand identity package including logo, colors, and typography',
      rating: 4.8,
      reviews: 89,
      price: 499,
      image: '/service-thumb.png'
    },
    { 
      id: 3,
      categoryId: 1,
      title: 'UI/UX Design',
      description: 'User-centered interface and experience design for web and mobile',
      rating: 4.7,
      reviews: 76,
      price: 699,
      image: '/service-thumb.png'
    },
    
    // Development (Category 2)
    {
      id: 4,
      categoryId: 2,
      title: 'Website Development',
      description: 'Custom website development with responsive design',
      rating: 4.9,
      reviews: 156,
      price: 999,
      image: '/service-thumb.png',
      featured: true
    },
    {
      id: 5,
      categoryId: 2,
      title: 'Mobile App Development',
      description: 'Native iOS and Android app development',
      rating: 4.8,
      reviews: 112,
      price: 1499,
      image: '/service-thumb.png'
    },
    
    // Marketing (Category 3)
    {
      id: 6,
      categoryId: 3,
      title: 'Social Media Strategy',
      description: 'Comprehensive social media marketing strategy and implementation',
      rating: 4.7,
      reviews: 95,
      price: 399,
      image: '/service-thumb.png',
      featured: true
    },
    {
      id: 7,
      categoryId: 3,
      title: 'SEO Optimization',
      description: 'Search engine optimization to improve your website ranking',
      rating: 4.8,
      reviews: 78,
      price: 299,
      image: '/service-thumb.png'
    },
    
    // Writing (Category 4)
    {
      id: 8,
      categoryId: 4,
      title: 'Resume Writing',
      description: 'Professional resume writing and optimization',
      rating: 4.9,
      reviews: 67,
      price: 149,
      image: '/service-thumb.png',
      featured: true
    },
    
    // Photography (Category 5)
    {
      id: 9,
      categoryId: 5,
      title: 'Product Photography',
      description: 'High-quality product photography for e-commerce',
      rating: 4.8,
      reviews: 54,
      price: 249,
      image: '/service-thumb.png',
      featured: true
    },
    
    // Home Maintenance (Category 6)
    {
      id: 10,
      categoryId: 6,
      title: 'AC Repair Service',
      description: 'Professional AC repair and maintenance',
      rating: 4.7,
      reviews: 112,
      price: 99,
      image: '/service-thumb.png',
      featured: true
    },
    {
      id: 11,
      categoryId: 6,
      title: 'Plumbing Services',
      description: 'Expert plumbing repair and installation',
      rating: 4.6,
      reviews: 89,
      price: 79,
      image: '/service-thumb.png'
    },
    
    // Cleaning (Category 7)
    {
      id: 12,
      categoryId: 7,
      title: 'Deep Cleaning Service',
      description: 'Thorough home cleaning service',
      rating: 4.8,
      reviews: 134,
      price: 149,
      image: '/service-thumb.png',
      featured: true
    },
    
    // Electrical (Category 8)
    {
      id: 13,
      categoryId: 8,
      title: 'Electrical Wiring',
      description: 'Professional electrical wiring and repair',
      rating: 4.7,
      reviews: 76,
      price: 89,
      image: '/service-thumb.png',
      featured: true
    },
  ];

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

  // Group services by category
  const servicesByCategory = services.reduce<{ [key: number]: ServiceProps[] }>((acc, service) => {
    if (!acc[service.categoryId]) {
      acc[service.categoryId] = [];
    }
    acc[service.categoryId].push(service);
    return acc;
  }, {});

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

  // Get category name from ID (this would normally come from your API)
  const getCategoryName = (categoryId: number): string => {
    const categoryMap: { [key: number]: string } = {
      1: 'Design & Creative',
      2: 'Development',
      3: 'Marketing',
      4: 'Writing',
      5: 'Photography',
      6: 'Home Maintenance',
      7: 'Cleaning',
      8: 'Electrical',
    };
    return categoryMap[categoryId] || 'Unknown Category';
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
              // Show skeleton loaders when loading
              Array.from({ length: initialServicesPerCategory }).map((_, index) => (
                <div key={`skeleton-${categoryId}-${index}`}>
                  <ServiceCardSkeleton />
                </div>
              ))
            ) : (
              // Show actual services when loaded
              servicesByCategory[categoryId]
                .slice(0, visibleServicesCount[categoryId] || initialServicesPerCategory)
                .map((service) => (
              <Link 
                href={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`}
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
                        src={service.image} 
                        alt={service.title}
                        width={400}
                        height={300}
                        className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${!loadedImages[service.id] ? 'opacity-0' : 'opacity-100'}`}
                        onLoad={() => handleImageLoad(service.id)}
                      />
                    </div>
                    {service.featured && (
                      <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                        Featured
                      </div>
                    )}
                  </div>
                  
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="font-semibold text-lg mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 flex-grow">
                      {service.description}
                    </p>
                    
                    <div className="flex justify-between items-center mt-auto">
                      <div className="flex items-center">
                        <div className="flex text-yellow-400">
                          <span>★</span>
                          <span className="ml-1 text-gray-700">{service.rating}</span>
                        </div>
                        <span className="text-gray-500 text-sm ml-1">({service.reviews})</span>
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
