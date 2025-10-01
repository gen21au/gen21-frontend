import ServiceDetailsClient from './ServiceDetailsClient';
import { BASE_API_URL } from '@/utils/api_endpoints';
import { EServiceType, ServiceType } from '@/types/services';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ServicePage({ params, searchParams }: ServicePageProps) {
  const { slug } = await params;  // ✅ required because params is Promise

  // Extract ID from slug (e.g., "ac-servicing-32" -> 32)
  const idMatch = slug.match(/-(\d+)$/);
  const serviceId = idMatch ? parseInt(idMatch[1], 10) : null;

  let service: ServiceType;

  if (serviceId) {
    try {
      const response = await fetch(`${BASE_API_URL}/e_services/${serviceId}?version=2`, {
        next: { revalidate: 3600 } // Cache for 1 hour
      });

      if (response.ok) {
        const data: { success: boolean; data: EServiceType; message: string } = await response.json();
        const eService = data.data;

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
          id: eService.id,
          title: eService.name.en,
          price: eService.discount_price > 0 ? eService.discount_price : eService.price,
          description: eService.description.en.replace(/<[^>]*>/g, ''), // Strip HTML tags
          images: eService.media.length > 0 ? eService.media.map(m => m.url) : ['/service-thumb.png'],
          category: (eService.categories && eService.categories.length > 0) ? eService.categories[0].name.en : 'Home Services',
          category_id: (eService.categories && eService.categories.length > 0) ? eService.categories[0].id : 0,
          features: features.length > 0 ? features : ['Professional service', 'Quality assurance'],
          availability: eService.available ? 'Available' : 'Currently unavailable',
          duration: eService.duration,
          rate: eService.rate,
          total_reviews: eService.total_reviews,
          warranty: 'Service warranty included', // Default
          faqs: [] // API has faq as null, so empty array
        };
      } else {
        throw new Error('Failed to fetch service data');
      }
    } catch (error) {
      console.error('Error fetching service data:', error);
      // Fallback to hardcoded data
      service = {
        id: 0,
        title: 'Service Not Found',
        price: 0,
        description: 'Unable to load service details. Please try again later.',
        rate: 0,
        total_reviews: 0,
        images: ['/images/default-service.png'],
        category: 'Home Services',
        category_id: 0,
        features: [],
        availability: 'Unavailable',
        duration: 'N/A',
        warranty: 'N/A',
        faqs: []
      };
    }
  } else {
    // Invalid slug
    service = {
      id: 0,
      title: 'Invalid Service',
      price: 0,
      description: 'The service slug is invalid.',
      rate: 0,
      total_reviews: 0,
      images: ['/images/default-service.png'],
      category: 'Home Services',
      category_id: 0,
      features: [],
      availability: 'Unavailable',
      duration: 'N/A',
      warranty: 'N/A',
      faqs: []
    };
  }

  if (!serviceId) {
    return (
      <div className="bg-gray-50 min-h-screen pb-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Service</h1>
            <p className="text-gray-600">The service slug is invalid.</p>
          </div>
        </div>
      </div>
    );
  }

  return <ServiceDetailsClient serviceId={serviceId} initialService={service} />;
}
