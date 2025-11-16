// src/pages/Perfume.tsx
import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Star,
  Sprout,
  Truck,
  Shield,
  Crown,
  ChevronRight,
  Droplet,
  Sparkles,
  Phone,
  Plus,
  Minus,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Use the @ alias set in vite.config.ts


type PerfumeProduct = {
  id: number;
  name: string;
  basePrice: number;
  description: string;
  image?: string;
};

const perfumeProducts: PerfumeProduct[] = [
  { id: 1, name: "HUGO", basePrice: 4000, description: "HUGO", image: "src/assets/images/perfume/hugo.jpg" },
  { id: 2, name: "CALVIN KEVIN", basePrice: 3900, description: "CALVIN KEVIN PERFUME", image: "src/assets/images/perfume/calvin_kevin.jpg"  },
  { id: 3, name: "515 CHAMP", basePrice: 5000, description: "515 CHAMP", image: "src/assets/images/perfume/hugo.jpg"  },
  { id: 4, name: "ASDAAF", basePrice: 1949, description: "ASDAAF PERFUME", image: "src/assets/images/perfume/asdaaf.jpg"  },
  { id: 5, name: "EAU DE PARFUM", basePrice: 3500, description: "EAU DE PARFUM", image: "src/assets/images/perfume/eau de parfum.jpg"  },
  { id: 6, name: "YARA", basePrice: 500, description: "YARA PERFUME", image: "src/assets/images/perfume/yara.jpg"  },
  { id: 7, name: "OUD MOOD", basePrice: 2499, description: "OUD MOOD", image: "src/assets/images/perfume/oud_mood.jpg"  },
  { id: 8, name: "FERRARI", basePrice: 2999, description: "FERRARI PERFUME", image: "src/assets/images/perfume/ferrari_perfume.jpg"  },
  { id: 9, name: "BURBERRY", basePrice: 8450, description: "BURBERRY PERFUME", image: "src/assets/images/perfume/burberry.jpg"  },
  { id: 10, name: "MIDNIGHT BLUE", basePrice: 2000, description: "MIDNIGHT PERFUME", image: "src/assets/images/perfume/midnightblue.jpg"  },
  { id: 11, name: "SHAGHUF", basePrice: 2000, description: "SHAGHUF PERFUME", image: "src/assets/images/perfume/shaghuf.jpg"  },
  { id: 12, name: "SEMI WASHWASHAH", basePrice: 3400, description: "SEMI WASHWASHAH PERFUME", image: "src/assets/images/perfume/wash.jpg"  },
];

const features = [
  { icon: Crown, title: "Premium Quality", description: "Authentic branded perfumes" },
  { icon: Truck, title: "Fast Delivery", description: "Secure and quick shipping" },
  { icon: Shield, title: "100% Original", description: "Guaranteed authenticity" },
  { icon: Sparkles, title: "Luxury Collection", description: "Exclusive fragrances" },
];

const highlights = [
  { icon: Droplet, title: "Long Lasting", description: "Up to 12 hours of fragrance" },
  { icon: Star, title: "Premium Notes", description: "Finest quality ingredients" },
  { icon: Sprout, title: "Perfect Blend", description: "Expertly crafted scents" },
];

const Perfume: React.FC = () => {
  // store quantity per product as string (to match original UI that shows "1")
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

  const getPrice = (product: PerfumeProduct, quantity?: string | number) => {
    const qty = typeof quantity === "string" ? parseInt(quantity || "1", 10) : (quantity || 1);
    return product.basePrice * qty;
  };

  const contactWhatsApp = (productId: number) => {
    const product = perfumeProducts.find((p) => p.id === productId)!;
    const quantity = parseInt(selectedQuantity[productId] || "1", 10);
    const price = getPrice(product, quantity);
    const msg = `Hello, I'm interested in ${product.name} - Quantity: ${quantity} (Total: ₹${price}). Please assist with ordering.`;
    const url = `https://wa.me/918888095594?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50/30 via-pink-50/20 to-white dark:from-slate-900 dark:to-slate-800">
      <Navbar />
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-800 via-pink-700 to-rose-800">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>

        <div className="relative h-full flex items-center justify-center px-4">
          <div className="text-center text-white max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-6 border border-white/20">
              <Crown className="h-4 w-4 text-purple-300" />
              <span className="text-sm font-medium">Premium Fragrances</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-200 via-pink-200 to-rose-200 bg-clip-text text-transparent">
              Luxury Perfumes
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Discover our exclusive collection of premium fragrances from around the world
            </p>
            <Button
              size="lg"
              className="bg-white text-purple-900 hover:bg-purple-50 shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 rounded-full px-8 text-lg font-semibold group"
            >
              Explore Collection
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Floating Images */}
        <div className="absolute top-20 left-10 opacity-20 animate-pulse">
          <img src="/images/perfume/bottle.png" alt="perfume" className="w-14 h-14 object-contain" onError={(e)=>{ (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
        </div>
        <div className="absolute bottom-20 right-20 opacity-20 animate-pulse delay-300">
          <img src="/images/perfume/flower.png" alt="flower" className="w-16 h-16 object-contain" onError={(e)=>{ (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
        </div>
        <div className="absolute top-1/2 right-10 opacity-20 animate-pulse delay-700">
          <img src="/images/perfume/sparkle.png" alt="sparkle" className="w-12 h-12 object-contain" onError={(e)=>{ (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
        </div>
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
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-3 w-fit mb-4">
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

      {/* Highlights Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-700">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-purple-900 to-pink-900 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Why Choose Our Perfumes?
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Experience luxury and elegance in every bottle
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300"
                >
                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full p-4 w-fit mx-auto mb-4">
                    <Icon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-white">
                    {highlight.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {highlight.description}
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-900 to-pink-900 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            Luxury Collection
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Experience our exclusive range of premium fragrances
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {perfumeProducts.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-purple-200 dark:hover:border-purple-700 relative"
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

              <div className="aspect-square overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-700 dark:to-slate-600 relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.06)_0%,_transparent_70%)]"></div>
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 relative z-10"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : null}
                <div
                  className="w-full h-full flex items-center justify-center text-6xl relative z-10"
                  style={{ display: product.image ? "none" : "flex" }}
                >
                  🍇
                </div>
              </div>

              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1 text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{product.description}</p>
                  </div>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
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
                    className="h-10 w-10 rounded-full hover:bg-purple-50 dark:hover:bg-purple-900/20 border-2"
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
                    className="h-10 w-10 rounded-full hover:bg-purple-50 dark:hover:bg-purple-900/20 border-2"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <Button
                  onClick={() => contactWhatsApp(product.id)}
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
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
            <div className="relative z-10">
              <Crown className="h-16 w-16 mx-auto mb-4 text-purple-100" />
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Discover Your Signature Scent</h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join our exclusive perfume club and receive personalized fragrance recommendations
              </p>
              <Button size="lg" className="bg-white text-purple-900 hover:bg-purple-50 shadow-xl rounded-full px-8 text-lg font-semibold">
                Join Now & Save 15%
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Perfume;
