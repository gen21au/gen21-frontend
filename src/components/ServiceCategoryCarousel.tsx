'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const categories = [
  { id: 1, name: 'Plumbing', icon: '🔧', count: 150 },
  { id: 2, name: 'Electrical', icon: '💡', count: 200 },
  { id: 3, name: 'Cleaning', icon: '🧹', count: 300 },
  { id: 4, name: 'AC Repair', icon: '❄️', count: 120 },
  { id: 5, name: 'Painting', icon: '🎨', count: 180 },
];

export default function ServiceCategoryCarousel() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Popular Services
        </h2>
        
        <Swiper
          spaceBetween={30}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 }
          }}
        >
          {categories.map((category) => (
            <SwiperSlide key={category.id}>
              <div className="p-4 text-center bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                <p className="text-gray-600">{category.count}+ Experts</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
