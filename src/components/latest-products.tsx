"use client";
import ProductCard from "./product-card";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const latestProducts = [
  {
    id: 7,
    name: "Ultra HD 4K Smart TV",
    price: 599.99,
    originalPrice: 799.99,
    image: "/img/1.jpg",
    rating: 4.9,
    reviews: 2341,
  },
  {
    id: 8,
    name: "Professional Gaming Laptop",
    price: 1299.99,
    originalPrice: 1599.99,
    image: "/img/2.jpg",
    rating: 4.7,
    reviews: 892,
  },
  {
    id: 9,
    name: "Wireless Noise Cancelling Earbuds",
    price: 159.99,
    originalPrice: 229.99,
    image: "/img/3.jpg",
    rating: 4.8,
    reviews: 1567,
  },
  {
    id: 10,
    name: "Smart Refrigerator with Camera",
    price: 899.99,
    originalPrice: 1199.99,
    image: "/img/4.jpg",
    rating: 4.6,
    reviews: 445,
  },
  {
    id: 11,
    name: "Portable Solar Charger",
    price: 89.99,
    originalPrice: 149.99,
    image: "/img/5.jpg",
    rating: 4.5,
    reviews: 678,
  },
  {
    id: 12,
    name: "Smart Mirror with LED Lights",
    price: 299.99,
    originalPrice: 399.99,
    image: "/img/6.jpg",
    rating: 4.7,
    reviews: 334,
  },
];

export default function LatestProducts() {
  return (
    <div className="w-full py-16 bg-gray-50 dark:bg-[#060606]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Latest Products
          </h2>
          <p className="text-gray-600 dark:text-white max-w-2xl mx-auto">
            Stay ahead with our newest arrivals featuring cutting-edge
            technology and innovative designs. Be the first to experience the
            future.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {latestProducts.map((product) => (
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
            View Latest Arrivals
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </div>
  );
}
