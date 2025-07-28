"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

const promotionalData = [
  {
    id: 1,
    title: "#For Women !!",
    subtitle: "Sale 10% Off Almost Everything",
    image: "/img/1.jpg",
    bgColor: "bg-green-50",
    buttonText: "DISCOVER MORE",
  },
  {
    id: 2,
    title: "#All Accessories",
    subtitle: "Sale 40% Off Almost Everything",
    image: "/img/2.jpg",
    bgColor: "bg-pink-50",
    buttonText: "DISCOVER MORE",
  },
  {
    id: 3,
    title: "#For Men's!!",
    subtitle: "Sale 20% Off Almost Everything",
    image: "/img/3.jpg",
    bgColor: "bg-blue-50",
    buttonText: "DISCOVER MORE",
  },
];

export default function PromotionalSlides() {
  return (
    <div className="w-full py-12 bg-gray-50 dark:bg-[#060606]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promotionalData.map((item) => (
            <Card
              key={item.id}
              className={`relative rounded-none overflow-hidden border-0 py-0 shadow-lg hover:shadow-xl transition-all duration-300 ${item.bgColor}`}
            >
              <CardContent className="p-0 relative">
                {/* Background Image */}
                <div className="relative h-80 w-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  {/* Overlay for better text readability */}
                  <div className="absolute inset-0 bg-black/10"></div>
                </div>

                {/* Text Content - Positioned absolutely */}
                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <h3 className="text-2xl font-bold text-red-500 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white mb-4 text-sm">{item.subtitle}</p>

                  {/* Button - Positioned relatively within the text container */}
                  <div className="relative">
                    <Button className="dark:bg-black bg-white text-black dark:text-white dark:hover:bg-gray-800 hover:bg-gray-200 cursor-pointer transition-colors duration-300 px-6 py-2 rounded-none">
                      {item.buttonText}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
