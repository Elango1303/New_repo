import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CupSoda, Phone, Leaf, Truck, Shield, Award, ChevronRight, Sparkles, Apple, Heart, Plus, Minus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Product {
  id: number;
  name: string;
  price: number; // RATE from sheet (per can/bottle)
  size: string;
  description: string;
  image?: string;
}

const juiceProducts: Product[] = [
  // MOGU MOGU
  {
    id: 1,
    name: "MOGU MOGU MELON",
    price: 70,
    size: "320ml",
    description: "Melon juice drink with nata de coco",
    image: "/images/juices/mogu_mogu_melon.jpg",
  },
  {
    id: 2,
    name: "MOGU MOGU ORANGE",
    price: 70,
    size: "320ml",
    description: "Orange juice drink with nata de coco",
    image: "/images/juices/mogu_mogu_orange.jpg",
  },
  {
    id: 3,
    name: "MOGU MOGU APPLE",
    price: 70,
    size: "320ml",
    description: "Apple juice drink with nata de coco",
    image: "/images/juices/mogu_mogu_apple.png",
  },
  {
    id: 4,
    name: "MOGU MOGU GRAPES",
    price: 70,
    size: "320ml",
    description: "Grape juice drink with nata de coco",
    image: "/images/juices/mogu_mogu_grapes.jpg",
  },
  {
    id: 5,
    name: "MOGU MOGU STRAWBERRY",
    price: 70,
    size: "320ml",
    description: "Strawberry juice drink with nata de coco",
    image: "/images/juices/mogu_mogu_strawberry.jpg",
  },
  // FRESA FRESHER
  {
    id: 6,
    name: "FRESA FRESHER LEMON",
    price: 90,
    size: "250ml",
    description: "Sparkling lemon drink",
    image: "/images/juices/fresa_fresher_lemon.png",
  },
  {
    id: 7,
    name: "FRESA FRESHER WATERMELON & STRAWBERRY",
    price: 90,
    size: "250ml",
    description: "Watermelon and strawberry drink",
    image: "/images/juices/fresa_fresher_watermelon_strawberry.png",
  },
  // RANI / COLA WITH DATES EXTRACT etc. (tins)
  {
    id: 8,
    name: "COLA WITH DATES EXTRACT",
    price: 120,
    size: "240ml",
    description: "Cola drink with dates extract",
    image: "/images/juices/cola_dates_extract.jpg",
  },
  {
    id: 9,
    name: "RANI FLOAT PEACH",
    price: 120,
    size: "240ml",
    description: "Peach juice drink with real fruit pieces",
    image: "/images/juices/rani_float_peach.png",
  },
  {
    id: 10,
    name: "RANI FLOAT GUAVA",
    price: 120,
    size: "240ml",
    description: "Guava juice drink with real fruit pieces",
    image: "/images/juices/rani_float_guava.jpg",
  },
  {
    id: 11,
    name: "RANI FLOAT MANGO",
    price: 120,
    size: "240ml",
    description: "Mango juice drink with real fruit pieces",
    image: "/images/juices/rani_float_mango.png",
  },
  {
    id: 12,
    name: "RANI FLOAT PINEAPPLE",
    price: 120,
    size: "240ml",
    description: "Pineapple juice drink with real fruit pieces",
    image: "/images/juices/rani_float_pineapple.png",
  },
  {
    id: 13,
    name: "RANI FLOAT STRAWBERRY BANANA",
    price: 120,
    size: "240ml",
    description: "Strawberry banana juice drink with real fruit pieces",
    image: "/images/juices/rani_float_strawberry_banana.png",
  },
  {
    id: 14,
    name: "RANI FLOAT ORANGE",
    price: 120,
    size: "240ml",
    description: "Orange juice drink with real fruit pieces",
    image: "/images/juices/rani_float_orange.jpg",
  },
  // REDBULL / ENERGY DRINKS (subset)
  {
    id: 15,
    name: "REDBULL ENERGY DRINK",
    price: 299,
    size: "250ml",
    description: "Classic Red Bull energy drink",
    image: "/images/juices/redbull_energy_drink.jpg",
  },
  {
    id: 16,
    name: "MONSTER ENERGY",
    price: 125,
    size: "350ml",
    description: "Monster energy drink",
    image: "/images/juices/monster_energy.jpg",
  },
];

const features = [
  { icon: Leaf, title: "100% Natural", description: "Real fruit juices" },
  { icon: Truck, title: "Fresh Delivery", description: "Premium quality delivered" },
  { icon: Shield, title: "Quality Tested", description: "Lab-tested for purity" },
  { icon: Award, title: "Premium Selection", description: "Finest beverages" },
];

const benefits = [
  { icon: Sparkles, title: "Refreshing", description: "Perfect for any time" },
  { icon: Apple, title: "Natural Flavors", description: "Real fruit goodness" },
  { icon: Heart, title: "Energy Boost", description: "Energizing beverages" },
];

