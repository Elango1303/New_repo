import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flame, Shield, Award, Truck, Phone, Leaf, ChevronRight, Sparkles, Apple, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Product {
  id: number;
  name: string;
  basePrice: number; // price per 100g from sheet
  description: string;
  image?: string;
}

const spicesProducts: Product[] = [
  {
    id: 1,
    name: "CARDAMOM",
    basePrice: 600,
    description: "Premium green cardamom pods",
    image: undefined,
  },
  {
    id: 2,
    name: "CINNAMON STICK",
    basePrice: 75,
    description: "Whole cinnamon sticks",
    image: "/images/spices/cinnamon_stick.jpg",
  },
  {
    id: 3,
    name: "CINNAMON ROLL",
    basePrice: 105,
    description: "Rolled cinnamon",
    image: "/images/spices/cinnamon_roll.jpeg",
  },
  {
    id: 4,
    name: "BRIYANI LEAF",
    basePrice: 34,
    description: "Bay leaf for biryani and curries",
    image: "/images/spices/biriyani_leaf.jpg",
  },
  {
    id: 5,
    name: "GRAMPU",
    basePrice: 200,
    description: "Whole cloves (grambu)",
    image: "/images/spices/grampu.jpg",
  },
  {
    id: 6,
    name: "KALPASI",
    basePrice: 110,
    description: "Black stone flower (kalpasi)",
    image: "/images/spices/kalpasi.png",
  },
  {
    id: 7,
    name: "THAKKOLAM",
    basePrice: 105,
    description: "Star anise (thakkolam)",
    image: "/images/spices/thakkolam.jpg",
  },
  {
    id: 8,
    name: "JATHI PATHRI",
    basePrice: 380,
    description: "Mace spice (jathi pathri)",
    image: "/images/spices/jathi_pathri.jpg",
  },
  {
    id: 9,
    name: "BLACK PEPPER",
    basePrice: 98,
    description: "Whole black peppercorns",
    image: "/images/spices/black_pepper.jpg",
  },
];

const features = [
  { icon: Leaf, title: "100% Natural", description: "Pure spices, no additives" },
  { icon: Truck, title: "Fresh Delivery", description: "Premium quality delivered" },
  { icon: Shield, title: "Quality Tested", description: "Lab-tested for purity" },
  { icon: Award, title: "Premium Grade", description: "Only the finest spices" },
];

const benefits = [
  { icon: Sparkles, title: "Rich Aroma", description: "Intense and authentic flavors" },
  { icon: Apple, title: "Premium Quality", description: "Finest spice selection" },
  { icon: Heart, title: "Health Benefits", description: "Natural and nutritious" },
];

const Spices = () => {
  const [selectedGrams, setSelectedGrams] = useState<Record<number, number>>({});

  const setGramsFor = (productId: number, grams: number) => {
    setSelectedGrams((prev) => ({ ...prev, [productId]: grams }));
  };

  const getPrice = (product: Product, grams?: number) => {
    const g = grams || 100;
    const raw = product.basePrice * (g / 100);
    return Math.round(raw);
  };

  const contactWhatsApp = (productId: number) => {
    const product = spicesProducts.find((p) => p.id === productId);
    if (!product) return;
    const grams = selectedGrams[productId] || 100;
    const price = getPrice(product, grams);
    const msg = `Hello, I'm interested in ${product.name} - ${grams}g (Total: ₹${price}). Please assist with ordering.`;
    const url = `https://wa.me/918888095594?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/30 via-amber-50/20 to-white dark:from-slate-900 dark:to-slate-800">
      <Navbar />
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-800 via-amber-700 to-red-800">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
        
        <div className="relative h-full flex items-center justify-center px-4">
          <div className="text-center text-white max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-6 border border-white/20">
              <Flame className="h-4 w-4 text-orange-300" />
              <span className="text-sm font-medium">Premium Aromatic Spices</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-200 via-amber-200 to-red-200 bg-clip-text text-transparent">
              Spice Up Your Kitchen
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Discover our premium collection of aromatic spices carefully selected for rich flavor and aroma
            </p>
            <Button 
              size="lg" 
              className="bg-white text-orange-900 hover:bg-orange-50 shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 rounded-full px-8 text-lg font-semibold group"
            >
              Shop Now
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 text-6xl opacity-20 animate-pulse">🌶️</div>
        <div className="absolute bottom-20 right-20 text-5xl opacity-20 animate-pulse delay-300">🧄</div>
        <div className="absolute top-1/2 right-10 text-4xl opacity-20 animate-pulse delay-700">🌿</div>
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
                  <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl p-3 w-fit mb-4">
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
      <section className="py-16 px-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-slate-800 dark:to-slate-700">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-orange-900 to-amber-900 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">
              Why Choose Our Spices?
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Premium quality for authentic flavors
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
                  <div className="bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 rounded-full p-4 w-fit mx-auto mb-4">
                    <Icon className="h-8 w-8 text-orange-600 dark:text-orange-400" />
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-900 to-amber-900 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">
            Aromatic Spices
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Premium spices carefully selected for rich flavor and aroma
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {spicesProducts.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-orange-200 dark:hover:border-orange-700 relative"
            >
              <div className="aspect-square overflow-hidden bg-gradient-to-br from-orange-50 to-amber-50 dark:from-slate-700 dark:to-slate-600 relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_70%)]"></div>
                <div className="w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative z-10">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-w-[75%] max-h-[75%] object-contain"
                    />
                  ) : (
                    <div className="text-8xl">🌶️</div>
                  )}
                </div>
              </div>

              <CardContent className="p-5">
                <h3 className="font-bold text-lg mb-1 text-slate-900 dark:text-white">
                  {product.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  {product.description}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                    ₹{getPrice(product, selectedGrams[product.id] || 100)}
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    /{(selectedGrams[product.id] || 100) >= 1000
                      ? `${(selectedGrams[product.id] || 100) / 1000}kg`
                      : `${selectedGrams[product.id] || 100}g`}
                  </span>
                </div>
              </CardContent>

              <CardFooter className="p-5 pt-0 flex flex-col gap-3">
                <div className="flex items-center gap-2 w-full flex-wrap">
                  {[100, 200, 250, 500, 1000].map((g) => {
                    const isSelected = (selectedGrams[product.id] || 100) === g;
                    return (
                      <Button
                        key={g}
                        variant={isSelected ? undefined : "outline"}
                        onClick={() => setGramsFor(product.id, g)}
                        className={`h-10 px-3 rounded-full text-sm font-semibold ${
                          isSelected ? "bg-orange-600 text-white" : ""
                        }`}
                      >
                        {g >= 1000 ? `${g / 1000}kg` : `${g}g`}
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
          <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-red-600 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
            <div className="relative z-10">
              <Flame className="h-16 w-16 mx-auto mb-4 text-orange-100" />
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Elevate Your Cooking
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Subscribe to our monthly spice box and get fresh, premium spices delivered to your doorstep
              </p>
              <Button 
                size="lg"
                className="bg-white text-orange-900 hover:bg-orange-50 shadow-xl rounded-full px-8 text-lg font-semibold"
              >
                Subscribe & Save 20%
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Spices;
