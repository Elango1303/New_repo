import shopImage from "@/assets/shop-interior.jpg";

const About = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content - Left Side */}
          <div className="order-2 md:order-1">
            <h2 className="text-4xl font-bold text-primary mb-6">About Us</h2>
            <p className="text-muted-foreground text-lg mb-4 leading-relaxed">
              Welcome to R.A Traders, your one-stop destination for quality products 
              and exceptional service. Since our establishment, we have been dedicated 
              to bringing you the finest selection of chocolates, biscuits, nuts, 
              perfumes, dates, and toys.
            </p>
            <p className="text-muted-foreground text-lg mb-4 leading-relaxed">
              Our mission is to provide our customers with premium products at 
              competitive prices while maintaining the highest standards of quality 
              and customer satisfaction.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We carefully curate our product selection to ensure that every item 
              meets our strict quality standards, giving you peace of mind with 
              every purchase.
            </p>
          </div>

          {/* Image - Right Side */}
          <div className="order-1 md:order-2">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img
                src={shopImage}
                alt="R.A Traders Shop Interior"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
