import React from 'react';

const ServiceList = () => {
  // TODO: Replace with API data
  const services = [
    { 
      id: 1,
      category: 'Development',
      title: 'Website Development',
      rating: 4.9,
      reviews: 128,
      price: 499,
      image: '/service-thumb.png'
    },
    {
      id: 2,
      category: 'Design',
      title: 'Logo Design',
      rating: 4.8,
      reviews: 89,
      price: 199,
      image: '/service-thumb.png'
    },
    {
      id: 3,
      category: 'Marketing',
      title: 'Social Media Strategy',
      rating: 4.7,
      reviews: 45,
      price: 299,
      image: '/service-thumb.png'
    },
    {
      id: 4,
      category: 'Writing',
      title: 'Resume Writing',
      rating: 4.9,
      reviews: 67,
      price: 149,
      image: '/service-thumb.png'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {services.map((service) => (
        <div key={service.id} className="bg-white p-4 rounded-lg shadow">
          <img 
            src={service.image} 
            alt={service.title}
            className="w-full h-40 object-cover rounded mb-4"
          />
          <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{service.category}</span>
            <div className="flex items-center">
              ⭐ {service.rating}
            </div>
          </div>
          <div className="mt-4 font-bold text-xl">${service.price}</div>
        </div>
      ))}
    </div>
  );
};

export default ServiceList;
