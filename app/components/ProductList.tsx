// components/ProductList.tsx
import React, { useState } from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
);

export default ProductList;

const products = [
  {
    name: 'Curl Defining Cream',
    image: 'https://envs.sh/n-.jpg/IMG2025080216.jpg',
    price: '$4.50',
    discount: '10% Off',
    tag: 'Best Seller',
    category: 'Hair',
    link: 'https://bitli.in/5z3NLoZ',
    description: 'Enhances natural curls while keeping frizz at bay.'
  },
  {
    name: 'Shine Spray',
    image: 'https://envs.sh/nX.jpg/IMG20250802339.jpg',
    price: '$3.75',
    discount: '5% Off',
    tag: 'New',
    category: 'Hair',
    link: 'https://bitli.in/HoXbKv0',
    description: 'Gives your hair a glossy, luminous finish instantly.'
  },
  {
    name: 'Small Hair Plastic Bands',
    image: 'https://envs.sh/nV.jpg/IMG20250802478.jpg',
    price: '$1.99',
    discount: '20% Off',
    tag: 'Hot',
    category: 'Hair',
    link: 'https://bitli.in/Y4cbxN2',
    description: 'Perfect for braiding and styling baby hairs.'
  },
  {
    name: 'Detangling Spray',
    image: 'https://envs.sh/n6.jpg/IMG20250802538.jpg',
    price: '$3.50',
    discount: '15% Off',
    tag: 'Best Seller',
    category: 'Hair',
    link: 'https://bitli.in/z2fmw1i',
    description: 'Smoothens and softens your hair for easy brushing.'
  },
  {
    name: 'Light Hold Styling Cream',
    image: 'https://envs.sh/nv.jpg/IMG20250802186.jpg',
    price: '$4.00',
    discount: '10% Off',
    tag: 'New',
    category: 'Hair',
    link: 'https://bitli.in/F6NotdR',
    description: 'Tames frizz and gives your hair a natural look.'
  },
  {
    name: 'Hair Glitter Spray',
    image: 'https://envs.sh/nx.jpg/IMG20250802827.jpg',
    price: '$3.25',
    discount: '5% Off',
    tag: 'Best Seller',
    category: 'Hair',
    link: 'https://bitli.in/ZHsyKvV',
    description: 'Add some sparkle to your hair for parties & festivals.'
  },
  {
    name: 'Vintage Band Tees',
    image: 'https://envs.sh/nf.jpg/IMG2025080223.jpg',
    price: '$5.00',
    discount: '30% Off',
    tag: 'Best Seller',
    category: 'Fashion',
    link: 'https://bitli.in/1S4kh1u',
    description: 'Iconic band tees with retro graphics.'
  },
  {
    name: 'Faux Leather Pants',
    image: 'https://envs.sh/nO.jpg/IMG20250802322.jpg',
    price: '$5.00',
    discount: '25% Off',
    tag: 'Hot',
    category: 'Fashion',
    link: 'https://bitli.in/2SCvOYj',
    description: 'High-waisted with a glossy finish — edgy & chic.'
  },
  {
    name: 'Y2K Graphic Tees',
    image: 'https://envs.sh/ny.jpg/IMG20250802322.jpg',
    price: '$4.25',
    discount: '15% Off',
    tag: 'New',
    category: 'Fashion',
    link: 'https://bitli.in/Goq5eTD',
    description: 'Bring back Y2K with these bold retro designs.'
  },
  {
    name: 'Oversized Blazer',
    image: 'https://envs.sh/nH.jpg/IMG20250802456.jpg',
    price: '$5.00',
    discount: '20% Off',
    tag: 'Trending',
    category: 'Fashion',
    link: 'https://bitli.in/4cmL4uw',
    description: 'Smart, slouchy blazers for street-style queens.'
  },
  {
    name: 'Biker Shorts',
    image: 'https://envs.sh/ng.jpg/IMG20250802640.jpg',
    price: '$2.50',
    discount: '10% Off',
    tag: 'Hot',
    category: 'Fashion',
    link: 'https://bitli.in/mF3KwXK',
    description: 'Stretchy, comfy, and always in trend.'
  },
  {
    name: 'Chunky Dad Sneakers',
    image: 'https://envs.sh/n-.jpg/IMG2025080216.jpg',
    price: '$5.00',
    discount: '10% Off',
    tag: 'Best Seller',
    category: 'Fashion',
    link: 'https://bitli.in/xxJwRYC',
    description: 'The ultimate Gen-Z vibe — bold and comfy.'
  },
  {
    name: 'Fabric Paints',
    image: 'https://envs.sh/nf.jpg/IMG2025080223.jpg',
    price: '$3.00',
    discount: '5% Off',
    tag: 'New',
    category: 'Accessories',
    link: 'https://bitli.in/c3anXUi',
    description: 'Unleash your DIY fashion side.'
  },
  {
    name: 'Oversized Graphic Hoodies',
    image: 'https://envs.sh/na.jpg/IMG20250802250.jpg',
    price: '$5.00',
    discount: '15% Off',
    tag: 'Best Seller',
    category: 'Fashion',
    link: 'https://bitli.in/wZioAac',
    description: 'Snug, bold hoodies with statement prints.'
  },
  {
    name: 'Sequined Mini Dress',
    image: 'https://envs.sh/nm.jpg/IMG2025080295.jpg',
    price: '$5.00',
    discount: '20% Off',
    tag: 'Hot',
    category: 'Fashion',
    link: 'https://bitli.in/oSls67D',
    description: 'All eyes on you at every party.'
  },
  {
    name: 'Knee High Boots',
    image: 'https://envs.sh/nM.jpg/IMG20250802941.jpg',
    price: '$5.00',
    discount: '10% Off',
    tag: 'Best Seller',
    category: 'Fashion',
    link: 'https://bitli.in/bxvT2ce',
    description: 'Long boots to spice up your winter look.'
  },
  {
    name: 'Distressed Jeans',
    image: 'https://envs.sh/nN.jpg/IMG20250802339.jpg',
    price: '$4.75',
    discount: '10% Off',
    tag: 'New',
    category: 'Fashion',
    link: 'https://bitli.in/iYVtQyi',
    description: 'Stylishly ripped and rugged.'
  }
];

