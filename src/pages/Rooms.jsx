import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, RotateCcw, AlertCircle } from "lucide-react";
import { roomsData } from "../data/mockData";
import RoomCard from "../components/ui/RoomCard";

export default function Rooms() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(3000);
  const [minGuests, setMinGuests] = useState("All");

  // Sync state with URL search param
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory("All");
    }
  }, [categoryParam]);

  const categories = [
    "All",
    "Deluxe Room",
    "Premium Room",
    "Executive Suite",
    "Family Suite",
    "Honeymoon Suite",
    "Presidential Suite"
  ];

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    if (cat === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", cat);
    }
    setSearchParams(searchParams);
  };

  const resetFilters = () => {
    setSelectedCategory("All");
    setMaxPrice(3000);
    setMinGuests("All");
    setSearchParams({});
  };

  // Filter Logic
  const filteredRooms = roomsData.filter((room) => {
    // 1. Category check
    const matchesCategory =
      selectedCategory === "All" || room.category === selectedCategory;

    // 2. Price check
    const matchesPrice = room.price <= maxPrice;

    // 3. Occupancy check
    let matchesGuests = true;
    if (minGuests !== "All") {
      const neededGuests = parseInt(minGuests);
      // Parse occupancy string e.g. "2 Adults" -> 2 or "4 Adults, 2 Children" -> 6
      const adultsMatch = room.occupancy.match(/(\d+)\s+Adult/i);
      const kidsMatch = room.occupancy.match(/(\d+)\s+Child/i);
      const totalCapacity =
        (adultsMatch ? parseInt(adultsMatch[1]) : 0) +
        (kidsMatch ? parseInt(kidsMatch[1]) : 0);

      matchesGuests = totalCapacity >= neededGuests;
    }

    return matchesCategory && matchesPrice && matchesGuests;
  });

  return (
    <div className="pt-24 md:pt-28 font-sans">
      {/* 1. Header Banner */}
      <section className="relative h-[280px] md:h-[350px] flex items-center justify-center overflow-hidden mb-12 border-b border-gold/15">
        <div className="absolute inset-0 bg-primary/60 z-10" />
        <img
          src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1920&q=80"
          alt="Suites beachfront view"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center text-white px-6">
          <motion.span
            className="text-gold tracking-[0.3em] text-xs uppercase block mb-3 font-semibold"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            ACCOMMODATION
          </motion.span>
          <motion.h1
            className="font-serif text-3xl md:text-5xl lg:text-6xl font-light tracking-wide"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Luxury Rooms & Suites
          </motion.h1>
        </div>
      </section>

      {/* 2. Main Grid and Filters Container */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Filter panel */}
          <div className="lg:col-span-3 flex flex-col gap-8 bg-white border border-primary/5 p-6 rounded shadow-sm self-start">
            <div className="flex items-center justify-between border-b border-primary/10 pb-4">
              <h3 className="font-serif text-lg text-primary font-medium flex items-center gap-2">
                <Filter className="w-4.5 h-4.5 text-gold" /> Filters
              </h3>
              <button
                onClick={resetFilters}
                className="text-[10px] uppercase tracking-wider text-dark-slate/50 hover:text-gold transition-colors flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* Filter 1: Categories */}
            <div className="flex flex-col gap-2.5 text-left">
              <span className="text-[10px] tracking-widest uppercase font-bold text-primary/70 mb-1">
                Room Category
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`text-left text-xs tracking-wider py-1.5 px-3 rounded-sm cursor-pointer transition-colors border ${
                    selectedCategory === cat
                      ? "bg-primary text-gold border-primary"
                      : "text-dark-slate/80 hover:text-gold border-transparent"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Filter 2: Price Slider */}
            <div className="flex flex-col gap-3 text-left">
              <span className="text-[10px] tracking-widest uppercase font-bold text-primary/70">
                Max Price: <span className="text-gold font-serif">${maxPrice}</span>
              </span>
              <input
                type="range"
                min="350"
                max="3000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="w-full accent-gold bg-light-gray h-1 rounded cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-dark-slate/40">
                <span>$350</span>
                <span>$3,000</span>
              </div>
            </div>

            {/* Filter 3: Guests capacity */}
            <div className="flex flex-col gap-3 text-left">
              <span className="text-[10px] tracking-widest uppercase font-bold text-primary/70">
                Occupancy Required
              </span>
              <select
                value={minGuests}
                onChange={(e) => setMinGuests(e.target.value)}
                className="w-full bg-light-gray border border-primary/5 rounded px-3 py-2 text-xs outline-none cursor-pointer"
              >
                <option value="All">Any Occupancy</option>
                <option value="2">2+ Guests</option>
                <option value="3">3+ Guests</option>
                <option value="4">4+ Guests</option>
                <option value="6">6+ Guests</option>
              </select>
            </div>
          </div>

          {/* Right Column: Rooms Listing */}
          <div className="lg:col-span-9">
            {/* Show stats header */}
            <div className="flex items-center justify-between border-b border-primary/10 pb-4 mb-8 text-xs text-dark-slate/50">
              <span>Showing {filteredRooms.length} of {roomsData.length} Suites</span>
              {selectedCategory !== "All" && (
                <span className="bg-gold/10 text-gold px-3 py-1 rounded border border-gold/15 uppercase font-bold text-[9px] tracking-wider">
                  Category: {selectedCategory}
                </span>
              )}
            </div>

            {/* Active Cards Grid */}
            <AnimatePresence mode="popLayout">
              {filteredRooms.length > 0 ? (
                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  {filteredRooms.map((room) => (
                    <motion.div
                      key={room.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                    >
                      <RoomCard room={room} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                /* Empty State */
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-white border border-primary/5 py-20 px-6 rounded-lg text-center flex flex-col items-center gap-4 shadow-sm"
                >
                  <AlertCircle className="w-12 h-12 text-gold stroke-1" />
                  <h3 className="font-serif text-xl text-primary font-medium tracking-wide">
                    No Suites Match Filters
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-dark-slate/75 font-light max-w-md">
                    We could not find any luxury suites matching your exact price or guest capacity. Try resetting your settings to view our complete collection.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="bg-primary text-gold border border-gold/15 hover:bg-gold hover:text-primary px-6 py-2.5 rounded-sm font-sans text-xs tracking-widest uppercase font-bold transition-all shadow-md cursor-pointer mt-2"
                  >
                    Clear All Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>
    </div>
  );
}
