import React from 'react';

const CategoryList = () => {
  // TODO: Replace with API data
  const categories = [
    { id: 1, name: 'Design & Creative', count: 12 },
    { id: 2, name: 'Development', count: 8 },
    { id: 3, name: 'Marketing', count: 15 },
    { id: 4, name: 'Writing', count: 5 },
    { id: 5, name: 'Photography', count: 7 },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Categories</h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li 
            key={category.id}
            className="p-2 hover:bg-gray-100 rounded cursor-pointer"
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
