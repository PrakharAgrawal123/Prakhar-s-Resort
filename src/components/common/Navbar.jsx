import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, MapPin, Calendar, Award } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on page change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Rooms & Suites", path: "/rooms", hasMega: true },
    { name: "Restaurant", path: "/restaurant" },
    { name: "Amenities", path: "/amenities" },
    { name: "Gallery", path: "/gallery" },
    { name: "Events & Weddings", path: "/events" },
    { name: "Special Offers", path: "/offers" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-primary/90 backdrop-blur-md border-b border-gold/10 py-4 shadow-xl"
            : "bg-gradient-to-b from-primary/80 to-transparent py-6"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex flex-col items-start cursor-pointer">
            <span className="font-serif text-2xl lg:text-3xl tracking-[0.2em] text-gold font-light leading-none">
              AMAN
            </span>
            <span className="font-sans text-[8px] lg:text-[10px] tracking-[0.35em] text-white/70 uppercase mt-1">
              Serenity Resort
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.hasMega && setIsMegaMenuOpen(true)}
                onMouseLeave={() => link.hasMega && setIsMegaMenuOpen(false)}
              >
                {link.hasMega ? (
                  <button
                    onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                    className="flex items-center gap-1 font-sans text-sm tracking-widest text-white/90 hover:text-gold transition-colors py-2 uppercase cursor-pointer"
                  >
                    {link.name} <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isMegaMenuOpen ? "rotate-180" : ""}`} />
                  </button>
                ) : (
                  <Link
                    to={link.path}
                    className={`font-sans text-sm tracking-widest text-white/90 hover:text-gold transition-colors py-2 uppercase relative ${
                      pathname === link.path ? "text-gold" : ""
                    }`}
                  >
                    {link.name}
                    {pathname === link.path && (
                      <motion.span
                        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold"
                        layoutId="activeNavBorder"
                      />
                    )}
                  </Link>
                )}

                {/* Mega Menu Dropdown */}
                {link.hasMega && (
                  <AnimatePresence>
                    {isMegaMenuOpen && (
                      <motion.div
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[650px] bg-primary border border-gold/15 shadow-2xl p-6 rounded-lg grid grid-cols-3 gap-6"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        transition={{ duration: 0.25 }}
                      >
                        {/* Column 1: Suites */}
                        <div className="flex flex-col gap-3">
                          <h4 className="font-serif text-sm tracking-widest text-gold font-semibold border-b border-gold/10 pb-2 flex items-center gap-2">
                            <Award className="w-4 h-4" /> SUITES
                          </h4>
                          <Link to="/rooms?category=Presidential+Suite" className="text-xs text-white/70 hover:text-gold tracking-wide transition-colors">
                            Presidential Palace
                          </Link>
                          <Link to="/rooms?category=Honeymoon+Suite" className="text-xs text-white/70 hover:text-gold tracking-wide transition-colors">
                            Honeymoon Sanctuary
                          </Link>
                          <Link to="/rooms?category=Executive+Suite" className="text-xs text-white/70 hover:text-gold tracking-wide transition-colors">
                            Executive Oasis Suite
                          </Link>
                        </div>
                        {/* Column 2: Rooms */}
                        <div className="flex flex-col gap-3">
                          <h4 className="font-serif text-sm tracking-widest text-gold font-semibold border-b border-gold/10 pb-2 flex items-center gap-2">
                            <Calendar className="w-4 h-4" /> ROOMS
                          </h4>
                          <Link to="/rooms?category=Premium+Room" className="text-xs text-white/70 hover:text-gold tracking-wide transition-colors">
                            Premium Ocean Room
                          </Link>
                          <Link to="/rooms?category=Deluxe+Room" className="text-xs text-white/70 hover:text-gold tracking-wide transition-colors">
                            Deluxe Garden Room
                          </Link>
                          <Link to="/rooms?category=Family+Suite" className="text-xs text-white/70 hover:text-gold tracking-wide transition-colors">
                            Family Residence
                          </Link>
                        </div>
                        {/* Column 3: Featured Preview */}
                        <div className="bg-white/5 border border-white/5 p-4 rounded flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] tracking-widest text-gold font-bold uppercase block mb-1">
                              Exclusive Offer
                            </span>
                            <h5 className="font-serif text-sm text-white leading-snug">
                              Save 20% on Garden Stays
                            </h5>
                            <p className="text-[10px] text-white/60 mt-2 leading-relaxed">
                              Includes breakfast & airport shuttle
                            </p>
                          </div>
                          <Link to="/offers" className="text-xs text-gold underline tracking-wider mt-4 hover:text-white transition-colors">
                            View Deal
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* Book Now Button Desktop */}
          <div className="hidden lg:block">
            <Link
              to="/booking"
              className="bg-gold text-primary hover:bg-gold-hover px-6 py-2.5 rounded-sm font-sans text-xs tracking-widest uppercase font-semibold transition-all duration-300 shadow-md hover:shadow-gold/20"
            >
              Book Your Stay
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-gold transition-colors p-2 cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-primary z-45 flex flex-col pt-24 px-6 pb-8"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.35 }}
          >
            {/* Nav Links List */}
            <div className="flex flex-col gap-6 overflow-y-auto pr-2 my-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`font-serif text-2xl tracking-widest hover:text-gold transition-colors text-left py-1 ${
                    pathname === link.path ? "text-gold border-l-2 border-gold pl-3" : "text-white/80"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* CTA and Contacts at bottom */}
            <div className="border-t border-white/10 pt-8 mt-auto flex flex-col gap-6">
              <Link
                to="/booking"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-gold text-primary text-center hover:bg-gold-hover py-4 rounded font-sans text-sm tracking-widest uppercase font-bold transition-all shadow-md"
              >
                Book Your Stay
              </Link>
              <div className="flex flex-col items-center gap-2 text-white/50 text-xs tracking-wider font-sans">
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gold" /> Maldives, Indian Ocean
                </p>
                <p>reception@amanserenity.com | +1 (234) 567-890</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
