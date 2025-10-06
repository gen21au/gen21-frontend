'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useGetBlogsQuery } from '@/store/apiSlice';
import BlogCard from '@/components/Blog/BlogCard';
import Pagination from '@/components/Common/Pagination';
import Spinner from '@/components/Common/Spinner';

const BlogsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: blogsData, isLoading, error } = useGetBlogsQuery({ page: currentPage });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
          <p className="text-lg max-w-2xl">
            Stay updated with the latest insights, tips, and news from our team.
            Discover valuable content to help you make informed decisions.
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-900 font-medium">Blog</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Spinner />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-500 text-lg mb-4">Failed to load blogs</div>
            <p className="text-gray-600">Please try again later.</p>
          </div>
        ) : blogsData && blogsData.data.length > 0 ? (
          <>
            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {blogsData.data.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={blogsData.current_page}
              totalPages={blogsData.last_page}
              onPageChange={handlePageChange}
            />

            {/* Results Info */}
            <div className="text-center mt-8 text-gray-600">
              Showing {blogsData.from}-{blogsData.to} of {blogsData.total} blogs
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">No blogs found</div>
            <p className="text-gray-600">Check back later for new content.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogsPage;
