import React from "react";
import ProductSlide from "@/components/product-slide";
import "../globals.css";

const LayoutAuth: React.FC<{ children: any }> = ({ children }) => {
  return (
    <div className="flex flex-row h-screen w-screen">
      <div className="flex-1">{children}</div>
      <div className="flex-1 hidden sm:block h-full">
        <ProductSlide />
      </div>
    </div>
  );
};

export default LayoutAuth;
