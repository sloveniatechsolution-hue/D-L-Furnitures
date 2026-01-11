export default function WhyChooseUs() {
  const reasons = [
    {
      icon: '✓',
      title: 'Premium Quality',
      description: 'Solid wood furniture built to last for generations',
    },
    {
      icon: '🚚',
      title: 'Free Delivery',
      description: 'Complimentary delivery on orders above ₹50,000',
    },
    {
      icon: '💰',
      title: 'Best Prices',
      description: 'Unbeatable prices without compromising quality',
    },
    {
      icon: '🛡️',
      title: '2-Year Warranty',
      description: 'Complete warranty coverage on all furniture',
    },
    {
      icon: '🎨',
      title: 'Custom Design',
      description: 'Customize furniture to match your style',
    },
    {
      icon: '⭐',
      title: 'Expert Support',
      description: '24/7 customer support for all your needs',
    },
  ];

  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose D&L Furnitures?
          </h2>
          <p className="text-lg text-gray-600">
            We provide more than just furniture
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="text-4xl font-bold text-yellow-600 flex-shrink-0">
                {reason.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {reason.title}
                </h3>
                <p className="text-gray-600">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
