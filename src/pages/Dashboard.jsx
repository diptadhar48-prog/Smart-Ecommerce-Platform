import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import UserOrders from '../components/dashboard/UserOrders';
import AdminProducts from '../components/dashboard/AdminProducts';
import AdminOrders from '../components/dashboard/AdminOrders';
import Checkout from '../components/dashboard/Checkout';
import { FaBox, FaShoppingBag, FaClipboardList } from 'react-icons/fa';

const Dashboard = () => {
  const { user, userRole } = useAuth();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname.includes(path) ? 'active' : '';
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="navbar bg-base-200 lg:hidden">
          <div className="flex-none">
            <label htmlFor="dashboard-drawer" className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 mx-2">Dashboard</div>
        </div>

        <div className="p-4 lg:p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Welcome, {user?.displayName || user?.email}</h1>
            <p className="text-gray-600">Role: {userRole || 'User'}</p>
          </div>

          <Routes>
            <Route index element={
              <div className="text-center py-20">
                <h2 className="text-2xl mb-4">
                  {userRole === 'admin' ? 'Welcome Admin! Select an option from the menu' : 'Select an option from the menu'}
                </h2>
              </div>
            } />
            {userRole !== 'admin' && <Route path="orders" element={<UserOrders />} />}
            {userRole !== 'admin' && <Route path="checkout" element={<Checkout />} />}
            {userRole === 'admin' && (
              <>
                <Route path="products" element={<AdminProducts />} />
                <Route path="all-orders" element={<AdminOrders />} />
              </>
            )}
          </Routes>
        </div>
      </div>

      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {userRole !== 'admin' && (
            <>
              <li className="menu-title">
                <span>User Menu</span>
              </li>
              <li>
                <Link to="/dashboard/orders" className={isActive('orders')}>
                  <FaClipboardList /> My Orders
                </Link>
              </li>
            </>
          )}

          {userRole === 'admin' && (
            <>
              <li className="menu-title">
                <span>Admin Menu</span>
              </li>
              <li>
                <Link to="/dashboard/products" className={isActive('products')}>
                  <FaBox /> Manage Products
                </Link>
              </li>
              <li>
                <Link to="/dashboard/all-orders" className={isActive('all-orders')}>
                  <FaShoppingBag /> All Orders
                </Link>
              </li>
            </>
          )}

          <li className="menu-title mt-4">
            <span>Navigation</span>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;