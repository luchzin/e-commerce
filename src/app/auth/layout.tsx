import React from "react";
import FlyingPosters from "@/components/ui/FlyingPosters";
import "../globals.css";

const LayoutAuth: React.FC<{ children: any }> = ({ children }) => {
  // Images for the flying posters effect
  const posterImages = [
    "https://picsum.photos/500/500?grayscale",
    "https://picsum.photos/600/600?grayscale",
    "https://picsum.photos/400/400?grayscale",
  ];

  return (
    <div className="flex flex-row h-screen w-screen">
      <div className="flex-1">{children}</div>
      <div className="flex-1 hidden sm:block h-full bg-gradient-to-bl from-red-500 to-red-600">
        <FlyingPosters
          items={posterImages}
          planeWidth={400}
          planeHeight={400}
          distortion={2}
          scrollEase={0.005}
          cameraFov={50}
          cameraZ={15}
          autoScrollSpeed={0.01}
        />
      </div>
    </div>
  );
};

export default LayoutAuth;
