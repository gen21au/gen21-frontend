interface ServiceDetailsProps {
  title: string;
  price: number;
  description: string;
  features?: string[];
  availability?: string;
  duration?: string;
  warranty?: string;
}

export default function ServiceDetails({ 
  title, 
  price, 
  description,
  features = ['Professional service', 'Experienced technicians', 'Quality materials'],
  availability = 'Available 7 days a week',
  duration = '1-2 hours',
  warranty = '30 days service warranty'
}: ServiceDetailsProps) {
  return (
    <div className="mt-8 space-y-6 bg-white p-6 rounded-lg shadow-sm">
      {/* Header section */}
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <div className="flex items-center mt-2">
          <div className="flex items-center text-yellow-400">
            <span>★★★★★</span>
            <span className="text-gray-600 ml-2 text-sm">(4.8/5 based on 24 reviews)</span>
          </div>
        </div>
      </div>
      
      {/* Price section */}
      <div className="flex items-center justify-between">
        <p className="text-3xl font-bold text-blue-600">৳{price.toLocaleString()}</p>
        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {availability}
        </span>
      </div>
      
      {/* Description section */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Service Description</h2>
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>
      
      {/* Features section */}
      <div>
        <h2 className="text-xl font-semibold mb-3">What's Included</h2>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Service details */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-gray-500">Duration</p>
          <p className="font-medium">{duration}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-gray-500">Warranty</p>
          <p className="font-medium">{warranty}</p>
        </div>
      </div>
    </div>
  );
}
