import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content mt-auto">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">SmartShop</h3>
            <p className="text-sm">Your one-stop destination for quality products and exceptional service.</p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="link link-hover">Home</Link></li>
              <li><Link to="/products" className="link link-hover">Products</Link></li>
              <li><Link to="/about" className="link link-hover">About Us</Link></li>
              <li><Link to="/contact" className="link link-hover">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="#" className="link link-hover">FAQ</a></li>
              <li><a href="#" className="link link-hover">Shipping Info</a></li>
              <li><a href="#" className="link link-hover">Returns</a></li>
              <li><a href="#" className="link link-hover">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="btn btn-circle btn-outline btn-sm">
                <FaFacebook />
              </a>
              <a href="#" className="btn btn-circle btn-outline btn-sm">
                <FaTwitter />
              </a>
              <a href="#" className="btn btn-circle btn-outline btn-sm">
                <FaInstagram />
              </a>
              <a href="#" className="btn btn-circle btn-outline btn-sm">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-base-300 py-4">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} SmartShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;