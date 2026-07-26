import HeroSection from "../../components/landing/HeroSection";
import ProductsSection from "../../components/landing/ProductsSection";
import UseCasesSection from "../../components/landing/UseCasesSection";
import HowItWorksSection from "../../components/landing/HowItWorksSection";
import LoanCalculatorSection from "../../components/landing/LoanCalculatorSection";
import StatsSection from "../../components/landing/StatsSection";
import FeaturesSection from "../../components/landing/FeaturesSection";
import FAQSection from "../../components/landing/FAQSection";
import TestimonialsSection from "../../components/landing/TestimonialsSection";
import CTASection from "../../components/landing/CTASection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ProductsSection />
      <HowItWorksSection />
      <StatsSection />
      <LoanCalculatorSection />
      <UseCasesSection />
      <FeaturesSection />
      <FAQSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
