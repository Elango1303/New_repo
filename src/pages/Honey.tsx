import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplet, Shield, Award, Truck, Phone, Leaf, ChevronRight, Sparkles, Apple, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Product {
  id: number;
  name: string;
  basePrice: number; // price per 100g from sheet (approx; original is per bottle)
  description: string;
  image?: string;
}

const honeyProducts: Product[] = [
  {
    id: 1,
    name: "APIS HIMALAYA HONEY 500g",
    basePrice: 65,
    description: "Apis Himalaya pure honey 500g",
    image: "/images/honey/apis_himalaya_500g.jpg",
  },
  {
    id: 2,
    name: "WAYANAD PREMIUM HONEY 500g",
    basePrice: 102,
    description: "Wayanad premium pure natural honey 500g",
    image: "/images/honey/wayanad_premium_500g.jpg",
  },
  {
    id: 3,
    name: "ROSH HONEY 500g",
    basePrice: 130,
    description: "Rosh honey 500g",
    image: "/images/honey/rosh_honey_500g.png",
  },
  {
    id: 4,
    name: "WAYANAD PREMIUM HONEY 240g",
    basePrice: 108,
    description: "Wayanad premium natural honey 240g",
    image: "/images/honey/wayanad_premium_500g.jpg",
  },
  {
    id: 5,
    name: "APIS HIMALAYA HONEY 225g",
    basePrice: 73,
    description: "Apis Himalaya honey 225g",
    image: "/images/honey/apis_himalaya_225g.jpg",
  },
  {
    id: 6,
    name: "WAYANAD PREMIUM HONEY 140g",
    basePrice: 114,
    description: "Wayanad premium honey 140g",
    image: "/images/honey/wayanad_premium_500g.jpg",
  },
  {
    id: 7,
    name: "BGOOD WESTERN GHATS HONEY 120g",
    basePrice: 67,
    description: "Bgood Western Ghats heritage honey 120g",
    image: "/images/honey/bgood_western_ghats_120g.png",
  },
  {
    id: 8,
    name: "BGOOD WESTERN GHATS HONEY 50g",
    basePrice: 78,
    description: "Bgood Western Ghats heritage honey 50g",
    image: undefined,
  },
  {
    id: 9,
    name: "ALSHIFA NATURAL FLORA HONEY 30g",
    basePrice: 366,
    description: "Alshifa natural flora honey 30g",
    image: undefined,
  },
];

const features = [
  { icon: Leaf, title: "100% Natural", description: "Pure honey, no additives" },
  { icon: Truck, title: "Fresh Delivery", description: "Premium quality delivered fresh" },
  { icon: Shield, title: "Quality Tested", description: "Lab-tested for purity" },
  { icon: Award, title: "Premium Grade", description: "Only the finest honey" },
];

const benefits = [
  { icon: Sparkles, title: "Natural Sweetener", description: "Healthy alternative to sugar" },
  { icon: Apple, title: "Rich in Nutrients", description: "Packed with vitamins" },
  { icon: Heart, title: "Health Benefits", description: "Supports wellness" },
];

const Honey = () => {
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
    const product = honeyProducts.find((p) => p.id === productId);
    if (!product) return;
    const grams = selectedGrams[productId] || 100;
    const price = getPrice(product, grams);
    const msg = `Hello, I'm interested in ${product.name} - approx ${grams}g (Total: ₹${price}). Please assist with ordering.`;
    const url = `https://wa.me/918888095594?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50/40 via-amber-50/20 to-white dark:from-slate-900 dark:to-slate-800">
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
              <Droplet className="h-4 w-4 text-amber-300" />
              <span className="text-sm font-medium">100% Pure & Natural</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-200 via-yellow-200 to-orange-200 bg-clip-text text-transparent">
              Nature's Golden Nectar
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Discover our premium collection of pure, natural honey from trusted brands and regions
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
        <div className="absolute top-20 left-10 text-6xl opacity-20 animate-pulse">🍯</div>
        <div className="absolute bottom-20 right-20 text-5xl opacity-20 animate-pulse delay-300">🐝</div>
        <div className="absolute top-1/2 right-10 text-4xl opacity-20 animate-pulse delay-700">🍯</div>
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
              Why Choose Our Honey?
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Pure sweetness with health benefits
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
            Pure Honey Collection
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Natural honey varieties from trusted brands and regions
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {honeyProducts.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-amber-200 dark:hover:border-amber-700 relative"
            >
              <div className="aspect-square overflow-hidden bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-slate-700 dark:to-slate-600 relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_70%)]"></div>
                <div className="w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative z-10">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-w-[75%] max-h-[75%] object-contain"
                    />
                  ) : (
                    <div className="text-8xl">🍯</div>
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
                  <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
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
                          isSelected ? "bg-amber-600 text-white" : ""
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
          <div className="bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
            <div className="relative z-10">
              <Droplet className="h-16 w-16 mx-auto mb-4 text-amber-100" />
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Sweeten Your Life Naturally
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Subscribe to our monthly honey box and get fresh, premium honey delivered to your doorstep
              </p>
              <Button 
                size="lg"
                className="bg-white text-amber-900 hover:bg-amber-50 shadow-xl rounded-full px-8 text-lg font-semibold"
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

export default Honey;
