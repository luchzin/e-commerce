"use client";

import { Button } from "@/components/ui/button";
import {
  ChevronUp,
  Twitter,
  Facebook,
  Linkedin,
  Instagram,
} from "lucide-react";
import Link from "next/link";
import { Input } from "./ui/input";

export default function AppFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative">
      {/* Main Footer Area */}
      <div className="bg-[#0d0d0d] relative overflow-hidden">
        {/* Geometric Pattern Background */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Left Section - Tshop Information */}
            <div className="space-y-6">
              {/* Title */}
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-red-500 bg-clip-text text-transparent">
                  Tshop
                </h1>
                <p className="text-gray-300 leading-relaxed max-w-md">
                  Empowering by discipline and great developer who put many
                  hours and efforts into our site in order to ensure of
                  performance and security.
                </p>
              </div>

              {/* Social Media Icons */}
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                >
                  <Twitter className="w-5 h-5 text-white" />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                >
                  <Facebook className="w-5 h-5 text-white" />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                >
                  <Linkedin className="w-5 h-5 text-white" />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </Link>
              </div>

              {/* Back to Top Button */}
              <Button
                onClick={scrollToTop}
                variant="outline"
                className="cursor-pointer border-gray-600 bg-gray-950 text-white hover:bg-gray-900 hover:text-white transition-colors group"
              >
                <div className="flex flex-col items-center">
                  <ChevronUp className="w-4 h-4" />
                  <ChevronUp className="w-4 h-4 -mt-[10px] group-hover:-mt-2" />
                </div>
                <span className="ml-2">BACK TO TOP</span>
              </Button>
            </div>
            {/* Right Section - Legal Links */}

            <div className="flex flex-col">
              <h3 className="text-2xl text-white mb-6 sm:text-left text-center">
                Legal
              </h3>
              <div className="flex flex-col items-center sm:items-start gap-4 ">
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors w-fit hover:underline"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors w-fit hover:underline"
                >
                  Term of Service
                </Link>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors w-fit hover:underline"
                >
                  Pricing
                </Link>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors w-fit hover:underline"
                >
                  Term of Service
                </Link>
              </div>
            </div>

            <div className="flex flex-col">
              <h3 className="text-2xl text-white mb-6 sm:text-left text-center">
                Category
              </h3>
              <div className="flex flex-col gap-4 items-center sm:items-start">
                <Link
                  href="#"
                  className="text-gray-300  hover:text-white transition-colors w-fit hover:underline"
                >
                  Electronics
                </Link>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors w-fit hover:underline"
                >
                  Fashion
                </Link>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors w-fit hover:underline"
                >
                  Home & Garden
                </Link>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors w-fit hover:underline"
                >
                  Health & Beauty
                </Link>
              </div>
            </div>

            <div className="flex flex-col">
              <h3 className="text-2xl text-white mb-6 sm:text-left text-center">
                Newsletter
              </h3>
              <div className="flex flex-col items-center sm:items-start">
                <p className="text-gray-300 leading-relaxed max-w-md text-center sm:text-left">
                  Subscribe to our newsletter to get the latest news and
                  updates.
                </p>
              </div>

              <div className="mt-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-2 text-white outline-none rounded-md border border-gray-600"
                />
                <Button
                  variant="outline"
                  className="w-full mt-2 border-gray-600 bg-gray-950 text-white cursor-pointer hover:bg-gray-900 hover:text-white"
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm">
              Copyright@ {new Date().getFullYear()}, Tshop, All Right Reserved!
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
