// components/ProductCard.tsx
import React from 'react';

export default function ProductCard({ product }) {
  const handleClick = () => {
    // Track affiliate click (send to API or log in Firebase later)
    fetch('/api/track-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: product.id }),
    });

    // Open affiliate link
    window.open(product.affiliateLink, '_blank');
  };

  return (
    <div className="border rounded-2xl shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition duration-300">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-xl"
        />
        {product.tag && (
          <span className="absolute top-2 left-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
            {product.tag}
          </span>
        )}
      </div>

      <div className="mt-3">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-sm text-gray-600">{product.description}</p>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <div>
          <span className="text-sm font-semibold text-green-600">
            ${product.discountedPrice.toFixed(2)}
          </span>
          <span className="text-xs text-gray-500 line-through ml-2">
            ${product.originalPrice.toFixed(2)}
          </span>
        </div>
        <button
          onClick={handleClick}
          className="bg-black text-white px-3 py-1 rounded-lg text-sm hover:bg-gray-800"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}