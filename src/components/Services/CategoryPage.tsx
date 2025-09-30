'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useGetCategoryByIdQuery, useGetAllCategoryServicesQuery } from '@/store/apiSlice';
import { CategoryService } from '@/services/categoryService';
import { generateSlug } from '@/helper/common.helper';
import Spinner from '@/components/Common/Spinner';

interface CategoryPageProps {
  categoryId: number;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ categoryId }) => {
  const { data: category, isLoading: categoryLoading, error: categoryError } = useGetCategoryByIdQuery(categoryId);
  const { data: allCategoryServices, isLoading: servicesLoading, error: servicesError } = useGetAllCategoryServicesQuery();

  const isLoading = categoryLoading || servicesLoading;
  const error = categoryError || servicesError;

  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen pb-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Spinner />
        </div>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="bg-gray-50 min-h-screen pb-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
            <p className="text-gray-600">The category you're looking for doesn't exist or has been removed.</p>
          </div>
        </div>
      </div>
    );
  }

  const categoryServices = CategoryService.getServicesByCategoryId(allCategoryServices || [], categoryId);

  // Convert HTML to plain text
  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            {category.has_media && category.media.length > 0 && (
              <Image
                src={category.media[0].url}
                alt={category.name.en}
                width={64}
                height={64}
                className="w-16 h-16 rounded-lg mr-4 object-cover"
              />
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{category.name.en}</h1>
              <p className="text-gray-600 mt-1">{categoryServices.length} services available</p>
            </div>
          </div>

          {/* Category Description */}
          {category.description && (
            <div className="mb-6">
              <p className="text-gray-700 text-lg leading-relaxed">
                {stripHtml(category.description.en)}
              </p>
            </div>
          )}

          {/* Category FAQ */}
          {category.faq && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="prose max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: category.faq }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Services Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Services</h2>

          {categoryServices.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No services available in this category at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryServices.map((service) => (
                <Link
                  href={`/services/${generateSlug(service.title, service.id)}`}
                  key={service.id}
                  className="group"
                >
                  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col">
                    <div className="relative">
                      <div className="h-48 overflow-hidden">
                        <Image
                          src={service.image || '/images/default-service.png'}
                          alt={service.title}
                          width={400}
                          height={300}
                          unoptimized
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                        <div className="font-bold text-lg text-blue-600">৳{service.price}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
