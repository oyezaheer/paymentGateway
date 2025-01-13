import React from 'react';
import ProductList from '../components/Products/ProductList';

const Home = () => {
  // Mock product data - replace with your actual data
  const products = [
    { id: 1, name: 'Wireless Earbuds', price: 19.99, image: 'https://m.media-amazon.com/images/I/51-CNy1zW4L.jpg' },
    { id: 2, name: 'Smartphone Stand', price: 29.99, image: 'https://m.media-amazon.com/images/I/51-CNy1zW4L.jpg' },
    { id: 3, name: 'Bluetooth Speaker', price: 39.99, image: 'https://m.media-amazon.com/images/I/51-CNy1zW4L.jpg' },
    { id: 4, name: 'Laptop Sleeve', price: 49.99, image: 'https://m.media-amazon.com/images/I/51-CNy1zW4L.jpg' },
    { id: 5, name: 'Smartwatch', price: 99.99, image: 'https://m.media-amazon.com/images/I/51-CNy1zW4L.jpg' },
    { id: 6, name: 'Gaming Mouse', price: 59.99, image: 'https://m.media-amazon.com/images/I/51-CNy1zW4L.jpg' },
    { id: 7, name: 'Portable Charger', price: 24.99, image: 'https://m.media-amazon.com/images/I/51-CNy1zW4L.jpg' },
    { id: 8, name: 'Wireless Keyboard', price: 69.99, image: 'https://m.media-amazon.com/images/I/51-CNy1zW4L.jpg' },
    { id: 9, name: 'Laptop Cooling Pad', price: 34.99, image: 'https://m.media-amazon.com/images/I/51-CNy1zW4L.jpg' },
    { id: 10, name: '4K Webcam', price: 79.99, image: 'https://m.media-amazon.com/images/I/51-CNy1zW4L.jpg' },
  ];

  return (
    <div className="w-full min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-8">
          Our Products
        </h1>
        <div className="bg-red-100 p-6 rounded-lg">
          <ProductList products={products} />
        </div>
      </div>
    </div>
  );
};

export default Home;
