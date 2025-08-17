'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: 'Quality Home Services On Demand',
      subtitle: 'Book trusted professionals for your home needs',
      image: '/hero-1.jpg'
    },
    {
      title: 'Experienced Professionals',
      subtitle: 'Verified and background-checked experts',
      image: '/hero-2.jpg'
    }
  ];

  return (
    <div className="relative h-[500px]">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={slides[currentSlide].image}
          alt={slides[currentSlide].title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative h-full flex flex-col justify-center text-center text-white px-4">
        <h1 className="text-4xl font-bold mb-4">{slides[currentSlide].title}</h1>
        <p className="text-xl mb-8">{slides[currentSlide].subtitle}</p>
        <button className="mx-auto bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Book Now
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-white/50'}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
