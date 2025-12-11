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
            <p className="text-gray-600">The category you&apos;re looking for doesn&apos;t exist or has been removed.</p>
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
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Category Image */}
            {category.has_media && category.media.length > 0 && (
              <div className="flex-shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <Image
                    src={category.media[0].url}
                    alt={category.name.en}
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* Category Info */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{category.name.en}</h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-2">
                {categoryServices.length} Professional Services Available
              </p>
              {category.description && (
                <p className="text-lg text-blue-50 max-w-2xl">
                  {stripHtml(category.description.en).slice(0, 150)}
                  {stripHtml(category.description.en).length > 150 ? '...' : ''}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span className="mx-2 text-gray-400">›</span>
            <Link href="/services" className="hover:text-blue-600 transition-colors">Services</Link>
            <span className="mx-2 text-gray-400">›</span>
            <span className="text-gray-900 font-medium">{category.name.en}</span>
          </div>
        </div>
      </div>

      {/* Mobile Layout: Category Overview and Available Services */}
      <div className="block lg:hidden container mx-auto px-4 py-8">
        {/* Category Overview - Mobile */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <h3 className="font-bold text-lg mb-4 text-gray-900">Category Overview</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Services</span>
              <span className="font-semibold text-blue-600">{categoryServices.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Category</span>
              <span className="font-semibold text-gray-900">{category.name.en}</span>
            </div>
            {category.featured && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Featured</span>
              </div>
            )}
          </div>
        </div>

        {/* Available Services - Mobile */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Available Services</h2>
            <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              {categoryServices.length} services
            </div>
          </div>

          {categoryServices.length === 0 ? (
            <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-5.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Services Available</h3>
              <p className="text-gray-600">We're currently updating our services. Please check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categoryServices.map((service) => (
                <Link
                  href={`/services/${generateSlug(service.title, service.id)}`}
                  key={service.id}
                  className="group"
                >
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-blue-200 h-full flex flex-col">
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
                      {/* Price Badge */}
                      <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
                        <span className="font-bold text-blue-600">৳{service.price}</span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="font-semibold text-lg mb-3 text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {service.title}
                      </h3>

                      <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
                        {stripHtml(service.description || '').slice(0, 120)}{stripHtml(service.description || '').length > 120 ? '...' : ''}
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                        <div className="flex items-center">
                          <div className="flex text-yellow-400 mr-1">
                            <span>★</span>
                          </div>
                          <span className="text-sm font-medium text-gray-900 mr-1">{service.total_rate}</span>
                          <span className="text-sm text-gray-500">({service.total_reviews})</span>
                        </div>
                        <div className="text-blue-600 font-medium text-sm group-hover:text-blue-700 transition-colors">
                          View Details →
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Category Stats */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hidden lg:block">
                <h3 className="font-bold text-lg mb-4 text-gray-900">Category Overview</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Services</span>
                    <span className="font-semibold text-blue-600">{categoryServices.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Category</span>
                    <span className="font-semibold text-gray-900">{category.name.en}</span>
                  </div>
                  {category.featured && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Status</span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Featured</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Help Box */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900">Need Help?</h3>
                </div>
                <p className="text-gray-600 mb-4">Our experts are ready to help you choose the perfect service.</p>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors font-medium">
                  Get Free Consultation
                </button>
              </div>

              {/* Category FAQ Preview */}
              {category.faq && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="font-bold text-lg mb-4 text-gray-900">Quick FAQ</h3>
                  <div className="space-y-3">
                    <details className="group">
                      <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                        What services are included?
                      </summary>
                      <p className="mt-2 text-sm text-gray-600 pl-4 border-l-2 border-blue-200">
                        All professional services listed in this category with quality guarantee.
                      </p>
                    </details>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {/* Category Description */}
            {category.description && (
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About {category.name.en}</h2>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                  <p>{stripHtml(category.description.en)}</p>
                </div>
              </div>
            )}

            {/* Services Section */}
            <div className="mb-8 hidden lg:block">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900">Available Services</h2>
                <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  {categoryServices.length} services
                </div>
              </div>

              {categoryServices.length === 0 ? (
                <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-5.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Services Available</h3>
                  <p className="text-gray-600">We&apos;re currently updating our services. Please check back soon!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {categoryServices.map((service) => (
                    <Link
                      href={`/services/${generateSlug(service.title, service.id)}`}
                      key={service.id}
                      className="group"
                    >
                      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-blue-200 h-full flex flex-col">
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
                          {/* Price Badge */}
                          <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
                            <span className="font-bold text-blue-600">৳{service.price}</span>
                          </div>
                        </div>

                        <div className="p-6 flex flex-col flex-grow">
                          <h3 className="font-semibold text-lg mb-3 text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {service.title}
                          </h3>

                          <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
                            {stripHtml(service.description || '').slice(0, 120)}{stripHtml(service.description || '').length > 120 ? '...' : ''}
                          </p>

                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                            <div className="flex items-center">
                              <div className="flex text-yellow-400 mr-1">
                                <span>★</span>
                              </div>
                              <span className="text-sm font-medium text-gray-900 mr-1">{service.total_rate}</span>
                              <span className="text-sm text-gray-500">({service.total_reviews})</span>
                            </div>
                            <div className="text-blue-600 font-medium text-sm group-hover:text-blue-700 transition-colors">
                              View Details →
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Full FAQ Section */}
            {category.faq && (
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                <div className="prose prose-lg max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: category.faq }} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
