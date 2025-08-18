'use client';

import Image from 'next/image';
import Link from 'next/link';

const trendingServices = [
  {
    id: 1,
    name: 'Deep Cleaning Service',
    image: '/service-thumb.png',
    price: 'Starts at $99',
  },
  {
    id: 2,
    name: 'AC Master Service',
    image: '/service-thumb.png',
    price: 'Starts at $49',
  },
  {
    id: 3,
    name: 'Interior Painting',
    image: '/service-thumb.png',
    price: 'Starts at $199',
  },
  {
    id: 4,
    name: 'Plumbing Repair',
    image: '/service-thumb.png',
    price: 'Starts at $79',
  },
  {
    id: 5,
    name: 'Electrical Wiring',
    image: '/service-thumb.png',
    price: 'Starts at $89',
  },
];

export default function TrendingServices() {
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
          {trendingServices.map((service) => (
            <div key={service.id} className="flex-shrink-0 w-64 bg-white rounded-lg shadow-md overflow-hidden group">
              <div className="relative h-40">
                <Image
                  src={service.image}
                  alt={service.name}
                  width={300}
                  height={200}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{service.name}</h3>
                <p className="text-gray-600">{service.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
