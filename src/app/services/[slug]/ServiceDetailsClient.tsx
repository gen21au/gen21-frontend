'use client';

import { useGetServiceDetailsQuery } from '@/store/apiSlice';
import ServiceGallery from '@/components/Services/ServiceGallery';
import ServiceDetails from '@/components/Services/ServiceDetails';
import OrderForm from '@/components/Services/OrderForm';
import FaqSection from '@/components/Faq/FaqSection';
import Reviews from '@/components/Services/Reviews';
import Link from 'next/link';
import { ServiceType } from '@/types/services';
import Spinner from '@/components/Common/Spinner';

interface ServiceDetailsClientProps {
  serviceId: number;
  initialService: ServiceType;
}

export default function ServiceDetailsClient({ serviceId, initialService }: ServiceDetailsClientProps) {
  const { data: eService, isLoading, error } = useGetServiceDetailsQuery(serviceId);

  let service: ServiceType = initialService;

  if (eService && !isLoading && !error) {
    // Parse features from subtype_heading (HTML list)
    const features: string[] = [];
    if (eService.subtype_heading) {
      const liMatches = eService.subtype_heading.match(/<li>(.*?)<\/li>/g);
      if (liMatches) {
        liMatches.forEach(match => {
          const text = match.replace(/<\/?li>/g, '');
          features.push(text);
        });
      }
    }
    

    // Map API data to Service interface
    service = {
      title: eService.name.en,
      price: eService.discount_price > 0 ? eService.discount_price : eService.price,
      description: eService.description.en.replace(/<[^>]*>/g, ''), // Strip HTML tags
      images: eService.media.length > 0 ? eService.media.map(m => m.url) : ['/images/default-service.png'],
      category: (eService.categories && eService.categories.length > 0) ? eService.categories[0].name.en : 'Home Services',
      features: features.length > 0 ? features : ['Professional service', 'Quality assurance'],
      availability: eService.available ? 'Available' : 'Currently unavailable',
      duration: eService.duration,
      rate: eService.rate,
      total_reviews: eService.total_reviews,
      warranty: 'Service warranty included', // Default
      faqs: [] // API has faq as null, so empty array
    };
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    service = {
      title: 'Service Not Found',
      price: 0,
      description: 'Unable to load service details. Please try again later.',
      rate: 0,
      total_reviews: 0,
      images: ['/service-thumb.png'],
      category: 'Home Services',
      features: [],
      availability: 'Unavailable',
      duration: 'N/A',
      warranty: 'N/A',
      faqs: []
    };
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Breadcrumb navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-blue-600">Services</Link>
            <span className="mx-2">/</span>
            <Link href={`/services`} className="hover:text-blue-600">{service.category}</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{service.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Service details */}
          <div className="lg:col-span-2 space-y-8">
            <ServiceGallery images={service.images} />
            <ServiceDetails
              title={service.title}
              price={service.price}
              description={service.description}
              rating={service.rate}
              total_reviews={service.total_reviews}
              features={service.features}
              availability={service.availability}
              duration={service.duration}
              warranty={service.warranty}
            />

            {/* Reviews section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
              <Reviews reviews={eService?.e_service_reviews || []} />
            </div>

            {/* FAQ section */}
            <FaqSection
              faqs={service.faqs}
              title="Frequently Asked Questions"
            />
          </div>

          {/* Right column - Order form */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <OrderForm />

              {/* Trust badges */}
              <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Why Choose Us</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-gray-700">100% Satisfaction Guarantee</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">Fast Response Time</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    <span className="text-gray-700">Certified Professionals</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="text-gray-700">Secure Payment Options</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
