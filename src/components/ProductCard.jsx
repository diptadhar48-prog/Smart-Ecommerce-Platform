import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
      <figure className="h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg">{product.title}</h2>
        <p className="text-sm text-gray-600 line-clamp-2">
          {product.shortDescription}
        </p>
        <div className="flex items-center gap-2 my-2">
          <div className="flex items-center text-yellow-500">
            <FaStar />
            <span className="ml-1 text-sm">
              {product.ratings?.average?.toFixed(1) || 0}
            </span>
          </div>
          <span className="text-xs text-gray-500">
            ({product.ratings?.count || 0} reviews)
          </span>
        </div>
        <div className="card-actions justify-between items-center">
          <span className="text-2xl font-bold text-primary">
            ${product.price}
          </span>
          <Link to={`/products/${product._id}`} className="btn btn-primary btn-sm">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;