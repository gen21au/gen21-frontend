'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useGetBlogBySlugQuery } from '@/store/apiSlice';
import Spinner from '@/components/Common/Spinner';

const BlogDetailsPage = () => {
  const params = useParams();
  const slug = params.slug as string;

  const { data: blog, isLoading, error } = useGetBlogBySlugQuery(slug);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get blog image
  const getBlogImage = () => {
    if (blog?.has_media && blog.media && blog.media.length > 0) {
      return blog.media[0].url;
    }
    return '/images/default-service.png';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Blog Not Found</h1>
            <p className="text-lg">The blog post you&apos;re looking for doesn&apos;t exist.</p>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600">Home</Link>
              <span className="mx-2">›</span>
              <Link href="/blogs" className="hover:text-blue-600">Blog</Link>
              <span className="mx-2">›</span>
              <span className="text-gray-900 font-medium">Not Found</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Oops! Blog Not Found</h2>
            <p className="text-gray-600 mb-8">
              The blog post you&apos;re looking for might have been moved or doesn&apos;t exist.
            </p>
            <Link
              href="/blogs"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Blogs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Blog Details</h1>
          <p className="text-lg max-w-2xl">
            Read our latest insights and stay informed with valuable content.
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">›</span>
            <Link href="/blogs" className="hover:text-blue-600">Blog</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-900 font-medium truncate">{blog.title}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <article className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Blog Header */}
        <header className="mb-8">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <time dateTime={blog.created_at}>
              {formatDate(blog.created_at)}
            </time>
            {blog.tags && (
              <>
                <span className="mx-2">•</span>
                <span className="text-blue-600 font-medium">{blog.tags}</span>
              </>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Featured Image */}
          <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8">
            <Image
              src={getBlogImage()}
              alt={blog.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </header>

        {/* Blog Content */}
        <div
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-a:text-blue-600 prose-a:hover:text-blue-800"
          dangerouslySetInnerHTML={{ __html: blog.body }}
        />

        {/* Back to Blogs */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/blogs"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Blogs
          </Link>
        </div>
      </article>
    </div>
  );
};

export default BlogDetailsPage;
