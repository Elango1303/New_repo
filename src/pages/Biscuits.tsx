import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Phone,
  Heart,
  Star,
  Cookie,
  Truck,
  Shield,
  Award,
  Plus,
  Minus,
  ChevronRight,
  Wheat,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Import all product images
import nutellaImg from "@/assets/images/raphotos/nutella.jpg";
import lemonImg from "@/assets/images/raphotos/lemon_creams.jpg";

const biscuitsProducts = [
  { 
    id: 1, 
    name: "NUTELLA BISCUIT POUCH", 
    price: 780, 
    rating: 4.9,
    reviews: 245,
    description: "Hazelnut cream filled biscuits",
    badge: "Best Seller",
    weight: "276g",
    image: "src/assets/images/raphotos/nutella_biscuits.jpg"
  },
  { 
    id: 2, 
    name: "MUNCHEE LEMON FLAVOUR", 
    price: 60, 
    rating: 4.8,
    reviews: 198,
    description: "Refreshing lemon biscuits",
    weight: "200g",
    image: lemonImg
  },
  { 
    id: 3, 
    name: "MUNCHEE SUPER CREAM CRACKER", 
    price: 60, 
    rating: 4.7,
    reviews: 156,
    description: "Crispy cream crackers",
    weight: "200g",
    image: "src/assets/images/raphotos/cream_cracker.jpg"
  },
  { 
    id: 4, 
    name: "MUNCHEE MILK BISCUIT", 
    price: 20, 
    rating: 4.9,
    reviews: 203,
    description: "Classic milk biscuits",
    weight: "75g",
    image: "src/assets/images/raphotos/cream_cracker.jpg"
  },
  { 
    id: 5, 
    name: "MUNCHEE GINGER BISCUIT", 
    price: 20, 
    rating: 4.8,
    reviews: 287,
    description: "Spicy ginger flavor",
    weight: "75g",
    image: "src/assets/images/biscuits/muncheeginger.jpg"
  },
  { 
    id: 6, 
    name: "DIGESTIVE ORIGINAL", 
    price: 45, 
    rating: 4.6,
    reviews: 134,
    description: "Wholesome digestive biscuits",
    weight: "30g",
    image: "src/assets/images/raphotos/digestive_original.jpg"
  },
  { 
    id: 7, 
    name: "DIGESTIVE CARAMEL", 
    price: 49, 
    rating: 4.7,
    reviews: 98,
    description: "Caramel coated digestive",
    weight: "30g",
    image: "src/assets/images/raphotos/digestive2.jpg"
  },
  { 
    id: 8, 
    name: "DIGESTIVE ORIGINAL 400G", 
    price: 349, 
    rating: 4.8,
    reviews: 167,
    description: "Large pack digestive biscuits",
    badge: "Premium",
    weight: "400g",
    image: "src/assets/images/raphotos/digestive_original.jpg"
  },
  { 
    id: 9, 
    name: "SUGAR FREE CHOCOLATE BISCUIT", 
    price: 245, 
    rating: 4.7,
    reviews: 145,
    description: "Zero sugar chocolate cookies",
    badge: "Popular",
    weight: "190g",
    image: "src/assets/images/raphotos/sugarfree_tiiffany.jpg"
  },
  { 
    id: 10, 
    name: "SUGAR FREE LEMON BISCUIT", 
    price: 245, 
    rating: 4.6,
    reviews: 123,
    description: "Zero sugar lemon biscuits",
    weight: "190g",
    image: lemonImg
  },
  { 
    id: 11, 
    name: "SUGAR FREE ORANGE BISCUIT", 
    price: 245, 
    rating: 4.6,
    reviews: 118,
    description: "Zero sugar orange flavor",
    weight: "190g",
    image: "src/assets/images/biscuits/orange.jpg"
  },
  { 
    id: 12, 
    name: "BISCOFF BISCUIT", 
    price: 699, 
    rating: 4.9,
    reviews: 298,
    description: "Caramelized Belgian biscuits",
    badge: "Premium",
    weight: "250g",
    image: "src/assets/images/raphotos/lotus_biscoff.jpg"
  },
  { 
    id: 13, 
    name: "COFFEE JOY BISCUIT", 
    price: 59, 
    rating: 4.5,
    reviews: 87,
    description: "Coffee flavored biscuits",
    weight: "37g",
    image: "src/assets/images/biscuits/joy.jpg"
  },
  { 
    id: 14, 
    name: "MEIJI HELLO PANDA CHOCOLATE", 
    price: 99, 
    rating: 4.8,
    reviews: 234,
    description: "Chocolate cream filled biscuits",
    weight: "22g",
    image: "src/assets/images/raphotos/pand_hello_red.jpg"
  },
  { 
    id: 15, 
    name: "MEIJI HELLO PANDA STRAWBERRY", 
    price: 99, 
    rating: 4.7,
    reviews: 198,
    description: "Strawberry cream filled",
    weight: "42g",
    image: "src/assets/images/raphotos/panda_hellow_strawberry.jpg"
  },
  { 
    id: 16, 
    name: "MCOATY BREAKFAST OAT CHOCOLATE", 
    price: 250, 
    rating: 4.8,
    reviews: 156,
    description: "Oat cookies with chocolate chips",
    badge: "New",
    weight: "96g",
    image: "src/assets/images/biscuits/mcoaaty.jpg"
  },
  { 
    id: 17, 
    name: "MCOATY BREAKFAST OAT RAISINS", 
    price: 250, 
    rating: 4.7,
    reviews: 142,
    description: "Oat cookies with raisins",
    weight: "96g",
    image: "src/assets/images/biscuits/mcoaaty.jpg"
  },
  { 
    id: 18, 
    name: "GPR CHOCOLATE CHIPS COOKIES", 
    price: 250, 
    rating: 4.7,
    reviews: 167,
    description: "Authentic British recipe cookies",
    weight: "96g",
    image: "src/assets/images/biscuits/gpr.jpg"
  },
  { 
    id: 19, 
    name: "HARRODSON BLUEBERRY ALMOND", 
    price: 700, 
    rating: 4.9,
    reviews: 189,
    description: "Traditional blueberry butter cookies",
    badge: "Premium",
    weight: "338g",
    image: "src/assets/images/biscuits/harrodson.jpg"
  },
  { 
    id: 20, 
    name: "SAPPHIRE CHOCOCHIP COOKIES", 
    price: 350, 
    rating: 4.8,
    reviews: 201,
    description: "Premium chocolate chip cookies",
    weight: "350g",
    image: "src/assets/images/biscuits/sapphire.jpg"
  },
  { 
    id: 21, 
    name: "SAPPHIRE BUTTER COOKIES GOLD", 
    price: 350, 
    rating: 4.9,
    reviews: 223,
    description: "Gold collection butter cookies",
    badge: "Premium",
    weight: "350g",
    image: "src/assets/images/biscuits/sapphirebutter.jpg"
  },
  { 
    id: 22, 
    name: "SAPPHIRE BUTTER COOKIES SILVER", 
    price: 350, 
    rating: 4.8,
    reviews: 198,
    description: "Silver collection butter cookies",
    weight: "350g",
    image: "src/assets/images/biscuits/sapphiresilver.jpg"
  },
  { 
    id: 23, 
    name: "DANISA BUTTER COOKIES 200G", 
    price: 699, 
    rating: 4.9,
    reviews: 312,
    description: "Traditional Danish butter cookies",
    badge: "Best Seller",
    weight: "200g",
    image: "src/assets/images/biscuits/danisabutter.jpg"
  },
  { 
    id: 24, 
    name: "DANISA BUTTER COOKIES 375G", 
    price: 999, 
    rating: 4.9,
    reviews: 276,
    description: "Traditional Danish butter cookies",
    weight: "375g",
    image: "src/assets/images/biscuits/danisa375.jpg"
  },
  { 
    id: 25, 
    name: "DANISA BUTTER COOKIES 750G", 
    price: 1999, 
    rating: 4.9,
    reviews: 189,
    description: "Traditional Danish butter cookies",
    badge: "Premium",
    weight: "750g",
    image: "src/assets/images/biscuits/danisa750.jpg"
  },
  { 
    id: 26, 
    name: "AMERICANA PREMIUM BUTTER COOKIES", 
    price: 599, 
    rating: 4.8,
    reviews: 167,
    description: "Quality premium butter cookies",
    weight: "454g",
    image: "src/assets/images/biscuits/americana.jpg"
  },
  { 
    id: 27, 
    name: "HAPPY DAY ASSORTED BISCUITS", 
    price: 650, 
    rating: 4.7,
    reviews: 234,
    description: "Variety pack assorted biscuits",
    badge: "Popular",
    weight: "600g",
    image: "src/assets/images/biscuits/happyday.jpg"
  },
  { 
    id: 28, 
    name: "OMAN DATE BAR", 
    price: 35, 
    rating: 4.6,
    reviews: 145,
    description: "Date filled biscuit bar",
    weight: "21g",
    image: "src/assets/images/biscuits/oman.jpg"
  },
  { 
    id: 29, 
    name: "MAAMOUL OMAN DATE BISCUIT", 
    price: 25, 
    rating: 4.7,
    reviews: 178,
    description: "Traditional date filled cookies",
    weight: "20g",
    image: "src/assets/images/biscuits/maamouloman.jpg"
  },
  { 
    id: 30, 
    name: "MAAMOUL SAUDIA DATE BISCUIT", 
    price: 25, 
    rating: 4.7,
    reviews: 165,
    description: "Arabian date filled cookies",
    weight: "19g",
    image: "src/assets/images/biscuits/maamoulsaudia.jpg"
  },
];

