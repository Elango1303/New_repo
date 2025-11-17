import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import chocolateImg from "@/assets/Almond.png";
import biscuitsImg from "@/assets/Biscuit.png";
import nutsImg from "@/assets/Cashew.png";
import perfumeImg from "@/assets/Perfume.png";
import datesImg from "@/assets/Dates.png";
import toysImg from "@/assets/Pista.png";

const categories = [
  { id: 1, name: "Chocolates", image: "/images/cho.jpg", description: "Premium chocolates from around the world", path: "/chocolate" },
  { id: 2, name: "Biscuits", image: biscuitsImg, description: "Delicious biscuits for every occasion", path: "/biscuits" },
  { id: 3, name: "Nuts", image: nutsImg, description: "Healthy and nutritious nuts", path: "/nuts" },
  { id: 4, name: "Perfumes", image: perfumeImg, description: "Luxury fragrances for everyone", path: "/perfumes" },
  { id: 5, name: "Dates", image: datesImg, description: "Fresh and premium quality dates", path: "/dates" },
  { id: 6, name: "Toys", image: "/images/toy.jpg", description: "Fun toys for children of all ages", path: "/toys" },
 { id: 7, name: "Chips", image: "/images/chips.jpg", description: "Healthy Healthy", path: "/chips" },
];

const Categories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const itemsPerView = 3;

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + itemsPerView >= categories.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, categories.length - itemsPerView) : prev - 1
    );
  };

  const handleCategoryClick = (path) => {
    navigate(path);
  };

  return (
    <section id="products" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4">Our Products</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our wide range of quality products carefully selected for you
          </p>
        </div>

        <div className="relative">
          {/* Desktop View - 3 cards */}
          <div className="hidden md:block">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon" 
                onClick={prevSlide}
                className="flex-shrink-0"
                aria-label="Previous products"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button> 

              <div className="flex-1 overflow-hidden">
                <div
                  className="flex gap-6 transition-transform duration-500 ease-out"
                  style={{
                    transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                  }}
                >
                  {categories.map((category) => (
                    <Card
                      key={category.id}
                      className="flex-shrink-0 w-[calc(33.333%-1rem)] border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                      onClick={() => handleCategoryClick(category.path)}
                    >
                      <CardContent className="p-0">
                        <div className="aspect-square overflow-hidden rounded-t-lg">
                          <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-2xl font-semibold text-primary mb-2">
                            {category.name}
                          </h3>
                          <p className="text-muted-foreground">
                            {category.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={nextSlide}
                className="flex-shrink-0"
                aria-label="Next products"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>

          {/* Mobile View - 1 card */}
          <div className="md:hidden">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentIndex((prev) => (prev === 0 ? categories.length - 1 : prev - 1))}
                aria-label="Previous product"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              <div className="flex-1 overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                  }}
                >
                  {categories.map((category) => (
                    <Card
                      key={category.id}
                      className="flex-shrink-0 w-full border-border cursor-pointer"
                      onClick={() => handleCategoryClick(category.path)}
                    >
                      <CardContent className="p-0">
                        <div className="aspect-square overflow-hidden rounded-t-lg">
                          <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-2xl font-semibold text-primary mb-2">
                            {category.name}
                          </h3>
                          <p className="text-muted-foreground">
                            {category.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentIndex((prev) => (prev + 1) % categories.length)}
                aria-label="Next product"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {categories.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-accent w-8"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to product ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;