import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Image as ImageIcon } from "lucide-react";
import { galleryData } from "../data/mockData";
import Lightbox from "../components/ui/Lightbox";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const categories = [
    { id: "All", name: "All Media" },
    { id: "resort", name: "Resort Grounds" },
    { id: "rooms", name: "Suites & Villas" },
    { id: "dining", name: "Fine Dining" },
    { id: "wellness", name: "Wellness & Spa" },
    { id: "events", name: "Weddings & Celebrations" }
  ];

  // Filter gallery items
  const filteredItems = galleryData.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  const handlePrev = () => {
    setLightboxIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setLightboxIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="pt-24 md:pt-28 font-sans">
      {/* 1. Header Banner */}
      <section className="relative h-[280px] md:h-[350px] flex items-center justify-center overflow-hidden mb-16 border-b border-gold/15">
        <div className="absolute inset-0 bg-primary/60 z-10" />
        <img
          src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1920&q=80"
          alt="Luxury sunset horizon background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center text-white px-6">
          <motion.span
            className="text-gold tracking-[0.3em] text-xs uppercase block mb-3 font-semibold"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            PORTFOLIO
          </motion.span>
          <motion.h1
            className="font-serif text-3xl md:text-5xl lg:text-6xl font-light tracking-wide"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Our Visual Gallery
          </motion.h1>
        </div>
      </section>

      {/* 2. Masonry Gallery Content */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-32">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-gold tracking-[0.25em] text-xs font-bold uppercase mb-3">
            IMMERSIVE IMAGERY
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-primary font-light tracking-wide mb-4">
            Capturing Moments of Serenity
          </h2>
          <p className="font-sans text-xs md:text-sm text-dark-slate/60 max-w-xl font-light">
            Filter through our visual vault of modern layouts, overwater dining canopies, holistic massage rooms, and beachfront corporate functions.
          </p>
        </div>

        {/* Tab Buttons bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-primary/10 pb-6 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setLightboxIndex(null);
              }}
              className={`font-sans text-xs tracking-widest uppercase py-2.5 px-5 rounded-full border transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-primary text-gold border-primary shadow-sm"
                  : "text-dark-slate hover:text-gold border-transparent"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grid Masonry Gallery */}
        <motion.div
          layout
          className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                onClick={() => setLightboxIndex(index)}
                className="relative break-inside-avoid overflow-hidden rounded border border-primary/5 shadow-sm hover:shadow-xl cursor-pointer group"
              >
                {/* Image */}
                <img
                  src={item.url}
                  alt={item.title}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlap Info */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6 text-left">
                  <span className="text-[9px] font-sans tracking-[0.25em] text-gold font-bold uppercase mb-1 flex items-center gap-1">
                    <ImageIcon className="w-3 h-3 text-gold" /> {item.category}
                  </span>
                  <h3 className="font-serif text-base text-white tracking-wide font-medium flex items-center justify-between">
                    {item.title}
                    <Eye className="w-4.5 h-4.5 text-gold" />
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Lightbox Media Overlay */}
      {lightboxIndex !== null && (
        <Lightbox
          images={filteredItems}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
}
