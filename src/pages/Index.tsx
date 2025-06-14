import { Navigation } from "../components/ui/navigation";
import { HeroSection } from "../components/sections/HeroSection";
import { ProductsSection } from "../components/sections/ProductsSection";
import { BestsellersSection } from "../components/sections/BestsellersSection";
import { AnatomySection } from "../components/sections/AnatomySection";
import { BlogSection } from "../components/sections/BlogSection";
import { TestimonialsSection } from "../components/sections/TestimonialsSection";
import { GoogleMapsSection } from "../components/sections/GoogleMapsSection";
import { Footer } from "../components/ui/Footer";
import { SEO } from "../components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#262729]">
      <SEO />
      <Navigation />
      <main className="pt-[80px]">
        <HeroSection />
        <ProductsSection />
        <AnatomySection />
        <BestsellersSection />
        <TestimonialsSection />
        <BlogSection />
        <GoogleMapsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
