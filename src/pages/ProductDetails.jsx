import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { FaStar } from 'react-icons/fa';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, getAuthToken } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchProductDetails();
    fetchReviews();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${API_URL}/reviews/product/${id}`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handlePurchase = async () => {
    if (!user) {
      toast.info('Please login to purchase');
      navigate('/login');
      return;
    }

    if (quantity > product.stock) {
      toast.error('Insufficient stock');
      return;
    }

    navigate('/dashboard/checkout', {
      state: {
        products: [{
          productId: product._id,
          title: product.title,
          price: product.price,
          quantity,
          image: product.image
        }]
      }
    });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.info('Please login to submit a review');
      navigate('/login');
      return;
    }

    try {
      const token = await getAuthToken();
      await axios.post(
        `${API_URL}/reviews`,
        {
          productId: id,
          ...reviewForm
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      toast.success('Review submitted successfully');
      setReviewForm({ rating: 5, comment: '' });
      fetchReviews();
      fetchProductDetails();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit review');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-xl">Product not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-96 object-cover rounded-lg shadow-xl"
          />
        </div>
        
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < Math.round(product.ratings?.average || 0) ? '' : 'opacity-30'} />
              ))}
            </div>
            <span className="text-sm">({product.ratings?.count || 0} reviews)</span>
          </div>
          
          <p className="text-3xl font-bold text-primary mb-6">${product.price}</p>
          
          <p className="text-gray-700 mb-6">{product.description}</p>
          
          <div className="mb-6">
            <p className="text-sm mb-2">
              <span className="font-semibold">Category:</span> {product.category}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Stock:</span> {product.stock} available
            </p>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Quantity</span>
              </label>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="input input-bordered w-24"
              />
            </div>
          </div>
          
          <button
            className="btn btn-primary btn-lg w-full"
            onClick={handlePurchase}
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? 'Out of Stock' : 'Purchase Now'}
          </button>
        </div>
      </div>

      <div className="divider"></div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        
        {user && (
          <form onSubmit={handleReviewSubmit} className="card bg-base-200 p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Rating</span>
              </label>
              <div className="rating rating-lg">
                {[1, 2, 3, 4, 5].map((star) => (
                  <input
                    key={star}
                    type="radio"
                    name="rating"
                    className="mask mask-star-2 bg-orange-400"
                    checked={reviewForm.rating === star}
                    onChange={() => setReviewForm({ ...reviewForm, rating: star })}
                  />
                ))}
              </div>
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Comment</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24"
                placeholder="Share your experience..."
                value={reviewForm.comment}
                onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Submit Review</button>
          </form>
        )}

        <div className="space-y-4">
          {reviews.length === 0 ? (
            <p className="text-center text-gray-500">No reviews yet</p>
          ) : (
            reviews.map((review) => (
              <div key={review._id} className="card bg-base-100 shadow-md">
                <div className="card-body">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="avatar">
                      <div className="w-10 rounded-full">
                        <img src={review.userPhoto || 'https://via.placeholder.com/150'} alt={review.userName} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold">{review.userName}</p>
                      <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={i < review.rating ? '' : 'opacity-30'} size={14} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;