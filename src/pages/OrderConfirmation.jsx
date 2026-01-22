import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FaCheckCircle } from 'react-icons/fa';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const { getAuthToken } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const token = await getAuthToken();
      const response = await axios.get(`${API_URL}/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrder(response.data);
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-xl">Order not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <FaCheckCircle className="text-6xl text-success mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">Thank you for your purchase</p>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b">
              <div>
                <p className="text-sm text-gray-600">Order ID</p>
                <p className="font-semibold">{order._id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Order Date</p>
                <p className="font-semibold">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <div className="badge badge-primary">{order.status}</div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Payment Method</p>
                <div className="badge badge-outline">
                  {order.paymentMethod === 'cod' && '💵 Cash on Delivery'}
                  {order.paymentMethod === 'card' && '💳 Credit/Debit Card'}
                  {order.paymentMethod === 'paypal' && '💰 PayPal'}
                  {order.paymentMethod === 'bank' && '🏦 Bank Transfer'}
                  {!order.paymentMethod && '💵 Cash on Delivery'}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="font-semibold text-2xl text-primary">
                  ${order.totalAmount.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4">Shipping Address</h3>
              <div className="bg-base-200 p-4 rounded-lg">
                <p>{order.shippingAddress.street}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                  {order.shippingAddress.zipCode}
                </p>
                <p>{order.shippingAddress.country}</p>
                <p className="mt-2">Phone: {order.shippingAddress.phone}</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Order Items</h3>
              <div className="space-y-4">
                {order.products.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 bg-base-200 p-4 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <Link to="/dashboard/orders" className="btn btn-primary flex-1">
                View All Orders
              </Link>
              <Link to="/products" className="btn btn-outline flex-1">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;