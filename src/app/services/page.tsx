'use client';

import React, { useState } from 'react';
import CategoryList from '@/components/Services/CategoryList';
import ServiceList from '@/components/Services/ServiceList';
import Link from 'next/link';

const AllServicesPage = () => {
  const [activeCategoryId, setActiveCategoryId] = useState<number>(1);

  // Handle category click from sidebar
  const handleCategoryClick = (categoryId: number) => {
    setActiveCategoryId(categoryId);
    // Scroll to the category section with improved smooth scrolling
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      // Add offset to account for sticky header
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Handle category visibility on scroll
  const handleCategoryVisible = (categoryId: number) => {
    setActiveCategoryId(categoryId);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-lg max-w-2xl">Browse our comprehensive range of professional services designed to meet your needs.</p>
        </div>
      </div>
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-900 font-medium">Services</span>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <CategoryList 
                activeCategoryId={activeCategoryId} 
                onCategoryClick={handleCategoryClick} 
              />
              
              {/* Help Box */}
              <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg mb-3">Need Help?</h3>
                <p className="text-gray-600 mb-4">Our team is here to help you find the right service for your needs.</p>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
          
          {/* Service Listings */}
          <div className="lg:col-span-3">
            <ServiceList 
              activeCategoryId={activeCategoryId}
              onCategoryVisible={handleCategoryVisible}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllServicesPage;