const features = [
  { icon: Cookie, title: "Fresh Baked", description: "Daily fresh batches" },
  { icon: Truck, title: "Quick Delivery", description: "Same day delivery" },
  { icon: Shield, title: "Quality Tested", description: "ISO certified products" },
  { icon: Award, title: "Premium Grade", description: "Finest ingredients used" },
];

const benefits = [
  { icon: Wheat, title: "Quality Ingredients", description: "Premium wheat flour" },
  { icon: Sparkles, title: "No Preservatives", description: "All natural ingredients" },
  { icon: UtensilsCrossed, title: "Perfect Texture", description: "Crispy and crunchy" },
];

const Biscuits = () => {
  const [quantities, setQuantities] = useState({});
  const [favorites, setFavorites] = useState(new Set());

  const incrementQuantity = (productId) => {
    const current = parseInt(quantities[productId] || "1");
    if (current < 10) {
      setQuantities((prev) => ({ ...prev, [productId]: (current + 1).toString() }));
    }
  };

  const decrementQuantity = (productId) => {
    const current = parseInt(quantities[productId] || "1");
    if (current > 1) {
      setQuantities((prev) => ({ ...prev, [productId]: (current - 1).toString() }));
    }
  };

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

  const contactWhatsApp = (productId) => {
    const product = biscuitsProducts.find((p) => p.id === productId);
    if (!product) return;

    const qty = quantities[productId] || "1";
    const totalPrice = product.price * parseInt(qty);
    const msg = `Hello, I'm interested in ${product.name} - Quantity: ${qty} (Total: ₹${totalPrice}). Please assist with ordering.`;
    const url = `https://wa.me/918888095594?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/30 via-orange-50/20 to-white dark:from-slate-900 dark:to-slate-800">
      <Navbar />
      {/* Hero Section */}
      <section className="relative h-[280px] sm:h-[400px] md:h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-800 via-orange-700 to-red-800" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PC9zdmc+')] opacity-10 bg-repeat" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        
        <div className="relative h-full flex items-center justify-center px-4">
          <div className="text-center text-white max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-4 sm:mb-6 border border-white/20">
              <Cookie className="h-4 w-4 text-amber-300" />
              <span className="text-xs sm:text-sm font-medium">Fresh & Delicious</span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-amber-200 via-orange-200 to-red-200 bg-clip-text text-transparent">
              Baked with Love
            </h1>
            <p className="text-sm sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Discover our delightful range of cookies and biscuits, freshly baked to perfection
            </p>
            <Button 
              size="lg" 
              className="bg-white text-amber-900 hover:bg-amber-50 shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 rounded-full px-6 sm:px-8 text-sm sm:text-lg font-semibold group"
            >
              Shop Now
              <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 sm:py-12 px-4 -mt-12 sm:-mt-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-slate-200 dark:border-slate-700"
                >
                  <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl p-2 sm:p-3 w-fit mb-3 sm:mb-4">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-1 text-xs sm:text-base">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 px-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-700">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-amber-900 to-orange-900 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
              Why Choose Our Biscuits?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Perfectly baked for your delight
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300"
                >
                  <div className="bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-full p-4 w-fit mx-auto mb-4">
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
      <section className="py-12 sm:py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-amber-900 to-orange-900 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
            Fresh from the Oven
          </h2>
          <p className="text-xs sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A delightful selection of cookies and biscuits made with premium ingredients
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {biscuitsProducts.map((product) => (
            <Card 
              key={product.id} 
              className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-amber-200 dark:hover:border-amber-700 relative"
            >
              {/* Badge */}
              {product.badge && (
                <div className={`absolute top-3 sm:top-4 left-3 sm:left-4 z-10 px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                  product.badge === "Best Seller" 
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white" 
                    : product.badge === "Premium"
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                    : product.badge === "Popular"
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                    : "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                }`}>
                  {product.badge}
                </div>
              )}

              {/* Favorite Button */}
              <button
                onClick={() => toggleFavorite(product.id)}
                className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full p-2 hover:scale-110 transition-all duration-300 shadow-lg"
              >
                <Heart 
                  className={`h-5 w-5 transition-all duration-300 ${
                    favorites.has(product.id) 
                      ? "fill-red-500 text-red-500" 
                      : "text-slate-400 hover:text-red-500"
                  }`}
                />
              </button>

              <div className="aspect-square overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-700 dark:to-slate-600 relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_70%)]"></div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                />
              </div>

              <CardContent className="p-4 sm:p-5">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-bold text-sm sm:text-lg mb-1 text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-2">
                      {product.description}
                    </p>
                    <span className="inline-block bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-semibold px-2 py-1 rounded-full">
                      {product.weight}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3 mt-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                      {product.rating}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    ({product.reviews})
                  </span>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    ₹{product.price}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">/{product.weight}</span>
                </div>
              </CardContent>

              <CardFooter className="p-4 sm:p-5 pt-0 flex flex-col gap-3">
                {/* Quantity Selector */}
                <div className="flex items-center gap-2 w-full">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => decrementQuantity(product.id)}
                    className="h-9 sm:h-10 w-9 sm:w-10 rounded-full hover:bg-amber-50 dark:hover:bg-amber-900/20 border-2"
                  >
                    <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                  <div className="flex-1 text-center">
                    <span className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      {quantities[product.id] || "1"}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => incrementQuantity(product.id)}
                    className="h-9 sm:h-10 w-9 sm:w-10 rounded-full hover:bg-amber-50 dark:hover:bg-amber-900/20 border-2"
                  >
                    <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>

                <Button 
                  onClick={() => contactWhatsApp(product.id)}
                  className="w-full rounded-full font-semibold text-sm sm:text-base bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 transition-all duration-300 py-2 sm:py-3"
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
      <section className="py-16 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 rounded-3xl p-8 sm:p-12 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PC9zdmc+')]"></div>
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
                Subscribe & Save
              </h2>
              <p className="text-sm sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto">
                Get fresh biscuits delivered weekly and enjoy special discounts
              </p>
              <Button 
                size="lg"
                className="bg-white text-amber-900 hover:bg-amber-50 shadow-xl rounded-full px-6 sm:px-8 text-sm sm:text-lg font-semibold"
              >
                Start Your Subscription
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Biscuits;
