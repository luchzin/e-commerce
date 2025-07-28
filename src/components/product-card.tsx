"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Star, ShoppingCart, Heart } from "lucide-react";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
}

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  rating,
  reviews,
}: ProductCardProps) {
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <Card className="group dark:bg-[#090909] relative overflow-hidden border-0 rounded-none py-0 shadow-md hover:shadow-xl transition-all duration-300">
      <CardContent className="p-0">
        {/* Product Image */}
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />

          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              -{discount}%
            </div>
          )}

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-3 right-3 bg-white/80 hover:bg-white text-gray-700 hover:text-red-500 rounded-full w-8 h-8 p-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <Heart className="w-4 h-4" />
          </Button>

          {/* Quick Add to Cart */}
          <Button className="absolute bottom-3 left-1/2 transform -translate-x-1/2 dark:bg-black bg-white text-black dark:text-white dark:hover:bg-gray-800 hover:bg-gray-200 rounded-full px-4 py-2 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            Go to Product
          </Button>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-semibold text-black dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
            {name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">({reviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              ${price.toFixed(2)}
            </span>
            {originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
