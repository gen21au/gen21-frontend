'use client';

import { useGetCustomPageQuery } from '@/store/apiSlice';
import Spinner from '@/components/Common/Spinner';

export default function TermsConditionsPage() {
  const { data: pageData, isLoading, error } = useGetCustomPageQuery('terms-and-conditions');

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (error || !pageData) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Terms and Conditions</h1>
          <p className="text-gray-600">Unable to load the terms and conditions. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center">{pageData.title.en}</h1>

      <div
        className="custom-content"
        dangerouslySetInnerHTML={{ __html: pageData.content.en }}
      />
    </main>
  );
}
