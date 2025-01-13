import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
  return (
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
{products.map((product) => (
        <div key={product.id} className="flex justify-center ">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
