'use client';

import Image from 'next/image';
import SearchInput from './SearchInput';

export default function HeroSlider() {
  return (
    <div id="hero-section" className="relative h-[500px]">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/home-service.jpg"
          alt="Home Services"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative h-full flex flex-col justify-center text-center text-white px-4">
        <h1 className="text-4xl font-bold mb-4">Quality Home Services On Demand</h1>
        <div className="mx-auto w-full max-w-2xl">
          <SearchInput />
        </div>
      </div>
    </div>
  );
}