export default function ProductList() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = products.filter(p =>
    (category === 'All' || p.category === category) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
        <input
          type="text"
          placeholder="Search products..."
          className="border p-2 rounded w-full md:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border p-2 rounded w-full md:w-1/4"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Hair">Hair</option>
          <option value="Fashion">Fashion</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((p, i) => (
          <div key={i} className="border rounded-xl p-4 shadow hover:shadow-lg transition">
            <img src={p.image} alt={p.name} className="w-full h-48 object-cover rounded" />
            <div className="mt-3">
              <h2 className="text-lg font-semibold">{p.name}</h2>
              <p className="text-sm text-gray-500">{p.description}</p>
              <p className="mt-2 text-pink-600 font-bold">{p.price} <span className="text-sm text-gray-400 line-through ml-2">{p.discount}</span></p>
              <span className="text-xs inline-block bg-pink-100 text-pink-700 rounded px-2 py-1 mt-1">{p.tag}</span>
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-3 bg-black text-white text-center py-2 rounded hover:bg-gray-800"
                onClick={() => console.log(`Clicked: ${p.name}`)}
              >
                Buy Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
"use client";

import { useState } from "react"; import Image from "next/image";

const products = [ { name: "Curl Defining Cream", image: "https://envs.sh/n-.jpg/IMG2025080216.jpg", price: "$4.25", discount: "$5", category: "Hair", tag: "Best Seller", link: "https://bitli.in/5z3NLoZ", }, { name: "Shine Spray", image: "https://envs.sh/nX.jpg/IMG20250802339.jpg", price: "$3.75", discount: "$4.50", category: "Hair", tag: "New", link: "https://bitli.in/HoXbKv0", }, { name: "Plastic Hair Bands", image: "https://envs.sh/nV.jpg/IMG20250802478.jpg", price: "$1.50", discount: "$2", category: "Accessories", tag: "", link: "https://bitli.in/Y4cbxN2", }, { name: "Detangling Spray / Leave-in Conditioner", image: "https://envs.sh/n6.jpg/IMG20250802538.jpg", price: "$3.20", discount: "$4", category: "Hair", tag: "Best Seller", link: "https://bitli.in/z2fmw1i", }, { name: "Light Hold Hair Gel", image: "https://envs.sh/nv.jpg/IMG20250802186.jpg", price: "$3.99", discount: "$5", category: "Hair", tag: "", link: "https://bitli.in/F6NotdR", }, { name: "Hair Glitter Spray", image: "https://envs.sh/nx.jpg/IMG20250802827.jpg", price: "$2.95", discount: "$4", category: "Hair", tag: "New", link: "https://bitli.in/ZHsyKvV", }, { name: "Vintage Band Tees", image: "https://envs.sh/nf.jpg/IMG2025080223.jpg", price: "$4.85", discount: "$5", category: "Fashion", tag: "Best Seller", link: "https://bitli.in/1S4kh1u", }, { name: "Faux Leather Pants", image: "https://envs.sh/nO.jpg/IMG20250802322.jpg", price: "$4.90", discount: "$5", category: "Fashion", tag: "", link: "https://bitli.in/2SCvOYj", }, { name: "Y2K Graphic Tees", image: "https://envs.sh/ny.jpg/IMG20250802322.jpg", price: "$3.85", discount: "$4.50", category: "Fashion", tag: "New", link: "https://bitli.in/Goq5eTD", }, { name: "Oversized Blazer", image: "https://envs.sh/nH.jpg/IMG20250802456.jpg", price: "$4.99", discount: "$5", category: "Fashion", tag: "", link: "https://bitli.in/4cmL4uw", }, { name: "Biker Shorts", image: "https://envs.sh/ng.jpg/IMG20250802640.jpg", price: "$3.45", discount: "$4", category: "Fashion", tag: "Best Seller", link: "https://bitli.in/mF3KwXK", }, { name: "Chunky Dad Sneakers", image: "https://envs.sh/nf.jpg/IMG2025080223.jpg", price: "$4.60", discount: "$5", category: "Fashion", tag: "", link: "https://bitli.in/xxJwRYC", }, { name: "Oversized Graphic Hoodies", image: "https://envs.sh/na.jpg/IMG20250802250.jpg", price: "$4.85", discount: "$5", category: "Fashion", tag: "New", link: "https://bitli.in/wZioAac", }, { name: "Sequined Mini Dress", image: "https://envs.sh/nm.jpg/IMG2025080295.jpg", price: "$4.99", discount: "$5", category: "Fashion", tag: "", link: "https://bitli.in/oSls67D", }, { name: "Knee High Boots", image: "https://envs.sh/nM.jpg/IMG20250802941.jpg", price: "$4.89", discount: "$5", category: "Fashion", tag: "Best Seller", link: "https://bitli.in/bxvT2ce", }, { name: "Fabric Paints", image: "https://envs.sh/nf.jpg/IMG2025080223.jpg", price: "$2.25", discount: "$3", category: "Accessories", tag: "New", link: "https://bitli.in/c3anXUi", }, { name: "Distressed Jeans", image: "https://envs.sh/nN.jpg/IMG20250802339.jpg", price: "$4.70", discount: "$5", category: "Fashion", tag: "", link: "https://bitli.in/iYVtQyi", }, ];

const categories = ["All", "Hair", "Fashion", "Accessories"];

export default function ProductList() { const [selectedCategory, setSelectedCategory] = useState("All"); const [search, setSearch] = useState("");

const filtered = products.filter( (p) => (selectedCategory === "All" || p.category === selectedCategory) && p.name.toLowerCase().includes(search.toLowerCase()) );

const handleClick = (productName: string) => { console.log("Clicked:", productName); };

return ( <div className="space-y-4"> <div className="flex gap-2 flex-wrap items-center"> <input type="text" className="border p-2 rounded w-full sm:w-64" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} /> {categories.map((cat) => ( <button key={cat} onClick={() => setSelectedCategory(cat)} className={px-3 py-1 rounded border text-sm ${ selectedCategory === cat ? "bg-black text-white" : "bg-white" }} > {cat} </button> ))} </div>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {filtered.map((p, i) => (
      <div key={i} className="border rounded p-4 shadow hover:shadow-lg">
        <Image
          src={p.image}
          alt={p.name}
          width={400}
          height={400}
          className="rounded mb-2 object-cover"
        />
        <h2 className="font-semibold text-lg">{p.name}</h2>
        <p className="text-sm text-gray-600">Category: {p.category}</p>
        {p.tag && (
          <span className="inline-block text-xs bg-pink-200 text-pink-800 px-2 py-1 rounded">
            {p.tag}
          </span>
        )}
        <p className="mt-1">
          <span className="text-lg font-bold text-green-600">{p.price}</span>
          <span className="text-sm text-gray-500 line-through ml-2">{p.discount}</span>
        </p>
        <a
          href={p.link}
          target="_blank"
          onClick={() => handleClick(p.name)}
          className="block mt-3 text-center bg-black text-white py-1 rounded"
        >
          Buy Now
        </a>
      </div>
    ))}
  </div>
</div>

); }

// components/FilterBar.tsx
export default function FilterBar({ search, category, setSearch, setCategory }) {
  return (
    <div className="flex flex-wrap gap-4 p-4 items-center">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 border rounded-md w-full md:w-auto"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-2 border rounded-md"
      >
        <option value="">All Categories</option>
        <option value="Hair">Hair</option>
        <option value="Fashion">Fashion</option>
        <option value="Accessories">Accessories</option>
      </select>
    </div>
  );
}

