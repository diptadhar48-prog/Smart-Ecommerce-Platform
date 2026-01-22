import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Welcome to SmartShop',
      description: 'Discover amazing products at unbeatable prices',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200',
      cta: 'Shop Now'
    },
    {
      title: 'New Arrivals',
      description: 'Check out our latest collection',
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200',
      cta: 'Explore'
    },
    {
      title: 'Special Offers',
      description: 'Save big on your favorite items',
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200',
      cta: 'View Deals'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="carousel w-full h-[400px] md:h-[500px] lg:h-[600px] relative">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`carousel-item relative w-full ${
            currentSlide === index ? 'block' : 'hidden'
          }`}
        >
          <img
            src={slide.image}
            className="w-full h-full object-cover"
            alt={slide.title}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 fade-in">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl mb-8 fade-in">
                {slide.description}
              </p>
              <Link to="/products" className="btn btn-primary btn-lg fade-in">
                {slide.cta}
              </Link>
            </div>
          </div>
        </div>
      ))}
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;