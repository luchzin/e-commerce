import { auth } from "../auth";
import AppFooter from "@/components/app-footer";
import ServiceGuarantees from "@/components/service-guarantees";
import ImageSlider from "@/components/image-slider";
import PromotionalSlides from "@/components/promotional-slides";
import BestProducts from "@/components/best-products";
import LatestProducts from "@/components/latest-products";
import AppHeader from "@/components/app-header";

export default async function Home() {
  const session = await auth();
  return (
    <div className="min-h-screen bg-white">
      <AppHeader />
      {/* Main Image Slider */}
      <ImageSlider />
      {/* Service Guarantees Section */}
      <ServiceGuarantees />

      {/* Promotional Slides Section */}
      <PromotionalSlides />

      {/* Best Products Section */}
      <BestProducts />

      {/* Latest Products Section */}
      <LatestProducts />

      <AppFooter />
    </div>
  );
}
