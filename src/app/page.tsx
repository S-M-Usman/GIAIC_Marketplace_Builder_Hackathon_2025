import EssentialSection from "@/components/HomePage/EssentialSection";
import FeaturedSection from "@/components/HomePage/FeaturedSection";
import GearSection from "@/components/HomePage/GearSection";
import Hero from "@/components/HomePage/Hero";
import HomeCard from "@/components/HomePage/HomeCard";
import StanSection from "@/components/HomePage/StanSection";



export default function Home() {
  return (
    <>
        <Hero/>
        <HomeCard />
        <FeaturedSection />
        <GearSection />
        <StanSection />
        <EssentialSection />
    </>
  );
}