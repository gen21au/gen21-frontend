'use client';

import React, { useState, useEffect, useRef } from 'react';

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
  // TODO: Replace with API data
  const categories: CategoryProps[] = [
    { id: 1, name: 'Design & Creative', count: 12, icon: '🎨' },
    { id: 2, name: 'Development', count: 8, icon: '💻' },
    { id: 3, name: 'Marketing', count: 15, icon: '📊' },
    { id: 4, name: 'Writing', count: 5, icon: '✍️' },
    { id: 5, name: 'Photography', count: 7, icon: '📷' },
    { id: 6, name: 'Home Maintenance', count: 18, icon: '🔧' },
    { id: 7, name: 'Cleaning', count: 9, icon: '🧹' },
    { id: 8, name: 'Electrical', count: 6, icon: '💡' },
  ];

  const [activeCategory, setActiveCategory] = useState<number>(activeCategoryId);
  const categoryRefs = useRef<Array<HTMLLIElement | null>>(Array(categories.length).fill(null));
  
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
        {categories.map((category, index) => (
          <li 
            key={category.id}
            ref={setRef(index)}
            data-category-id={category.id}
            className={`flex items-center justify-between px-5 py-3 cursor-pointer transition-all duration-200 ${activeCategory === category.id ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-50 border-l-4 border-transparent'}`}
            onClick={() => handleCategoryClick(category.id)}
          >
            <div className="flex items-center">
              <span className="text-xl mr-3">{category.icon}</span>
              <span className={`${activeCategory === category.id ? 'font-medium text-blue-600' : 'text-gray-700'}`}>
                {category.name}
              </span>
            </div>
            <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {category.count}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
