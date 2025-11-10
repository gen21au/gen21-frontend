'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ServiceGallery({ images }: { images: string[] }) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main image display */}
      <div className="relative h-96 rounded-lg overflow-hidden shadow-lg transition-all duration-300">
        <Image
          src={images[activeImage]}
          alt="Main service image"
          fill
          className="object-cover"
          priority
        />
        
        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button 
              onClick={() => setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 p-2 rounded-full shadow-md transition-all"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={() => setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 p-2 rounded-full shadow-md transition-all"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>
      
      {/* Thumbnail gallery */}
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={`relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 transition-all duration-200 ${activeImage === i ? 'ring-2 ring-blue-500 ring-offset-2' : 'opacity-70 hover:opacity-100'}`}
            >
              <Image
                src={img}
                alt={`Service image ${i + 1}`}
                fill
                className="object-cover"
                unoptimized
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
