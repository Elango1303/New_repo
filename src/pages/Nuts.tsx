import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Star, Leaf, Truck, Shield, Award, ChevronRight, Flame, Apple, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CashewImg from "@/assets/Cashew.png";
import PistaImg from "@/assets/Pista.png";
import AlmondImg from "@/assets/Almond.png";
import NutsImg from "@/assets/nuts.jpg";
import MixedImg from "@/assets/mixed.png";
// product list: basePrice is price per 100g
const nutsProducts = [
  // Cashew
  { id: 1, name: "GARLIC CHILLI KO", basePrice: 160, description: "Garlic chilli flavored cashew", image: "src/assets/images/nuts/cashew_ko.jpg " },
  { id: 2, name: "CHILLI CASHEW", basePrice: 185, description: "Spicy chilli cashew", image: "src/assets/images/nuts/cashew_spicy.jpg " },
  { id: 3, name: "PERI PERI", basePrice: 160, description: "Peri peri roasted cashew", image: "src/assets/images/nuts/periper.jpg " },
  { id: 4, name: "GREEN CHILLI", basePrice: 160, description: "Green chilli cashew", image: "src/assets/images/nuts/green_chill.jpg " },
  { id: 5, name: "TOMATO CHILLI", basePrice: 160, description: "Tomato chilli cashew", image: "src/assets/images/nuts/tomato_chilli.jpg " },
  { id: 6, name: "CASHEW SPICY ROASTED", basePrice: 160, description: "Spicy roasted cashew", image: "src/assets/images/nuts/cashew_spicy.jpg " },
  { id: 7, name: "CASHEW SALT ROASTED", basePrice: 160, description: "Salt roasted cashew", image: CashewImg },
  { id: 8, name: "CASHEW CHEESE ROASTED", basePrice: 160, description: "Cheese roasted cashew", image: CashewImg },
  { id: 9, name: "CASHEW BBQ ROASTED", basePrice: 160, description: "BBQ roasted cashew", image: "src/assets/images/nuts/cashew_bbq.jpg " },
  { id: 10, name: "GARLIC CHILLI PSEL", basePrice: 185, description: "Garlic chilli special", image: "src/assets/images/nuts/gralic_chilli_psel.jpg " },
  { id: 11, name: "CASHEW PEPPER", basePrice: 185, description: "Pepper cashew", image: "src/assets/images/nuts/cashewpepper.jpg " },
  { id: 12, name: "CASHEW MIX", basePrice: 160, description: "Mixed cashew pack", image: "src/assets/images/nuts/cashew_mix.jpg " },
  { id: 13, name: "CASHEW PEPPER ROASTED", basePrice: 160, description: "Pepper roasted cashew", image: "src/assets/images/nuts/cashewpepper.jpg " },
  { id: 14, name: "W180", basePrice: 145, description: "W180 grade cashew", image: "src/assets/images/nuts/w180.jpg " },
  { id: 15, name: "PLAIN KAJU", basePrice: 170, description: "Plain kaju", image: "src/assets/images/nuts/plain_kaju.jpg " },
  { id: 16, name: "CASHEW SPLIT KO", basePrice: 116, description: "Split cashew", image: "src/assets/images/nuts/cashew_ko.jpg "  },
  { id: 17, name: "CASHEW BORMA", basePrice: 130, description: "Cashew borma", image: "src/assets/images/nuts/cashew_borma.jpg " },

  // Pista
  { id: 18, name: "PLAIN RAW PISTACHIO", basePrice: 194, description: "Plain raw pista", image: "src/assets/images/nuts/plain_pistachio.jpg " },
  { id: 19, name: "PISTACHIO WITHOUT SHELL", basePrice: 268, description: "Pistachio without shell", image: "src/assets/images/nuts/without_shell.jpg " },
  { id: 20, name: "PISTACHIO SALTED", basePrice: 190, description: "Salted pistachio", image: "src/assets/images/nuts/pistachio_salt.jpg " },
  { id: 21, name: "PISTACHIO LEMON", basePrice: 190, description: "Lemon pistachio", image: "src/assets/images/nuts/pistachio_lemon.jpg " },
  { id: 22, name: "PISTACHIO MIX", basePrice: 190, description: "Pistachio mix", image: "src/assets/images/nuts/mix.jpg " },

  // Almond
  { id: 23, name: "PREMIUM RAW ALMOND", basePrice: 130, description: "Premium raw almond", image: "src/assets/images/nuts/raw_almond.jpg " },
  { id: 24, name: "USA SMALL ALMOND", basePrice: 110, description: "USA small almond", image: "src/assets/images/nuts/usa_almond.jpg " },
  { id: 25, name: "ALMOND SALT ROASTED", basePrice: 140, description: "Salt roasted almond", image: "src/assets/images/nuts/raw_almond.jpg " },

  // Hazel
  { id: 26, name: "PREMIUM WHOLE HAZELNUT", basePrice: 215, description: "Premium whole hazelnut", image: "src/assets/images/nuts/hazel_nut.jpg " },

  // Walnut
  { id: 27, name: "WALNUT CHILLIE", basePrice: 250, description: "Walnut chillie", image: "src/assets/images/nuts/walnut_chillie.jpg " },

  // Others / Seeds
  { id: 28, name: "PUMPKIN SEEDS", basePrice: 75, description: "Pumpkin seeds", image: "src/assets/images/nuts/pumpkinsseeds.jpg " },
  { id: 29, name: "SUNFLOWER SEEDS", basePrice: 50, description: "Sunflower seeds", image: "src/assets/images/nuts/sunflower_seeds.jpg " },
  { id: 30, name: "WATERMELON SEEDS", basePrice: 124, description: "Watermelon seeds", image: "src/assets/images/nuts/watermelon_seeds.jpg " },
  { id: 31, name: "CHIA SEEDS", basePrice: 60, description: "Chia seeds", image: "src/assets/images/nuts/chia_seed.jpg " },
  { id: 32, name: "FLAX SEEDS", basePrice: 30, description: "Flax seeds", image: "src/assets/images/nuts/flaw_seeds.jpg " },
  { id: 33, name: "PLAIN NUTS MIX", basePrice: 150, description: "Plain nuts mix", image: "src/assets/images/nuts/plain_nuts_mix.jpg " },
  { id: 34, name: "MACADAMIA", basePrice: 210, description: "Premium macadamia nuts", image: "src/assets/images/nuts/macadamia.jpg " },
];

