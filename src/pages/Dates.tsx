import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Palmtree, Truck, Shield, Award, ChevronRight, Sun, Sparkles, Leaf, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DatesImg from "../assets/dates.jpg";

interface Product {
  id: number;
  name: string;
  basePrice: number;
  description: string;
  image: string;
}

const datesProducts: Product[] = [
  { id: 1, name: "AJWA PREMIUM", basePrice: 210, description: "AJWA premium dates", image: "/images/dates/ajwa_premiem.jpg" },
  { id: 2, name: "AJWA PSEL", basePrice: 200, description: "AJWA psel dates", image:  "/images/dates/Ajwa_psel.jpg" },
  { id: 3, name: "AJWA MEDIUM", basePrice: 150, description: "AJWA medium dates", image:  "/images/dates/ajwa_premiem.jpg" },
  { id: 4, name: "PREMIUM MEJDOOL JORDAN JUMBO", basePrice: 195, description: "Premium Medjool Jordan jumbo", image:  "/images/dates/mejdool_jordan.jpg" },
  { id: 5, name: "MEJDOOL JORDAN", basePrice: 180, description: "Medjool Jordan dates", image: DatesImg },
  { id: 6, name: "JORDAN MEDIUM", basePrice: 175, description: "Jordan medium dates", image:  "/images/dates/mejdool_jordan.jpg" },
  { id: 7, name: "PREMIUM MABROOM JUMBO", basePrice: 145, description: "Premium Mabroom jumbo", image:  "/images/dates/mabroom jumbo.jpg" },
  { id: 8, name: "PREMIUM SAGAI", basePrice: 125, description: "Premium Sagai dates", image:  "/images/dates/safai_dates.jpg" },
  { id: 9, name: "SAFAWI", basePrice: 85, description: "Safawi dates", image:  "/images/dates/safai_dates.jpg" },
  { id: 10, name: "MEJDOOL SMALL", basePrice: 60, description: "Medjool small dates", image:  "/images/dates/mejdool_small.jpg" },
  { id: 11, name: "FAZEL", basePrice: 50, description: "Fazel dates", image:  "/images/dates/ajwa_premiem.jpg" },
  { id: 12, name: "SEMI SAFAWI", basePrice: 40, description: "Semi Safawi dates", image:  "/images/dates/semi_safawi.jpg" },
];

interface Feature {
  icon: any;
  title: string;
  description: string;
}

const features: Feature[] = [
  { icon: Palmtree, title: "Premium Quality", description: "Handpicked dates" },
  { icon: Truck, title: "Quick Delivery", description: "Fresh delivery" },
  { icon: Shield, title: "Quality Tested", description: "Lab tested" },
  { icon: Award, title: "Premium Grade", description: "Best varieties" },
];

const benefits: Feature[] = [
  { icon: Sun, title: "Natural Energy", description: "Rich in natural sugars" },
  { icon: Sparkles, title: "Pure & Fresh", description: "No preservatives" },
  { icon: Leaf, title: "Health Benefits", description: "Nutrient-rich superfood" },
];