const Juices = () => {
  const [selectedQuantity, setSelectedQuantity] = useState<Record<number, string>>({});
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) newFavorites.delete(productId);
      else newFavorites.add(productId);
      return newFavorites;
    });
  };

  const incrementQuantity = (productId: number) => {
    const current = parseInt(selectedQuantity[productId] || "1", 10);
    if (current < 50) {
      setSelectedQuantity((prev) => ({ ...prev, [productId]: String(current + 1) }));
    }
  };

  const decrementQuantity = (productId: number) => {
    const current = parseInt(selectedQuantity[productId] || "1", 10);
    if (current > 1) {
      setSelectedQuantity((prev) => ({ ...prev, [productId]: String(current - 1) }));
    }
  };

  const getPrice = (product: Product, quantity?: string | number) => {
    const qty = typeof quantity === "string" ? parseInt(quantity || "1", 10) : (quantity || 1);
    return product.price * qty;
  };

  const contactWhatsApp = (product: Product) => {
    const quantity = parseInt(selectedQuantity[product.id] || "1", 10);
    const totalPrice = getPrice(product, quantity);
    const msg = `Hello, I'm interested in ${product.name} (${product.size}) - Quantity: ${quantity} (Total: ₹${totalPrice}). Please assist with ordering.`;
    const url = `https://wa.me/918888095594?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50/40 via-cyan-50/20 to-white dark:from-slate-900 dark:to-slate-800">
      <Navbar />
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-800 via-cyan-700 to-blue-800">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
        
        <div className="relative h-full flex items-center justify-center px-4">
          <div className="text-center text-white max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-6 border border-white/20">
              <CupSoda className="h-4 w-4 text-sky-300" />
              <span className="text-sm font-medium">Refreshing Beverages</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-sky-200 via-cyan-200 to-blue-200 bg-clip-text text-transparent">
              Quench Your Thirst
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Discover our refreshing collection of fruit juices and energizing beverages from around the world
            </p>
            <Button 
              size="lg" 
              className="bg-white text-sky-900 hover:bg-sky-50 shadow-2xl hover:shadow-sky-500/20 transition-all duration-300 rounded-full px-8 text-lg font-semibold group"
            >
              Shop Now
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 text-6xl opacity-20 animate-pulse">🥤</div>
        <div className="absolute bottom-20 right-20 text-5xl opacity-20 animate-pulse delay-300">🍹</div>
        <div className="absolute top-1/2 right-10 text-4xl opacity-20 animate-pulse delay-700">🧃</div>
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
                  <div className="bg-gradient-to-br from-sky-500 to-cyan-500 rounded-xl p-3 w-fit mb-4">
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
      <section className="py-16 px-4 bg-gradient-to-r from-sky-50 to-cyan-50 dark:from-slate-800 dark:to-slate-700">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-sky-900 to-cyan-900 dark:from-sky-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Why Choose Our Beverages?
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Refreshing and energizing drinks for every moment
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
                  <div className="bg-gradient-to-br from-sky-100 to-cyan-100 dark:from-sky-900/30 dark:to-cyan-900/30 rounded-full p-4 w-fit mx-auto mb-4">
                    <Icon className="h-8 w-8 text-sky-600 dark:text-sky-400" />
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-sky-900 to-cyan-900 dark:from-sky-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Juices & Energy Drinks
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Refreshing fruit drinks and energizing beverages from around the world
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {juiceProducts.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-sky-200 dark:hover:border-sky-700 relative"
            >
              {/* Favorite Button */}
              <button
                onClick={() => toggleFavorite(product.id)}
                className="absolute top-4 right-4 z-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full p-2 hover:scale-110 transition-all duration-300 shadow-lg"
              >
                <Heart
                  className={`h-5 w-5 transition-all duration-300 ${
                    favorites.has(product.id) ? "fill-red-500 text-red-500" : "text-slate-400 hover:text-red-500"
                  }`}
                />
              </button>

              <div className="aspect-square overflow-hidden bg-gradient-to-br from-sky-50 to-cyan-50 dark:from-slate-700 dark:to-slate-600 relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_70%)]"></div>
                <div className="w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative z-10">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-w-[75%] max-h-[75%] object-contain"
                    />
                  ) : (
                    <CupSoda className="h-16 w-16 text-sky-500" />
                  )}
                </div>
              </div>

              <CardContent className="p-5">
                <h3 className="font-bold text-lg mb-1 text-slate-900 dark:text-white">
                  {product.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                  {product.description}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                  Size: {product.size}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">
                    ₹{getPrice(product, selectedQuantity[product.id] || 1)}
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">/unit</span>
                </div>
              </CardContent>

              <CardFooter className="p-5 pt-0 flex flex-col gap-3">
                {/* Quantity Selector with + and - buttons */}
                <div className="flex items-center gap-2 w-full">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => decrementQuantity(product.id)}
                    className="h-10 w-10 rounded-full hover:bg-sky-50 dark:hover:bg-sky-900/20 border-2"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 text-center">
                    <span className="text-xl font-bold text-slate-900 dark:text-white">
                      {selectedQuantity[product.id] || 1}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => incrementQuantity(product.id)}
                    className="h-10 w-10 rounded-full hover:bg-sky-50 dark:hover:bg-sky-900/20 border-2"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <Button
                  onClick={() => contactWhatsApp(product)}
                  className="w-full rounded-full font-semibold transition-all duration-300 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
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
          <div className="bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-600 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
            <div className="relative z-10">
              <CupSoda className="h-16 w-16 mx-auto mb-4 text-sky-100" />
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Stay Refreshed
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Subscribe to our monthly beverage box and get fresh drinks delivered to your doorstep
              </p>
              <Button 
                size="lg"
                className="bg-white text-sky-900 hover:bg-sky-50 shadow-xl rounded-full px-8 text-lg font-semibold"
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

export default Juices;
