'use client';

// import Image from 'next/image';
import Link from 'next/link';
import { useGetFeatureServicesQuery } from '@/store/apiSlice';
import { FeatureServiceType } from '@/types/services';
import { generateSlug } from '@/helper/common.helper';

// Skeleton loader component for service cards
const ServiceCardSkeleton = () => (
  <div className="flex-shrink-0 w-64 bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
    <div className="relative h-40 bg-gray-200"></div>
    <div className="p-4">
      <div className="h-5 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    </div>
  </div>
);

export default function TrendingServices() {
  const { data: services = [], isLoading, error } = useGetFeatureServicesQuery();

  // Filter for featured services if needed, or just use all services as trending
  // For now, let's assume all feature services are trending services
  const trendingServices: FeatureServiceType[] = services;
  // console.log(trendingServices);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Trending Services
          </h2>
          <Link href="/services" className="text-blue-600 font-semibold hover:underline">
            View All
          </Link>
        </div>

        <div className="flex space-x-6 overflow-x-auto pb-4 -mx-4 px-4">
          {isLoading && (
            <>
              <ServiceCardSkeleton />
              <ServiceCardSkeleton />
              <ServiceCardSkeleton />
              <ServiceCardSkeleton />
            </>
          )}
          {error && <div className="text-red-500 p-4">Error loading trending services</div>}
          {!isLoading && !error && trendingServices.map((service) => (
            <Link
              key={service.id}
              href={`/services/${generateSlug(service.name.en, service.id)}`}
              className="flex-shrink-0 w-64 bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-40">
                <img
                  src={service.media?.[0]?.url || '/images/default-service.png'}
                  alt={service.name.en}
                  width={300}
                  height={200}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{service.name.en}</h3>
                <p className="text-gray-600">Start at ৳{service?.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
