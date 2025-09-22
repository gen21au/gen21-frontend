'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useGetAllCategoryServicesQuery } from '@/store/apiSlice';
import Spinner from '@/components/Common/Spinner';

interface CategoryProps {
  id: number;
  name: string;
  count: number;
  icon?: string;
}

interface CategoryListProps {
  activeCategoryId?: number;
  onCategoryClick?: (categoryId: number) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  activeCategoryId = 1,
  onCategoryClick
}) => {
  const { data: categoriesData, isLoading, error } = useGetAllCategoryServicesQuery();

  const categories: CategoryProps[] = categoriesData ? categoriesData.map(cat => ({
    id: cat.id,
    name: cat.name,
    count: cat.total_service_count,
    icon: cat.image
  })) : [];

  const [activeCategory, setActiveCategory] = useState<number>(activeCategoryId);
  const categoryRefs = useRef<Array<HTMLLIElement | null>>([]);

  // Function to set ref that returns void instead of the element
  const setRef = (index: number) => (el: HTMLLIElement | null) => {
    categoryRefs.current[index] = el;
  };
  
  // Update internal state when prop changes
  useEffect(() => {
    setActiveCategory(activeCategoryId);
  }, [activeCategoryId]);
  
  // Function to handle category click
  const handleCategoryClick = (categoryId: number) => {
    setActiveCategory(categoryId);
    if (onCategoryClick) {
      onCategoryClick(categoryId);
    }
  };

  // Set up intersection observer for scroll-based category selection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const categoryId = Number(entry.target.getAttribute('data-category-id'));
            if (categoryId && categoryId !== activeCategory) {
              setActiveCategory(categoryId);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observe all category elements
    categoryRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      categoryRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []); // Removed activeCategory from dependencies to prevent infinite loop

  return (
    <div className="bg-white rounded-lg shadow-md sticky top-24">
      <div className="p-5 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">Categories</h2>
        <p className="text-sm text-gray-500 mt-1">Browse services by category</p>
      </div>
      
      <ul className="py-2">
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <li className="px-5 py-3 text-red-500 text-sm">
            Error loading categories
          </li>
        ) : (
          categories.map((category, index) => (
            <li
              key={category.id}
              ref={setRef(index)}
              data-category-id={category.id}
              className={`flex items-center justify-between px-5 py-3 cursor-pointer transition-all duration-200 ${activeCategory === category.id ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-50 border-l-4 border-transparent'}`}
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="flex items-center">
                {category.icon && (
                  <img src={category.icon} alt={category.name} className="w-5 h-5 mr-3" />
                )}
                <span className={`${activeCategory === category.id ? 'font-medium text-blue-600' : 'text-gray-700'}`}>
                  {category.name}
                </span>
              </div>
              <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {category.count}
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default CategoryList;
