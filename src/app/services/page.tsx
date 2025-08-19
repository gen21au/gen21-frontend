import React from 'react';
import CategoryList from '@/components/Services/CategoryList';
import ServiceList from '@/components/Services/ServiceList';

const AllServicesPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">All Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <CategoryList />
        </div>
        <div className="md:col-span-3">
          <ServiceList />
        </div>
      </div>
    </div>
  );
};

export default AllServicesPage;
