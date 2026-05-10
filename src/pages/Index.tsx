import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import Services from "@/components/landing/Services";
import Impact from "@/components/landing/Impact";
import Differentials from "@/components/landing/Differentials";
import TechStack from "@/components/landing/TechStack";
import Testimonials from "@/components/landing/Testimonials";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Impact />
      <Differentials />
      <TechStack />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
};

export default Index;
