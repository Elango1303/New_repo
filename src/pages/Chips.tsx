import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Star, Truck, Shield, Award, ChevronRight, Phone, Plus, Minus, Gift } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MixedImg from "@/assets/mixed.png";

type ChipProduct = {
  id: number;
  name: string;
  basePrice: number;
  description: string;
  image?: string;
};

// chips product list: basePrice is price per unit now (was per 100g)
// use public image paths (place images in public/images/chips/) or change to imports
const chipsProducts: ChipProduct[] = [
  { id: 1, name: "LAY'S CLASSIC", basePrice: 35, description: "Classic salted potato chips", image: "src/assets/images/chips/plainsalt.jpg" },
  { id: 2, name: "CHEESE BALLS", basePrice: 40, description: "Cheesy crunchy bites", image: "src/assets/images/chips/cheeseballs.jpg" },
  { id: 3, name: "KETTLE SALT", basePrice: 45, description: "Kettle cooked salt chips", image: "src/assets/images/chips/kettlesalt.jpg" },
  { id: 4, name: "SWEET CHILLI", basePrice: 38, description: "Sweet chilli flavored chips", image: "src/assets/images/chips/sweetchilli.jpg" },
  { id: 5, name: "BBQ", basePrice: 40, description: "Barbecue flavored chips", image: "src/assets/images/chips/bbq.jpg" },
  { id: 6, name: "SOUR CREAM & ONION", basePrice: 42, description: "Sour cream & onion", image: "src/assets/images/chips/sourcream.jpg" },
  { id: 7, name: "PERI PERI", basePrice: 44, description: "Peri peri spicy chips", image: "src/assets/images/chips/periperi.jpg" },
  { id: 8, name: "MEXICAN", basePrice: 39, description: "Mexican spicy mix", image: "src/assets/images/chips/mexican.jpg" },
  { id: 9, name: "MASALA", basePrice: 36, description: "Indian masala chips", image:"src/assets/images/chips/masalachips.jpg" },
  { id: 10, name: "PLAIN SALT", basePrice: 30, description: "Plain salted chips", image: "src/assets/images/chips/plainsalt.jpg" },
   { id: 1, name: "OMAN CHIPS", basePrice: 35, description: "OMAN  chips", image: "src/assets/images/omanchip.jpg" },
    ];

const features = [
  { icon: Truck, title: "Fresh Stock", description: "Regularly replenished for crunch" },
  { icon: Shield, title: "Quality", description: "Sourced from trusted brands" },
  { icon: Award, title: "Tasty Varieties", description: "Flavors for every mood" },
];

const Chips = () => {
  // switched from grams to quantity (units)
  const [selectedQuantity, setSelectedQuantity] = useState<Record<number, number>>({});
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) newFavorites.delete(productId);
      else newFavorites.add(productId);
      return newFavorites;
    });
  };

  const setQuantityFor = (productId: number, qty: number) => {
    setSelectedQuantity((prev) => ({ ...prev, [productId]: Math.max(1, qty) }));
  };

  const incrementQuantity = (productId: number) => {
    const current = selectedQuantity[productId] || 1;
    if (current < 100) setQuantityFor(productId, current + 1);
  };

  const decrementQuantity = (productId: number) => {
    const current = selectedQuantity[productId] || 1;
    if (current > 1) setQuantityFor(productId, current - 1);
  };

  const getPrice = (product: ChipProduct, qty?: number) => {
    const q = qty || 1;
    return Math.round(product.basePrice * q);
  };

  const contactWhatsApp = (productId: number) => {
    const product = chipsProducts.find((p) => p.id === productId)!;
    const qty = selectedQuantity[product.id] || 1;
    const price = getPrice(product, qty);
    const msg = `Hello, I'm interested in ${product.name} - Quantity: ${qty} (Total: ₹${price}). Please assist with ordering.`;
    const url = `https://wa.me/918888095594?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50/30 via-amber-50/20 to-white">
      <Navbar />

      {/* Hero Section (matches other pages) */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-800 via-yellow-700 to-yellow-800">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>

        <div className="relative h-full flex items-center justify-center px-4">
          <div className="text-center text-white max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-6 border border-white/20">
              <Gift className="h-4 w-4 text-purple-300" />
              <span className="text-sm font-medium">Crispy Snacks & Chips</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-200 via-amber-200 to-orange-200 bg-clip-text text-transparent">
              Crunch & Munch Collection
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Explore our tasty chips — perfect for snacks, parties and quick bites.
            </p>
            <Button
              size="lg"
              className="bg-white text-amber-900 hover:bg-amber-50 shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 rounded-full px-8 text-lg font-semibold group"
            >
              Shop Chips
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Floating elements (use simple emojis or swap with images) */}
        <div className="absolute top-20 left-10 text-6xl opacity-20 animate-pulse">🍟</div>
        <div className="absolute bottom-20 right-20 text-5xl opacity-20 animate-pulse delay-300">🥤</div>
        <div className="absolute top-1/2 right-10 text-4xl opacity-20 animate-pulse delay-700">🧂</div>
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
                  className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-slate-200"
                >
                  <div className="bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl p-3 w-fit mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-1 text-sm md:text-base">
                    {feature.title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {chipsProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-amber-200 relative">
              <button
                onClick={() => toggleFavorite(product.id)}
                className="absolute top-4 right-4 z-10 bg-white/90 rounded-full p-2 hover:scale-110 transition-all duration-300 shadow-lg"
              >
                <Heart className={`h-5 w-5 ${favorites.has(product.id) ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} />
              </button>

              <div className="aspect-square overflow-hidden bg-gradient-to-br from-amber-50 to-yellow-50 relative flex items-center justify-center">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                ) : (
                  <div className="text-8xl">🍟</div>
                )}
              </div>

              <CardContent className="p-5">
                <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                <p className="text-sm text-slate-600 mb-2">{product.description}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">₹{getPrice(product, selectedQuantity[product.id] || 1)}</span>
                  <span className="text-sm text-slate-500">/unit</span>
                </div>
              </CardContent>

              <CardFooter className="p-5 pt-0 flex flex-col gap-3">
                <div className="flex items-center gap-2 w-full">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => decrementQuantity(product.id)}
                    className="h-10 w-10 rounded-full hover:bg-amber-50 border-2"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>

                  <div className="flex-1 text-center">
                    <span className="text-xl font-bold text-slate-900">
                      {selectedQuantity[product.id] || 1}
                    </span>
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => incrementQuantity(product.id)}
                    className="h-10 w-10 rounded-full hover:bg-amber-50 border-2"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <Button onClick={() => contactWhatsApp(product.id)} className="w-full rounded-full font-semibold bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                  <Phone className="mr-2 h-4 w-4" /> Contact WhatsApp
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Chips;
