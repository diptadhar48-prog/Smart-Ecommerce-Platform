import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, getAuthToken } = useAuth();
  
  const products = location.state?.products || [];
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const totalAmount = products.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = await getAuthToken();
      const orderData = {
        products,
        shippingAddress: formData,
        totalAmount,
        paymentMethod
      };

      const response = await axios.post(`${API_URL}/orders`, orderData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success('Order placed successfully!');
      navigate(`/order-confirmation/${response.data.order._id}`);
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl mb-4">No items to checkout</p>
        <button onClick={() => navigate('/products')} className="btn btn-primary">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">Checkout</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Shipping Information</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Street Address</span>
              </label>
              <input
                type="text"
                name="street"
                className="input input-bordered"
                value={formData.street}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">City</span>
                </label>
                <input
                  type="text"
                  name="city"
                  className="input input-bordered"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">State</span>
                </label>
                <input
                  type="text"
                  name="state"
                  className="input input-bordered"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">ZIP Code</span>
                </label>
                <input
                  type="text"
                  name="zipCode"
                  className="input input-bordered"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Country</span>
                </label>
                <input
                  type="text"
                  name="country"
                  className="input input-bordered"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                type="tel"
                name="phone"
                className="input input-bordered"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="divider">Payment Method</div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Select Payment Method</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="cod">💵 Cash on Delivery</option>
                <option value="card">💳 Credit/Debit Card</option>
                <option value="paypal">💰 PayPal</option>
                <option value="bank">🏦 Bank Transfer</option>
              </select>
            </div>

            {paymentMethod === 'card' && (
              <div className="alert alert-info">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Card payment will be processed after order confirmation (Demo mode)</span>
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="alert alert-success">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Pay with cash when your order is delivered</span>
              </div>
            )}

            {paymentMethod === 'paypal' && (
              <div className="alert alert-info">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>You will be redirected to PayPal for payment (Demo mode)</span>
              </div>
            )}

            {paymentMethod === 'bank' && (
              <div className="alert alert-warning">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>Bank transfer instructions will be sent via email</span>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </form>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>
          <div className="card bg-base-200">
            <div className="card-body">
              <div className="space-y-4 mb-4">
                {products.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-gray-600">
                        ${item.price} × {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="divider"></div>

              <div className="flex justify-between items-center">
                <span className="text-lg">Subtotal:</span>
                <span className="text-lg">${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg">Shipping:</span>
                <span className="text-lg">Free</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg">Tax:</span>
                <span className="text-lg">${(totalAmount * 0.1).toFixed(2)}</span>
              </div>

              <div className="divider"></div>

              <div className="flex justify-between items-center font-bold text-2xl">
                <span>Total:</span>
                <span className="text-primary">
                  ${(totalAmount * 1.1).toFixed(2)}
                </span>
              </div>

              <div className="mt-4 p-3 bg-base-300 rounded-lg">
                <p className="text-sm font-semibold mb-1">Payment Method:</p>
                <p className="text-sm">
                  {paymentMethod === 'cod' && '💵 Cash on Delivery'}
                  {paymentMethod === 'card' && '💳 Credit/Debit Card'}
                  {paymentMethod === 'paypal' && '💰 PayPal'}
                  {paymentMethod === 'bank' && '🏦 Bank Transfer'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;