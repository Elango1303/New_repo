import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import About from "@/components/About";
import WhyChooseUs from "@/components/WhyChooseUs";
import Categories from "@/components/Categories";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSlider />
      <About />
      <WhyChooseUs />
      <Categories />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