const Dates = () => {
  const [selectedGrams, setSelectedGrams] = useState<Record<number, number>>({});
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const setGramsFor = (productId: number, grams: number) => {
    setSelectedGrams((prev) => ({ ...prev, [productId]: grams }));
  };

  const getPrice = (product: Product, grams?: number) => {
    const g = grams || 100;
    const raw = product.basePrice * (g / 100);
    return Math.round(raw);
  };

  const contactWhatsApp = (productId: number) => {
    const product = datesProducts.find((p) => p.id === productId);
    const grams = selectedGrams[productId] || 100;
    const price = getPrice(product, grams);
    const msg = `Hello, I'm interested in ${product.name} - ${grams}g (Total: ₹${price}). Please assist with ordering.`;
    const url = `https://wa.me/918888095594?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/30 via-yellow-50/20 to-white dark:from-slate-900 dark:to-slate-800">
      <Navbar />
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-800 via-yellow-700 to-orange-800">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
        
        <div className="relative h-full flex items-center justify-center px-4">
          <div className="text-center text-white max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-6 border border-white/20">
              <Palmtree className="h-4 w-4 text-amber-300" />
              <span className="text-sm font-medium">Premium Quality Dates</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-200 via-yellow-200 to-orange-200 bg-clip-text text-transparent">
              Nature's Sweet Gift
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Discover our premium selection of dates from the finest palm groves around the world
            </p>
            <Button 
              size="lg" 
              className="bg-white text-amber-900 hover:bg-amber-50 shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 rounded-full px-8 text-lg font-semibold group"
            >
              Shop Now
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 text-6xl opacity-20 animate-pulse">🌴</div>
        <div className="absolute bottom-20 right-20 text-5xl opacity-20 animate-pulse delay-300">🌴</div>
        <div className="absolute top-1/2 right-10 text-4xl opacity-20 animate-pulse delay-700">🌴</div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4 -mt-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-slate-200 dark:border-slate-700"
                >
                  <div className="bg-gradient-to-br from-amber-500 to-yellow-500 rounded-xl p-3 w-fit mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-1 text-sm md:text-base">
                    {feature.title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-slate-800 dark:to-slate-700">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-amber-900 to-yellow-900 dark:from-amber-400 dark:to-yellow-400 bg-clip-text text-transparent">
              Why Choose Our Dates?
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Nature's sweetness with abundant health benefits
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300"
                >
                  <div className="bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 rounded-full p-4 w-fit mx-auto mb-4">
                    <Icon className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-white">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products Gallery */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-900 to-yellow-900 dark:from-amber-400 dark:to-yellow-400 bg-clip-text text-transparent">
            Premium Dates Collection
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Hand-picked and carefully selected dates from the finest palm groves
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {datesProducts.map((product) => (
            <Card 
              key={product.id} 
              className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-amber-200 dark:hover:border-amber-700 relative"
            >
              {/* Favorite Button */}
              <button
                onClick={() => toggleFavorite(product.id)}
                className="absolute top-4 right-4 z-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full p-2 hover:scale-110 transition-all duration-300 shadow-lg"
              >
                <Heart 
                  className={`h-5 w-5 transition-all duration-300 ${
                    favorites.has(product.id) 
                      ? "fill-red-500 text-red-500" 
                      : "text-slate-400 hover:text-red-500"
                  }`}
                />
              </button>

              <div className="aspect-square overflow-hidden bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-slate-700 dark:to-slate-600 relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_70%)]"></div>
                <div className="w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative z-10">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="max-w-3/4 max-h-3/4 object-contain" />
                  ) : (
                    <div className="text-8xl">🌴</div>
                  )}
                </div>
              </div>

              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1 text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                      {product.description}
                    </p>
                    <span className="inline-block bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-semibold px-2 py-1 rounded-full">
                      Select size below
                    </span>
                  </div>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                    ₹{getPrice(product, selectedGrams[product.id] || 100)}
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    /{(selectedGrams[product.id] || 100) >= 1000 ? `${(selectedGrams[product.id] || 100)/1000}kg` : `${selectedGrams[product.id] || 100}g`}
                  </span>
                </div>
              </CardContent>

              <CardFooter className="p-5 pt-0 flex flex-col gap-3">
                <div className="flex items-center gap-2 w-full flex-wrap">
                  {[100,200,250,500,1000].map((g) => {
                    const isSelected = (selectedGrams[product.id] || 100) === g;
                    return (
                      <Button
                        key={g}
                        variant={isSelected ? undefined : "outline"}
                        onClick={() => setGramsFor(product.id, g)}
                        className={`h-10 px-3 rounded-full text-sm font-semibold ${
                          isSelected ? "bg-amber-600 text-white" : ""
                        }`}
                      >
                        {g >= 1000 ? `${g/1000}kg` : `${g}g`}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  onClick={() => contactWhatsApp(product.id)}
                  className="w-full rounded-full font-semibold bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Contact WhatsApp
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
            <div className="relative z-10">
              <Palmtree className="h-16 w-16 mx-auto mb-4 text-amber-100" />
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Monthly Date Box
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Subscribe to our monthly selection of premium dates and save 15%
              </p>
              <Button 
                size="lg"
                className="bg-white text-amber-900 hover:bg-amber-50 shadow-xl rounded-full px-8 text-lg font-semibold"
              >
                Subscribe Now
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Dates;