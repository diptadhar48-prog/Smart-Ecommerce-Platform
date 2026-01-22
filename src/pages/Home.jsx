import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import HeroBanner from '../components/HeroBanner';
import ProductCard from '../components/ProductCard';
import ReviewSlider from '../components/ReviewSlider';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products?featured=true`);
      setFeaturedProducts(response.data.slice(0, 6));
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <HeroBanner />
      
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
        {loading ? (
          <div className="flex justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
        <div className="text-center mt-12">
          <Link to="/products" className="btn btn-primary btn-lg">
            View All Products
          </Link>
        </div>
      </section>

      <ReviewSlider />

      <section className="bg-base-200 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <div className="text-4xl mb-4">🚚</div>
                <h3 className="card-title">Fast Delivery</h3>
                <p>Get your products delivered quickly and safely</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="card-title">Secure Payment</h3>
                <p>Your transactions are safe and encrypted</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <div className="text-4xl mb-4">💯</div>
                <h3 className="card-title">Quality Guaranteed</h3>
                <p>100% authentic products with warranty</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;