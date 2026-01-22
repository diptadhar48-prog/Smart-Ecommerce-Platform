import { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';

const ReviewSlider = () => {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${API_URL}/reviews`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    if (reviews.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [reviews]);

  if (reviews.length === 0) return null;

  const currentReview = reviews[currentIndex];

  return (
    <div className="bg-base-200 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Customer Reviews</h2>
        <div className="max-w-3xl mx-auto">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="avatar">
                <div className="w-16 rounded-full">
                  <img src={currentReview.userPhoto || 'https://via.placeholder.com/150'} alt={currentReview.userName} />
                </div>
              </div>
              <h3 className="card-title">{currentReview.userName}</h3>
              <div className="flex gap-1 text-yellow-500 my-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < currentReview.rating ? '' : 'opacity-30'} />
                ))}
              </div>
              <p className="text-lg italic">"{currentReview.comment}"</p>
              {currentReview.productId?.title && (
                <p className="text-sm text-gray-500 mt-2">
                  Product: {currentReview.productId.title}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {reviews.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${
                  currentIndex === index ? 'bg-primary' : 'bg-base-300'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSlider;