import { HeroSection } from "./components/Hero";
import { FeaturesSection } from "./components/Features";
import { CTASection } from "./components/CTA";

export default function Home() {
  return (
    <div className="flex flex-col gap-20">
      <HeroSection />
      <FeaturesSection />
      {/* <StatsSection />
      <TestimonialsSection /> */}
      <CTASection />
    </div>
  );
}
