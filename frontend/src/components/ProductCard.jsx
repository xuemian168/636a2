import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-0 right-0 p-2 bg-blue-600 text-white rounded-full">
          <span className="text-xs font-bold">
            {product.provider.name}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-blue-600 font-bold">${product.price}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
