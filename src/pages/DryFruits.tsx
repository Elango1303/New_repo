import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Phone, Crown, ChevronRight, Leaf, Truck, Shield, Award, Sparkles, Apple, Sun } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Product = {
  id: number;
  name: string;
  basePrice: number;
  description: string;
  category: string;
  emoji?: string;
  image: string;
};

const dryFruits: Product[] = [
  // Dates (use public images: /images/dryfruits/{id}.jpg)
 
  // Dry Fruits
  { id: 14, name: "DRY FIG MEDIUM", basePrice: 260, description: "Dry Fig Medium", category: "Dry Fruits", image: "/images/dry_fruits/dry_fig_fruit.jpg" },
  { id: 15, name: "DRY FIG FRUIT", basePrice: 270, description: "Dry Fig Fruit", category: "Dry Fruits", image: "/images/dry_fruits/dry_fig_medium.jpg" },
  { id: 16, name: "GOLDEN RAISINS", basePrice: 130, description: "Golden Raisins", category: "Dry Fruits", image: "/images/dry_fruits/Golden_raisins.jpg" },
  { id: 17, name: "MONAKKA RAISINS", basePrice: 120, description: "Monakka Raisins", category: "Dry Fruits", image: "/images/dry_fruits/manakka_rasins.jpg" },
  { id: 18, name: "GOLDEN RAISINS JUMBO", basePrice: 145, description: "Golden Raisins Jumbo", category: "Dry Fruits", image:"/images/dry_fruits/Golden_raisins.jpg" },
  { id: 19, name: "RAISINS BLACK", basePrice: 70, description: "Raisins Black", category: "Dry Fruits", image: "/images/dry_fruits/Raisins_black.jpg" },
  { id: 20, name: "DRY FRUITS MIX DICE", basePrice: 130, description: "Dry Fruits Mix Dice", category: "Dry Fruits", image:"/images/dry_fruits/dry_fruit_mixdice.jpg" },
  { id: 21, name: "DRY FRUITS PINEAPPLE", basePrice: 130, description: "Dry Fruits Pineapple", category: "Dry Fruits", image: "/images/dry_fruits/dry_frutit_pineapplejpg.jpg"},
  { id: 22, name: "DRY FRUITS MANGO", basePrice: 130, description: "Dry Fruits Mango", category: "Dry Fruits", image: "/images/dry_fruits/dry_fruit_mango.jpg"},
  { id: 23, name: "DRY FRUITS MIX SLICE", basePrice: 130, description: "Dry Fruits Mix Slice", category: "Dry Fruits", image: "/images/dry_fruits/mix_slice.jpg" },
  { id: 24, name: "DRY FRUITS PAPAYA", basePrice: 130, description: "Dry Fruits Papaya", category: "Dry Fruits", image: "/images/dry_fruits/dry_fruit_papaya.jpg" },
  { id: 25, name: "DRY FRUITS CANTALOUPE", basePrice: 130, description: "Dry Fruits Cantaloupe", category: "Dry Fruits", image: "/images/dry_fruits/cantaloupe.jpg" },
  { id: 26, name: "DRY FRUITS POMELO", basePrice: 130, description: "Dry Fruits Pomelo", category: "Dry Fruits", image: "/images/dry_fruits/pomelo.jpg" },
  { id: 27, name: "DRY FRUITS KIWI", basePrice: 130, description: "Dry Fruits Kiwi", category: "Dry Fruits", image: "/images/dry_fruits/kiwi.jpg" },
  { id: 28, name: "DRY FRUITS GINGER", basePrice: 130, description: "Dry Fruits Ginger", category: "Dry Fruits", image: "/images/dry_fruits/ginger.jpg" },
  { id: 29, name: "BLUE BERRY", basePrice: 216, description: "Blue Berry", category: "Dry Fruits", image: "/images/dry_fruits/blue%20berry.jpg" },
  { id: 30, name: "CANEBERRY", basePrice: 74, description: "Caneberry", category: "Dry Fruits", image: "/images/dry_fruits/caneberry.jpg" },
  { id: 31, name: "DRY PLUM", basePrice: 105, description: "Dry Plum", category: "Dry Fruits", image: "/images/dry_fruits/plum.jpg" },
  { id: 32, name: "PREMIUM DRY CHERRY", basePrice: 130, description: "Premium Dry Cherry", category: "Dry Fruits", image: "/images/dry_fruits/dry_Cherry.jpg"},
  { id: 33, name: "SUGAR AMLA", basePrice: 40, description: "Sugar Amla", category: "Dry Fruits", image: "/images/dry_fruits/sugar_amla.jpg"},
  { id: 34, name: "DRY CHERRIES PSEL", basePrice: 125, description: "Dry Cherries Psel", category: "Dry Fruits", image: "/images/dry_fruits/cherries_psel.jpg" },
  // MIXED
  { id: 35, name: "GRACE HONEY MIXED DRY FRUITS 400g", basePrice: 80, description: "Grace honey mixed dry fruits (400g)", category: "Mixed", image: "/images/dry_fruits/honey_mixed_400.jpg" },
  { id: 36, name: "GRACE HONEY MIXED DRY FRUITS 250g", basePrice: 84, description: "Grace honey mixed dry fruits (250g)", category: "Mixed", image: "/images/dry_fruits/honey_mixed_250.jpg" },
  { id: 37, name: "ZAZIO MIXED BERRIES", basePrice: 208, description: "Zazio mixed berries 250g", category: "Mixed", image: "/images/dry_fruits/zazio_mixed_berries.jpg" },
  { id: 38, name: "ZAZIO MIXED NUTS", basePrice: 208, description: "Zazio mixed nuts 250g", category: "Mixed", image: "/images/dry_fruits/zazio_mixed_nuts.jpg" },
  { id: 39, name: "DRY APRICOT POUCH", basePrice: 299, description: "Dry apricot pouch 250g", category: "Mixed", image: "/images/dry_fruits/dry_apricot_pouch.jpg" },
];

