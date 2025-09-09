import ServiceGallery from '@/components/Services/ServiceGallery';
import ServiceDetails from '@/components/Services/ServiceDetails';
import OrderForm from '@/components/Services/OrderForm';
import FaqSection from '@/components/Faq/FaqSection';
import Reviews from '@/components/Services/Reviews';
import Link from 'next/link';

interface PageProps {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

interface Service {
  title: string;
  price: number;
  description: string;
  images: string[];
  faqs: { question: string; answer: string }[];
  features?: string[];
  availability?: string;
  duration?: string;
  warranty?: string;
  category?: string;
}

export default async function ServicePage({ params }: PageProps) {
  // TODO: Fetch service data based on slug
  const service: Service = {
    title: 'AC Repair Service',
    price: 2999,
    description: 'Professional AC repair and maintenance service with guaranteed results. Our certified technicians will diagnose and fix your AC issues quickly and efficiently. We use high-quality parts and provide comprehensive service to ensure your air conditioning system runs smoothly.',
    images: ['/service-thumb.png', '/home-service.jpg', '/service-thumb.png', '/home-service.jpg'],
    category: 'Home Maintenance',
    features: [
      'Complete AC system diagnosis',
      'Repair of all major AC brands',
      'Refrigerant leak detection and repair',
      'Filter cleaning and replacement',
      'Performance optimization'
    ],
    availability: 'Available 7 days a week',
    duration: '1-2 hours',
    warranty: '6 months service warranty',
    faqs: [
      { question: 'What is your response time?', answer: 'Our technicians typically arrive within 2 hours of booking for emergency services, and within the selected time slot for scheduled appointments.' },
      { question: 'Do you provide warranty for repairs?', answer: 'Yes, we offer a 6-month warranty on all our repair services. If you experience any issues with our work during this period, we will fix it at no additional cost.' },
      { question: 'What payment methods do you accept?', answer: 'We accept all major credit cards, digital wallets, and cash payments upon service completion.' },
      { question: 'Are your technicians certified?', answer: 'Yes, all our technicians are fully certified and have undergone extensive training and background checks.' }
    ]
  };

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
            <Link href={`/services/${service.category?.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-blue-600">{service.category}</Link>
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
              features={service.features}
              availability={service.availability}
              duration={service.duration}
              warranty={service.warranty}
            />
            
            {/* Reviews section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
              <Reviews serviceId={service.title.toLowerCase().replace(/\s+/g, '-')} />
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
