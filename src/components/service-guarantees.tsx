"use client";
import { Truck, RotateCcw, Wallet, Headphones, CreditCard } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const serviceData = [
  {
    icon: Truck,
    title: "FREE DELIVERY",
    subtitle: "From $59.59",
    color: "text-red-600",
  },
  {
    icon: RotateCcw,
    title: "FREE RETURN",
    subtitle: "365 Days",
    color: "text-green-600",
  },
  {
    icon: Wallet,
    title: "BIG SAVING",
    subtitle: "From $29.59",
    color: "text-orange-600",
  },
  {
    icon: Headphones,
    title: "SUPPORT 24/7",
    subtitle: "Online 24 hours",
    color: "text-purple-600",
  },
];

export default function ServiceGuarantees() {
  return (
    <div className="w-full bg-white dark:bg-black py-8 px-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {serviceData.map((service, index) => (
            <div key={index} className="flex items-center justify-center">
              <Card className="border-0 shadow-none dark:bg-[#060606] bg-gray-100 min-w-[195px] py-4 rounded-lg">
                <CardContent className="sm:p-4 p-2 flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full bg-gray-100 dark:bg-black ${service.color}`}
                  >
                    <service.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                      {service.title}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-white">
                      {service.subtitle}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