const features = [
  { icon: Leaf, title: "100% Natural", description: "No preservatives or additives" },
  { icon: Truck, title: "Fresh Delivery", description: "Premium quality delivered fresh" },
  { icon: Shield, title: "Quality Tested", description: "Lab-tested for purity" },
  { icon: Award, title: "Premium Grade", description: "Only the finest selection" },
];

const benefits = [
  { icon: Sun, title: "Natural Energy", description: "Rich in vitamins and minerals" },
  { icon: Sparkles, title: "Pure & Fresh", description: "No artificial preservatives" },
  { icon: Apple, title: "Health Benefits", description: "Nutrient-rich superfood" },
];

const DryFruits = () => {
  const [selectedGrams, setSelectedGrams] = useState<Record<number, number>>({});
  const [favorites, setFavorites] = useState(new Set<number>());

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) next.delete(productId);
      else next.add(productId);
      return next;
    });
  };

  const setGramsFor = (productId: number, grams: number) => {
    setSelectedGrams((prev) => ({ ...prev, [productId]: grams }));
  };

  const getPrice = (product: { basePrice: number }, grams?: number) => {
    const g = grams || 100;
    return Math.round(product.basePrice * (g / 100));
  };

  const contactWhatsApp = (productId: number) => {
    const product = dryFruits.find((p) => p.id === productId);
    if (!product) return;
    const grams = selectedGrams[productId] || 100;
    const price = getPrice(product, grams);
    const msg = `Hello, I'm interested in ${product.name} - ${grams}g (Total: ₹${price}). Please assist with ordering.`;
    const url = `https://wa.me/918888095594?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-white dark:from-slate-900">
      <Navbar />
      {/* Hero Section */}
<section className="relative h-[500px] md:h-[600px] overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-amber-800 via-yellow-700 to-orange-700">
    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
  </div>
  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>

  <div className="relative h-full flex items-center justify-center px-4">
    <div className="text-center text-white max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-6 border border-white/20">
        <span className="text-sm font-medium">Healthy & Premium Dry Fruits</span>
      </div>
      <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-200 via-orange-200 to-amber-200 bg-clip-text text-transparent">
        Nature’s Pure Goodness
      </h1>
      <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
        Explore our handpicked collection of premium dry fruits, nuts, and healthy snacks — pure, fresh, and delicious!
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
  <div className="absolute top-20 left-10 text-6xl opacity-20 animate-pulse">🍇</div>
  <div className="absolute bottom-20 right-20 text-5xl opacity-20 animate-pulse delay-300">🥜</div>
  <div className="absolute top-1/2 right-10 text-4xl opacity-20 animate-pulse delay-700">🌰</div>
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
              Why Choose Our Dry Fruits?
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Nature's goodness packed with nutrition
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
            Premium Dry Fruits Collection
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Handpicked and quality-tested dry fruits sourced from the finest farms
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dryFruits.map((product) => (
            <Card key={product.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-yellow-200 relative">
              <button
                onClick={() => toggleFavorite(product.id)}
                className="absolute top-4 right-4 z-10 bg-white/90 rounded-full p-2 hover:scale-110 transition-all duration-300 shadow-lg"
              >
                <Heart
                  className={`h-5 w-5 transition-all duration-300 ${favorites.has(product.id) ? 'fill-red-500 text-red-500' : 'text-slate-400 hover:text-red-500'}`}
                />
              </button>

              <div className="aspect-square overflow-hidden bg-gradient-to-br from-yellow-50 to-white dark:from-slate-700 dark:to-slate-600 relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_70%)]"></div>
                <div className="w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative z-10">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-w-[75%] max-h-[75%] object-contain"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                    />
                  ) : (
                    <div className="text-8xl">🍇</div>
                  )}
                </div>
              </div>

              <CardContent className="p-5">
                <h3 className="font-bold text-lg mb-1 text-slate-900 group-hover:text-yellow-600 transition-colors">{product.name}</h3>
                <p className="text-sm text-slate-600 mb-3">{product.description}</p>

                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">₹{getPrice(product, selectedGrams[product.id] || 100)}</span>
                  <span className="text-sm text-slate-500">/{(selectedGrams[product.id] || 100) >= 1000 ? `${(selectedGrams[product.id] || 100)/1000}kg` : `${selectedGrams[product.id] || 100}g`}</span>
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
                        className={`h-10 px-3 rounded-full text-sm font-semibold ${isSelected ? 'bg-yellow-600 text-white' : ''}`}
                      >
                        {g >= 1000 ? `${g/1000}kg` : `${g}g`}
                      </Button>
                    );
                  })}
                </div>

                <Button onClick={() => contactWhatsApp(product.id)} className="w-full rounded-full font-semibold bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                  <Phone className="mr-2 h-4 w-4" /> Contact WhatsApp
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
              <Leaf className="h-16 w-16 mx-auto mb-4 text-amber-100" />
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Healthy Snacking Made Easy
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Subscribe to our monthly dry fruits box and get fresh, premium selection delivered to your doorstep
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

export default DryFruits;
