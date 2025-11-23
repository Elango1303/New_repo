import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Phone } from "lucide-react";
import { useState } from "react";

export type ProductBase = {
  id: number;
  name: string;
  description: string;
  image?: string;
};

export type WeightProduct = ProductBase & {
  type: "weight";
  basePricePer100g: number;
};

export type QuantityProduct = ProductBase & {
  type: "quantity";
  unitPrice: number;
  unitLabel?: string; // e.g. "unit", "bottle", "box"
};

export type UnifiedProduct = WeightProduct | QuantityProduct;

export interface ProductCardProps {
  product: UnifiedProduct;
  initialFavorite?: boolean;
  onFavoriteChange?: (id: number, isFavorite: boolean) => void;
  onContact?: (message: string) => void; // optional override for WhatsApp handling
  accentColor?: "amber" | "green" | "yellow" | "purple" | "sky";
}

const accentMap: Record<NonNullable<ProductCardProps["accentColor"]>, string> = {
  amber: "from-amber-600 to-yellow-600",
  green: "from-green-600 to-emerald-600",
  yellow: "from-yellow-500 to-amber-500",
  purple: "from-purple-600 to-pink-600",
  sky: "from-sky-600 to-cyan-600",
};

export function ProductCard({
  product,
  initialFavorite = false,
  onFavoriteChange,
  onContact,
  accentColor = "amber",
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const [grams, setGrams] = useState(100);
  const [qty, setQty] = useState(1);

  const gradient = accentMap[accentColor];

  const handleFavorite = () => {
    const next = !isFavorite;
    setIsFavorite(next);
    onFavoriteChange?.(product.id, next);
  };

  const computePrice = () => {
    if (product.type === "weight") {
      const raw = product.basePricePer100g * (grams / 100);
      return Math.round(raw);
    }
    return product.unitPrice * qty;
  };

  const label = () => {
    if (product.type === "weight") {
      return grams >= 1000 ? `${grams / 1000}kg` : `${grams}g`;
    }
    return `${qty} ${product.unitLabel ?? "unit"}${qty > 1 ? "s" : ""}`;
  };

  const handleContact = () => {
    const price = computePrice();
    const msg =
      product.type === "weight"
        ? `Hello, I'm interested in ${product.name} - ${label()} (Total: ₹${price}). Please assist with ordering.`
        : `Hello, I'm interested in ${product.name} - ${label()} (Total: ₹${price}). Please assist with ordering.`;

    if (onContact) {
      onContact(msg);
    } else {
      const url = `https://wa.me/918888095594?text=${encodeURIComponent(msg)}`;
      window.open(url, "_blank");
    }
  };

  return (
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-700 relative">
      {/* Favorite Button */}
      <button
        onClick={handleFavorite}
        className="absolute top-4 right-4 z-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full p-2 hover:scale-110 transition-all duration-300 shadow-lg"
      >
        <Heart
          className={`h-5 w-5 transition-all duration-300 ${
            isFavorite ? "fill-red-500 text-red-500" : "text-slate-400 hover:text-red-500"
          }`}
        />
      </button>

      {/* Image */}
      <div className="aspect-square overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-600 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_70%)]" />
        <div className="w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative z-10">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="max-w-3/4 max-h-3/4 object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <div className="text-6xl">🍬</div>
          )}
        </div>
      </div>

      <CardContent className="p-5">
        <h3 className="font-bold text-lg mb-1 text-slate-900 dark:text-white group-hover:text-slate-900">
          {product.name}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2 line-clamp-2">
          {product.description}
        </p>
        <span className="inline-block bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 text-xs font-semibold px-2 py-1 rounded-full">
          {product.type === "weight" ? "Select weight" : "Select quantity"}
        </span>

        <div className="mt-3 flex items-baseline gap-2">
          <span className={`text-3xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
            ₹{computePrice()}
          </span>
          <span className="text-sm text-slate-500 dark:text-slate-400">/{label()}</span>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0 flex flex-col gap-3">
        {product.type === "weight" ? (
          <div className="flex items-center gap-2 w-full flex-wrap">
            {[100, 200, 250, 500, 1000].map((g) => {
              const isSelected = grams === g;
              return (
                <Button
                  key={g}
                  variant={isSelected ? undefined : "outline"}
                  onClick={() => setGrams(g)}
                  className={`h-9 px-3 rounded-full text-xs font-semibold ${
                    isSelected ? `bg-gradient-to-r ${gradient} text-white` : ""
                  }`}
                >
                  {g >= 1000 ? `${g / 1000}kg` : `${g}g`}
                </Button>
              );
            })}
          </div>
        ) : (
          <div className="flex items-center justify-between w-full gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="h-9 w-9 rounded-full"
            >
              -
            </Button>
            <span className="text-lg font-semibold text-slate-900 dark:text-white">{qty}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQty((q) => Math.min(50, q + 1))}
              className="h-9 w-9 rounded-full"
            >
              +
            </Button>
          </div>
        )}

        <Button
          onClick={handleContact}
          className="w-full rounded-full font-semibold bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
        >
          <Phone className="mr-2 h-4 w-4" />
          Contact WhatsApp
        </Button>
      </CardFooter>
    </Card>
  );
}
