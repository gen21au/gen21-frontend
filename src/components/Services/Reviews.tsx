'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Review {
  id: string;
  user: string;
  avatar?: string;
  rating: number;
  comment: string;
  date: string;
  helpful?: number;
}

export default function Reviews({ serviceId }: { serviceId: string }) {
  // Sample reviews data
  const sampleReviews: Review[] = [
    {
      id: '1',
      user: 'Sarah Johnson',
      avatar: '/avatar.png',
      rating: 5,
      comment: 'Excellent service! The technician was very professional and fixed my AC in no time. Highly recommend!',
      date: '2023-08-15',
      helpful: 12
    },
    {
      id: '2',
      user: 'Michael Chen',
      avatar: '/avatar.png',
      rating: 4,
      comment: 'Good service overall. The technician was knowledgeable and fixed the issue, but arrived a bit late.',
      date: '2023-07-28',
      helpful: 8
    },
    {
      id: '3',
      user: 'Emily Rodriguez',
      avatar: '/avatar.png',
      rating: 5,
      comment: 'Very satisfied with the service. The technician explained everything clearly and did a thorough job.',
      date: '2023-07-10',
      helpful: 15
    },
    {
      id: '4',
      user: 'David Wilson',
      avatar: '/avatar.png',
      rating: 4,
      comment: 'Good service and fair pricing. Would use again for future repairs.',
      date: '2023-06-22',
      helpful: 6
    }
  ];

  const [reviews, setReviews] = useState<Review[]>(sampleReviews);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reviewToAdd = {
      id: Math.random().toString(),
      user: 'You',
      avatar: '/avatar.png',
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
      ...newReview
    };
    setReviews([reviewToAdd, ...reviews]);
    setNewReview({ rating: 5, comment: '' });
    setShowForm(false);
  };

  // Calculate average rating
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;

  // Count ratings by star level
  const ratingCounts = reviews.reduce((counts, review) => {
    counts[review.rating] = (counts[review.rating] || 0) + 1;
    return counts;
  }, {} as Record<number, number>);

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg 
            key={star} 
            className={`w-5 h-5 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900">Customer Reviews</h3>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          {showForm ? 'Cancel' : 'Write a Review'}
        </button>
      </div>
      
      {/* Review summary */}
      <div className="flex flex-col md:flex-row gap-6 mb-8 pb-6 border-b">
        <div className="md:w-1/3">
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-900 mb-2">{averageRating.toFixed(1)}</div>
            <div className="flex justify-center mb-1">
              {renderStars(Math.round(averageRating))}
            </div>
            <p className="text-sm text-gray-500">{totalReviews} reviews</p>
          </div>
        </div>
        
        <div className="md:w-2/3">
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map(rating => {
              const count = ratingCounts[rating] || 0;
              const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
              
              return (
                <div key={rating} className="flex items-center">
                  <div className="w-12 text-sm text-gray-600">{rating} stars</div>
                  <div className="flex-1 mx-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-yellow-400 rounded-full" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="w-9 text-xs text-gray-500">{count}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Review form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-4">Share Your Experience</h4>
          
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Your Rating</label>
            <div className="flex space-x-1">
              {[5, 4, 3, 2, 1].map(num => (
                <button 
                  key={num} 
                  type="button"
                  onClick={() => setNewReview({...newReview, rating: num})}
                  className={`p-1 ${newReview.rating >= num ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Your Review</label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              placeholder="Share your experience with this service..."
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Submit Review
            </button>
          </div>
        </form>
      )}

      {/* Reviews list */}
      <div className="space-y-6">
        {reviews.map(review => (
          <div key={review.id} className="border-b pb-6 mb-6 last:border-0">
            <div className="flex items-start gap-4">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                {review.avatar && (
                  <Image
                    src={review.avatar}
                    alt={review.user}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-900">{review.user}</h4>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                </div>
                
                <div className="flex mb-3">
                  {renderStars(review.rating)}
                </div>
                
                <p className="text-gray-700 mb-3">{review.comment}</p>
                
                <div className="flex items-center text-sm">
                  <button className="text-gray-500 hover:text-gray-700 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    <span>Helpful ({review.helpful})</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination */}
      {reviews.length > 5 && (
        <div className="flex justify-center mt-8">
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-1 rounded border text-sm">&laquo; Previous</button>
            <button className="px-3 py-1 rounded bg-blue-600 text-white text-sm">1</button>
            <button className="px-3 py-1 rounded border text-sm">2</button>
            <button className="px-3 py-1 rounded border text-sm">Next &raquo;</button>
          </nav>
        </div>
      )}
    </div>
  );
}
