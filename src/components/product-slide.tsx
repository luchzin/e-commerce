"use client";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function ProductSlide() {
  const images_url = [
    "/img/1.jpg",
    "/img/2.jpg",
    "/img/3.jpg",
    "/img/4.jpg",
    "/img/5.jpg",
    "/img/6.jpg",
    "/img/7.jpg",
    "/img/8.jpg",
    "/img/9.jpg",
  ];

  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to(".first_col", {
        y: "-=200%",
        x: "-=70%",
        duration: 100,
        repeat: -1,
        ease: "none",
        modifiers: {
          y: (y) => `${parseFloat(y) % 100}%`,
          x: (x) => `${parseFloat(x) % 35}%`,
        },
      });

      gsap.to(".second_col", {
        y: "+=200%",
        x: "+=70%",
        duration: 60,
        repeat: -1,
        ease: "none",
        modifiers: {
          y: (y) => `${parseFloat(y) % 100}%`,
          x: (x) => `${parseFloat(x) % 35}%`,
        },
      });

      gsap.to(".third_col", {
        y: "-=200%",
        x: "-=70%",
        duration: 55,
        repeat: -1,
        ease: "none",
        modifiers: {
          y: (y) => `${parseFloat(y) % 100}%`,
          x: (x) => `${parseFloat(x) % 35}%`,
        },
      });

      // Subtle background pulse
      gsap.to(".bg-pulse", {
        opacity: 0.08,
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: container }
  );

  // 🕹️ Deep 3D Parallax
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!container.current) return;
    const rect = container.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 50; // Slower follow
    const y = (e.clientY - rect.top - rect.height / 2) / 50;

    gsap.to(container.current, {
      rotationY: x * 2,
      rotationX: -y * 2,
      transformPerspective: 1000,
      duration: 1.5,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(container.current, {
      rotationY: 0,
      rotationX: 0,
      duration: 2,
      ease: "elastic.out(1, 0.2)",
    });
  };

  const renderImages = (urls: string[]) => (
    <>
      {urls.map((url, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-xl border border-amber-500/30 hover:border-amber-500 transition-all duration-500 group"
        >
          <Image
            src={url}
            alt="Luxury Product"
            width={280}
            height={280}
            className="object-cover grayscale-[20%] hover:grayscale-0 scale-95 hover:scale-100 transition-all duration-700"
          />
          {/* Hover shine */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>
      ))}
      {/* Duplicates */}
      {urls.map((url, i) => (
        <div
          key={`dup-${i}`}
          className="overflow-hidden rounded-xl border border-amber-500/30 hover:border-amber-500 transition-all duration-500 group"
        >
          <Image
            src={url}
            alt="Luxury Product"
            width={280}
            height={280}
            className="object-cover grayscale-[20%] hover:grayscale-0 scale-95 hover:scale-100 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>
      ))}
    </>
  );

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      <div className="absolute inset-0 bg-pulse bg-gradient-to-br from-amber-900/5 via-black to-purple-900/5" />

      <div className="absolute top-12 left-12 z-50 pointer-events-none">
        <h2 className="text-5xl font-bold text-white mb-3">
          <span className="text-red-400">Crafted</span> Luxury
        </h2>
        <p className="text-xl text-white/80 max-w-md mb-6">
          Limited edition pieces —{" "}
          <span className="text-red-300">Free worldwide shipping</span>
        </p>
        <button className="bg-transparent cursor-pointer border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-black font-medium py-2 px-8 rounded-full transition-all duration-500 pointer-events-auto">
          Discover Collection
        </button>
      </div>

      <div
        ref={container}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative h-full w-full perspective-1200 transform-style-preserve-3d"
      >
        {/* Columns with 20° tilt */}
        <div
          className="absolute first_col left-[15%] origin-bottom"
          style={{ transform: "rotateY(20deg)" }}
        >
          <div className="flex flex-col gap-8 w-[280px]">
            {renderImages(images_url)}
          </div>
        </div>

        <div
          className="absolute second_col left-[50%] translate-x-[-50%] origin-bottom"
          style={{ transform: "rotateY(-20deg)" }}
        >
          <div className="flex flex-col gap-8 w-[280px]">
            {renderImages([...images_url].reverse())}
          </div>
        </div>

        <div
          className="absolute third_col right-[15%] origin-bottom"
          style={{ transform: "rotateY(20deg)" }}
        >
          <div className="flex flex-col gap-8 w-[280px]">
            {renderImages(images_url)}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-40 pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-64 h-64 bg-amber-500/10 rounded-full filter blur-[100px] pointer-events-none" />
    </div>
  );
}
