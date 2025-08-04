// components/ProductCard.tsx

import React from 'react';

interface ProductCardProps {
  image: string;
  title: string;
  description: string;
  price: number;
  discount: number;
  affiliateLink: string;
  tag?: string; // e.g., "Best Seller", "New"
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  description,
  price,
  discount,
  affiliateLink,
  tag
}) => {
  const discountedPrice = (price - (price * discount) / 100).toFixed(2);

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 w-full max-w-sm hover:shadow-xl transition">
      <img
        src={image}
        alt={title}
        className="rounded-xl object-cover w-full h-48 mb-4"
      />
      {tag && (
        <span className="bg-pink-200 text-pink-700 text-xs px-2 py-1 rounded-full mb-2 inline-block">
          {tag}
        </span>
      )}
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      <div className="flex items-center justify-between">
        <span className="text-base font-bold">${discountedPrice}</span>
        <span className="line-through text-sm text-gray-400">${price.toFixed(2)}</span>
      </div>
      <a
        href={affiliateLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 block text-center bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition"
      >
        Shop Now
      </a>
    </div>
  );
};

export default ProductCard;