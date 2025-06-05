import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";

import { HeroSection } from "@/components/Herosection";
import { TopBar } from "@/components/ui/top-bar";
import { FeatureCards } from "@/components/FeatureCard";
import { TestimonialSection } from "@/components/TestimonialSection";
import Contact from "@/components/Contact";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="w-full h-full m-0 p-0">
      {/* Pass session to TopBar to show user logo or signin/signup */}
      <TopBar session={session} />

      <HeroSection />
      <FeatureCards />
      <Contact />
      <PricingSection />
      <TestimonialSection />
      <Footer />
    </div>
  );
}
