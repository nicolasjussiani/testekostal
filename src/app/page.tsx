import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/layout/ScrollProgress";
import SideNav from "@/components/navigation/SideNav";
import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AboutSection from "@/components/sections/AboutSection";
import AwardsSection from "@/components/sections/AwardsSection";
import ContactSection from "@/components/sections/ContactSection";
import CustomCursor from "@/components/layout/CustomCursor";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Header />
      <SideNav />
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <ProjectsSection />
        <ServicesSection />
        <AboutSection />
        <AwardsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
