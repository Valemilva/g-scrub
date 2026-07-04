import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import HowItWorks from "@/components/HowItWorks";
import ProductShowcase from "@/components/ProductShowcase";
import BrandStory from "@/components/BrandStory";
import ProductLine from "@/components/ProductLine";
import ClubCleanerPreview from "@/components/ClubCleanerPreview";
import RefillSystem from "@/components/RefillSystem";
import BundleSection from "@/components/BundleSection";
import TrustSection from "@/components/TrustSection";
import FAQ from "@/components/FAQ";
import EmailCapture from "@/components/EmailCapture";
import WholesaleSection from "@/components/WholesaleSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import StickyCTABar from "@/components/StickyCTABar";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <ProblemSection />
        <SolutionSection />
        {/* The full 7-product system comes BEFORE the single available kit,
            so the page reads as a brand/system home — not a one-product
            landing. As more products go live on Amazon, they light up here
            first. */}
        <ProductLine />
        <HowItWorks />
        <ProductShowcase />
        <BrandStory />
        <ClubCleanerPreview />
        <RefillSystem />
        <BundleSection />
        <TrustSection />
        <FAQ />
        <EmailCapture />
        <WholesaleSection />
        <FinalCTA />
      </main>
      <Footer />
      <StickyCTABar />
    </>
  );
}
