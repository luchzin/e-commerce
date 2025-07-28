"use client";
import ProductCard from "./product-card";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const bestProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 129.99,
    originalPrice: 199.99,
    image: "/img/4.jpg",
    rating: 4.8,
    reviews: 1247,
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 89.99,
    originalPrice: 149.99,
    image: "/img/5.jpg",
    rating: 4.6,
    reviews: 892,
  },
  {
    id: 3,
    name: "Designer Leather Bag",
    price: 199.99,
    originalPrice: 299.99,
    image: "/img/6.jpg",
    rating: 4.9,
    reviews: 567,
  },
  {
    id: 4,
    name: "Wireless Bluetooth Speaker",
    price: 79.99,
    originalPrice: 129.99,
    image: "/img/7.jpg",
    rating: 4.7,
    reviews: 1034,
  },
  {
    id: 5,
    name: "Premium Coffee Maker",
    price: 149.99,
    originalPrice: 249.99,
    image: "/img/8.jpg",
    rating: 4.5,
    reviews: 756,
  },
  {
    id: 6,
    name: "Smart Home Security Camera",
    price: 119.99,
    originalPrice: 179.99,
    image: "/img/9.jpg",
    rating: 4.8,
    reviews: 423,
  },
];

export default function BestProducts() {
  return (
    <div className="w-full py-16 bg-white dark:bg-black">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Best Products
          </h2>
          <p className="text-gray-600 dark:text-white max-w-2xl mx-auto">
            Discover our most popular and highly-rated products that customers
            love. Quality guaranteed with excellent customer satisfaction.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {bestProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              image={product.image}
              rating={product.rating}
              reviews={product.reviews}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button className="dark:bg-gray-950 group bg-gray-100 text-black dark:text-white cursor-pointer shadow-xl dark:hover:bg-gray-800 hover:bg-gray-200 px-8 py-3 rounded-full transition-colors duration-300 flex items-center gap-2 mx-auto">
            View All Products
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </div>
  );
}
