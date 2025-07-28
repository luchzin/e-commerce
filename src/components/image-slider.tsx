"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slideData = [
  {
    id: 1,
    title: "Summer Collection 2024",
    subtitle: "Up to 50% Off on New Arrivals",
    description: "Discover the latest trends in fashion and accessories",
    image: "/img/1.jpg",
    buttonText: "Shop Now",
    bgColor: "bg-gradient-to-r from-pink-100 to-purple-100",
  },
  {
    id: 2,
    title: "Electronics Sale",
    subtitle: "Save Big on Smart Devices",
    description: "Premium electronics at unbeatable prices",
    image: "/img/2.jpg",
    buttonText: "Explore Deals",
    bgColor: "bg-gradient-to-r from-blue-100 to-cyan-100",
  },
  {
    id: 3,
    title: "Home & Lifestyle",
    subtitle: "Transform Your Living Space",
    description: "Beautiful home decor and lifestyle products",
    image: "/img/3.jpg",
    buttonText: "Discover More",
    bgColor: "bg-gradient-to-r from-green-100 to-emerald-100",
  },
  {
    id: 4,
    title: "Sports & Fitness",
    subtitle: "Stay Active, Stay Healthy",
    description: "Premium sports equipment and fitness gear",
    image: "/img/4.jpg",
    buttonText: "Get Fit",
    bgColor: "bg-gradient-to-r from-orange-100 to-red-100",
  },
];

export default function ImageSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideData.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slideData.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background Image */}
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30"></div>

              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4">
                  <div className="max-w-2xl">
                    <div
                      className={`inline-block text-black px-4 py-2 rounded-full text-sm font-medium mb-4 bg-gradient-to-r from-pink-100 to-purple-100 bg-opacity-80`}
                    >
                      {slide.subtitle}
                    </div>
                    <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-xl text-white/90 mb-8 max-w-lg">
                      {slide.description}
                    </p>
                    <Button className="bg-white text-black hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300">
                      {slide.buttonText}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slideData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full sm:h-1 h-[2px] bg-gray-200 dark:bg-gray-800">
        <div
          className="h-full bg-gradient-to-r from-pink-600 to-red-500 transition-all duration-500 ease-linear"
          style={{
            width: `${((currentSlide + 1) / slideData.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}
