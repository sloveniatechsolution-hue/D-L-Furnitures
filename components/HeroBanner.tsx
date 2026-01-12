'use client';

export default function HeroBanner() {
  const handleExploreClick = () => {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="w-full h-screen relative flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url('/hero.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 drop-shadow-lg">
          Welcome to D&L Furnitech
        </h1>
        <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-gray-100 mb-6 sm:mb-8 drop-shadow-md">
          Discover Premium Solid Wood Furniture Crafted for Your Lifestyle
        </p>
        <button 
          onClick={handleExploreClick}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 sm:py-4 sm:px-10 rounded-lg text-base sm:text-lg transition duration-300 shadow-lg"
        >
          Explore Collection
        </button>
      </div>
    </section>
  );
}