const features = [
  { icon: Leaf, title: "100% Natural", description: "No artificial preservatives or additives" },
  { icon: Truck, title: "Fresh Delivery", description: "Farm-fresh nuts delivered daily" },
  { icon: Shield, title: "Quality Tested", description: "Lab-tested for purity and quality" },
  { icon: Award, title: "Premium Grade", description: "Only the finest A-grade nuts" },
];

const healthBenefits = [
  { icon: Flame, title: "High Energy", description: "Rich in healthy fats and calories" },
  { icon: Apple, title: "Nutrient Dense", description: "Packed with vitamins and minerals" },
  { icon: Heart, title: "Heart Healthy", description: "Supports cardiovascular health" },
];

const Nuts = () => {
  // selectedGrams: store gram selection per product (defaults to 100g)
  const [selectedGrams, setSelectedGrams] = useState({});
  const [favorites, setFavorites] = useState(new Set());

  const toggleFavorite = (productId) => {
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

  const setGramsFor = (productId, grams) => {
    setSelectedGrams((prev) => ({ ...prev, [productId]: grams }));
  };

  const getPrice = (product, grams) => {
    const g = grams || 100;
    // price = basePrice per 100g * (grams / 100)
    const raw = product.basePrice * (g / 100);
    return Math.round(raw);
  };

  const contactWhatsApp = (productId) => {
    const product = nutsProducts.find((p) => p.id === productId);
    const grams = selectedGrams[productId] || 100;
    const price = getPrice(product, grams);
    const msg = `Hello, I'm interested in ${product.name} - ${grams}g (Total: ₹${price}). Please assist with ordering.`;
    const url = `https://wa.me/918888095594?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/30 via-emerald-50/20 to-white dark:from-slate-900 dark:to-slate-800">
      <Navbar />
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-800 via-emerald-700 to-teal-800">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
        
        <div className="relative h-full flex items-center justify-center px-4">
          <div className="text-center text-white max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-6 border border-white/20">
              <Leaf className="h-4 w-4 text-green-300" />
              <span className="text-sm font-medium">100% Natural & Nutritious</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-200 via-emerald-200 to-teal-200 bg-clip-text text-transparent">
              Nature's Powerhouse
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Premium quality nuts packed with protein, healthy fats, and essential nutrients for your wellness
            </p>
            <Button 
              size="lg" 
              className="bg-white text-green-900 hover:bg-green-50 shadow-2xl hover:shadow-green-500/20 transition-all duration-300 rounded-full px-8 text-lg font-semibold group"
            >
              Shop Now
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 text-6xl opacity-20 animate-pulse">🥜</div>
        <div className="absolute bottom-20 right-20 text-5xl opacity-20 animate-pulse delay-300">🌰</div>
        <div className="absolute top-1/2 right-10 text-4xl opacity-20 animate-pulse delay-700">🍃</div>
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
                  <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl p-3 w-fit mb-4">
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

      {/* Health Benefits Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-700">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-green-900 to-emerald-900 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
              Why Choose Our Nuts?
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Packed with nutrition and health benefits
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {healthBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300"
                >
                  <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-full p-4 w-fit mx-auto mb-4">
                    <Icon className="h-8 w-8 text-green-600 dark:text-green-400" />
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-900 to-emerald-900 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
            Premium Nuts Collection
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Handpicked and quality-tested nuts sourced from the finest farms around the world
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {nutsProducts.map((product) => (
            <Card 
              key={product.id} 
              className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-green-200 dark:hover:border-green-700 relative"
            >
              {/* Badge */}
              {/* optional badge removed - products use basePrice only */}
              {/* Badge removed */}

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

              <div className="aspect-square overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-700 dark:to-slate-600 relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_70%)]"></div>
                <div className="w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative z-10">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="max-w-3/4 max-h-3/4 object-contain" />
                  ) : (
                    <div className="text-8xl">🥜</div>
                  )}
                </div>
              </div>

              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1 text-slate-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                      {product.description}
                    </p>
                    <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold px-2 py-1 rounded-full">
                      Select size below
                    </span>
                  </div>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    ₹{getPrice(product, selectedGrams[product.id] || 100)}
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">/{(selectedGrams[product.id] || 100) >= 1000 ? `${(selectedGrams[product.id] || 100)/1000}kg` : `${selectedGrams[product.id] || 100}g`}</span>
                </div>
              </CardContent>

              <CardFooter className="p-5 pt-0 flex flex-col gap-3">
                {/* Gram size selector */}
                <div className="flex items-center gap-2 w-full flex-wrap">
                  {[100, 200, 250, 500, 1000].map((g) => {
                    const isSelected = (selectedGrams[product.id] || 100) === g;
                    return (
                      <Button
                        key={g}
                        variant={isSelected ? undefined : "outline"}
                        onClick={() => setGramsFor(product.id, g)}
                        className={`h-10 px-3 rounded-full text-sm font-semibold ${isSelected ? "bg-green-600 text-white" : ""}`}
                      >
                        {g >= 1000 ? `${g/1000}kg` : `${g}g`}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  onClick={() => contactWhatsApp(product.id)}
                  className={`w-full rounded-full font-semibold transition-all duration-300 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 hover:shadow-lg hover:shadow-green-500/30`}
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
          <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
            <div className="relative z-10">
              <Leaf className="h-16 w-16 mx-auto mb-4 text-green-100" />
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Healthy Snacking Made Easy
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Subscribe to our monthly nut box and get fresh, premium nuts delivered to your doorstep
              </p>
              <Button 
                size="lg"
                className="bg-white text-green-900 hover:bg-green-50 shadow-xl rounded-full px-8 text-lg font-semibold"
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

export default Nuts;