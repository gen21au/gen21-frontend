'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const testimonials = [
  {
    name: "Rahim Khan",
    role: "Homeowner",
    text: "Excellent service! The plumber arrived on time and fixed the issue quickly.",
    rating: "★★★★★"
  },
  {
    name: "Sadia Ahmed",
    role: "Business Owner",
    text: "Reliable professionals and great customer support. Highly recommended!",
    rating: "★★★★☆"
  },
  {
    name: "Tahmid Hasan",
    role: "Tenant",
    text: "Affordable pricing and quality work. Will use again for sure.",
    rating: "★★★★★"
  }
];

export default function Testimonials() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Customers Say</h2>
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="p-6 bg-white rounded-xl shadow-md h-full">
                <div className="text-yellow-400 text-xl mb-4">{testimonial.rating}</div>
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <h4 className="font-semibold">{testimonial.name}</h4>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
