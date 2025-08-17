export default function FeaturesSection() {
  const features = [
    {
      title: "Verified Professionals",
      description: "All service providers undergo strict background checks and verification",
      icon: "✅"
    },
    {
      title: "Instant Booking",
      description: "Book services instantly with our easy-to-use platform",
      icon: "⏱️"
    },
    {
      title: "Quality Assurance",
      description: "100% satisfaction guaranteed with our quality services",
      icon: "⭐"
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock customer support available",
      icon: "📞"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Gen21</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
