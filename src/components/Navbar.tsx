import React, { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, Package } from "lucide-react";
import Logo from "../assets/ra-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const products = [
  { id: 1, name: "Chocolates", icon: "🍫", path: "/chocolate" },
  { id: 2, name: "Biscuits", icon: "🍪", path: "/biscuits" },
  { id: 3, name: "Nuts", icon: "🥜", path: "/nuts" },
  { id: 4, name: "Perfumes", icon: "🌸", path: "/perfumes" },
  { id: 5, name: "Dates", icon: "🌴", path: "/dates" },
  { id: 6, name: "Toys", icon: "🧸", path: "/toys" },
  { id: 7, name: "Dry Fruits", icon: "🍇", path: "/dry-fruits" },
  { id: 8, name: "Chips", icon: "🍟", path: "/chips" },
];

interface NavLink {
  label: string;
  path?: string;
  action?: () => void;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // desktop dropdown ref
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  // mobile dropdown ref — used so outside-click doesn't close the menu when user taps a product
  const mobileDropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    // Use pointerdown to be consistent across touch/mouse
    const handlePointerDownOutside = (event: PointerEvent) => {
      const target = event.target as Node | null;
      // If click/tap is inside either dropdown, do nothing
      if (
        (dropdownRef.current && target && dropdownRef.current.contains(target)) ||
        (mobileDropdownRef.current && target && mobileDropdownRef.current.contains(target))
      ) {
        return;
      }
      // Otherwise close products dropdown
      setIsProductsOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("pointerdown", handlePointerDownOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("pointerdown", handlePointerDownOutside);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
      setIsProductsOpen(false);
    }
  };

  const navLinks: NavLink[] = [
    { label: "Home", path: "/" },
    { label: "About", action: () => scrollToSection("about") },
  ];

  // Option A helper: close menus first, then navigate programmatically
  const handleProductNav = (path: string) => {
    setIsProductsOpen(false);
    setIsOpen(false);
    // navigate immediately — safe because we closed menus first
    navigate(path);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-900/95 backdrop-blur-xl shadow-lg border-b border-slate-800"
          : "bg-slate-900/85 backdrop-blur-md border-b border-slate-800/50"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo image */}
          <Link to="/" className="flex-shrink-0 group cursor-pointer">
            <div className="flex items-center gap-2">
              <img
                src={Logo}
                alt="R.A Traders"
                className={`h-10 lg:h-12 w-auto transition-all duration-300 ${
                  scrolled ? "scale-90" : "scale-100"
                }`}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) =>
              link.path ? (
                <Link
                  key={link.label}
                  to={link.path}
                  className="relative px-4 py-2 text-sm font-medium text-slate-200 hover:text-amber-400 transition-colors group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ) : (
                <button
                  key={link.label}
                  onClick={link.action}
                  className="relative px-4 py-2 text-sm font-medium text-slate-200 hover:text-amber-400 transition-colors group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-amber-600 to-orange-600 group-hover:w-full transition-all duration-300"></span>
                </button>
              )
            )}

            {/* Products Mega Dropdown (desktop) */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                className="relative px-4 py-2 text-sm font-medium text-white dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 transition-colors group flex items-center gap-1"
              >
                Products
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${
                    isProductsOpen ? "rotate-180" : ""
                  }`}
                />
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-amber-600 to-orange-600 group-hover:w-full transition-all duration-300"></span>
              </button>

              {isProductsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[480px] bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="bg-gradient-to-r from-amber-900/20 to-orange-900/20 px-6 py-4 border-b border-slate-700">
                    <div className="flex items-center gap-2">
                      <Package className="h-5 w-5 text-amber-400" />
                      <h3 className="text-sm font-semibold text-slate-100">Our Products</h3>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 p-4">
                    {products.map((product) => (
                      <Link
                        key={product.id}
                        to={product.path}
                        className="group flex flex-col items-center justify-center p-4 rounded-xl hover:bg-gradient-to-br hover:from-amber-900/20 hover:to-orange-900/20 transition-all duration-300 hover:shadow-md hover:scale-105"
                      >
                        <span className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                          {product.icon}
                        </span>
                        <span className="text-xs font-medium text-slate-300 group-hover:text-amber-400 text-center">
                          {product.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => scrollToSection("contact")}
              className="relative px-4 py-2 text-sm font-medium text-white dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 transition-colors group "
            >
              Contact
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-amber-600 to-orange-600 group-hover:w-full transition-all duration-300"></span>
            </button>

            <Button
              onClick={() =>
                window.open(
                  `https://wa.me/918888095594?text=${encodeURIComponent(
                    "Hello, I would like to enquire about your products."
                  )}`,
                  "_blank"
                )
              }
              className="ml-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-md hover:shadow-lg transition-all duration-300 rounded-full px-6"
            >
              WhatsApp
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="hover:bg-amber-100 dark:hover:bg-amber-900/20 rounded-full"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6 text-white dark:text-slate-200" />
              ) : (
                <Menu className="h-6 w-6 text-white dark:text-slate-200" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden pb-6 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col gap-1 pt-4 border-t border-slate-800">
              {navLinks.map((link) =>
                link.path ? (
                  <Link
                    key={link.label}
                    to={link.path}
                    onClick={() => {
                      setIsOpen(false);
                      setIsProductsOpen(false);
                    }}
                    className="text-left px-4 py-3 text-sm font-medium text-white dark:text-slate-200 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600 dark:hover:text-amber-400 rounded-lg transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button
                    key={link.label}
                    onClick={() => {
                      link.action && link.action();
                    }}
                    className="text-left w-full px-4 py-3 text-sm font-medium text-white dark:text-slate-200 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600 dark:hover:text-amber-400 rounded-lg transition-all duration-200"
                  >
                    {link.label}
                  </button>
                )
              )}

              {/* Mobile Products Dropdown — uses mobileDropdownRef */}
              <div>
                <button
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-white dark:text-slate-200 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600 dark:hover:text-amber-400 rounded-lg transition-all duration-200"
                >
                  Products
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${
                      isProductsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isProductsOpen && (
                  <div
                    ref={mobileDropdownRef}
                    className="mt-2 mx-2 p-3 bg-slate-500 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 animate-in fade-in slide-in-from-top-2 duration-200"
                  >
                    <div className="grid grid-cols-3 gap-2">
                      {products.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => handleProductNav(product.path)}
                          className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-white dark:hover:bg-slate-700 transition-all duration-200 hover:shadow-sm"
                        >
                          <span className="text-2xl mb-1">{product.icon}</span>
                          <span className="text-xs font-medium text-white dark:text-slate-300 text-center">
                            {product.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  scrollToSection("contact");
                }}
                className="text-left px-4 py-3 text-sm font-medium text-white dark:text-slate-200 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600 dark:hover:text-amber-400 rounded-lg transition-all duration-200"
              >
                Contact
              </button>

              <Button
                onClick={() =>
                  window.open(
                    `https://wa.me/918888095594?text=${encodeURIComponent(
                      "Hello, I would like to enquire about your products."
                    )}`,
                    "_blank"
                  )
                }
                className="mt-4 w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-md hover:shadow-lg transition-all duration-300 rounded-full"
              >
                WhatsApp
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
