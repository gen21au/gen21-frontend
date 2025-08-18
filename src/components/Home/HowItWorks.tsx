"use client";
import Image from "next/image";

import { useState } from 'react';

export default function HowItWorks() {
  const [showVideo, setShowVideo] = useState(false);
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-500 mb-12">
            Get your home services in 3 simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Video/Image Section */}
          <div className="relative aspect-video bg-gray-100 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <button 
                onClick={() => setShowVideo(true)}
                className="bg-white p-6 rounded-full shadow-lg hover:scale-110 transition-transform"
              >
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                </svg>
              </button>
            </div>
            <Image 
              src="/how-it-works.jpg" 
              width={800}
              height={450}
              alt="Process demonstration"
              className="w-full h-full object-cover"
            />
          </div>

          {showVideo && (
            <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
              <div className="w-full max-w-4xl bg-black rounded-lg overflow-hidden aspect-video">
                <button
                  onClick={() => setShowVideo(false)}
                  className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/3MaLPh2sfIo?autoplay=1"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          {/* Steps Section */}
          <div className="space-y-8">
            <div className="flex space-x-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-xl">
                  1
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Choose Your Service</h3>
                <p className="text-gray-600">
                  Browse through our catalog of professional services and select what you need
                </p>
              </div>
            </div>

            <div className="flex space-x-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-xl">
                  2
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Schedule & Confirm</h3>
                <p className="text-gray-600">
                  Pick a convenient time slot or choose immediate service availability
                </p>
              </div>
            </div>

            <div className="flex space-x-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-xl">
                  3
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Relax & Enjoy</h3>
                <p className="text-gray-600">
                  Our verified professional will arrive on time and deliver quality service
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
