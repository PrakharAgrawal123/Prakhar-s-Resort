import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Clock, Users, Calendar, CheckCircle, Flame, X } from "lucide-react";
import { diningData } from "../data/mockData";
import canvasConfetti from "canvas-confetti";

export default function Restaurant() {
  const { chef, categories, menuItems } = diningData;
  const [activeCategory, setActiveCategory] = useState("breakfast");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Reservation form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("19:00");
  const [guests, setGuests] = useState("2");
  const [specialRequest, setSpecialRequest] = useState("");
  const [isReserved, setIsReserved] = useState(false);

  const handleReserveSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && email.trim() && date.trim()) {
      setIsReserved(true);
      // Trigger gold luxury confetti
      canvasConfetti({
        particleCount: 80,
        spread: 60,
        colors: ["#D4AF37", "#0F172A", "#FFFFFF"]
      });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Reset reservation state
    setTimeout(() => {
      setIsReserved(false);
      setName("");
      setEmail("");
      setDate("");
      setTime("19:00");
      setGuests("2");
      setSpecialRequest("");
    }, 400);
  };

  const activeItems = menuItems.filter((item) => item.category === activeCategory);

  return (
    <div className="pt-24 md:pt-28 font-sans">
      {/* 1. Hero Banner */}
      <section className="relative h-[320px] md:h-[400px] flex items-center justify-center overflow-hidden mb-20 border-b border-gold/15">
        <div className="absolute inset-0 bg-primary/65 z-10" />
        <img
          src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=80"
          alt="Luxury dining beachfront table"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center text-white px-6">
          <motion.span
            className="text-gold tracking-[0.3em] text-xs uppercase block mb-3 font-semibold"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            GASTRONOMY
          </motion.span>
          <motion.h1
            className="font-serif text-3xl md:text-5xl lg:text-6xl font-light tracking-wide"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Culinary Masterpieces
          </motion.h1>
        </div>
      </section>

      {/* 2. Chef introduction */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-32 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Chef Image */}
        <div className="lg:col-span-5 w-full aspect-[4/5] rounded overflow-hidden shadow-2xl border border-gold/15 relative">
          <img
            src={chef.image}
            alt={chef.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Bio */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <span className="text-gold tracking-[0.25em] text-xs font-bold uppercase mb-3 flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 fill-gold stroke-none" /> CULINARY DIRECTOR
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-primary font-light tracking-wide mb-6 leading-tight">
            Curated by Chef {chef.name}
          </h2>
          <p className="font-sans text-sm md:text-base text-dark-slate/85 leading-relaxed font-light mb-8">
            {chef.bio}
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-gold border border-gold/15 hover:bg-gold hover:text-primary px-8 py-3.5 rounded-sm font-sans text-xs tracking-widest uppercase font-semibold transition-all duration-300 shadow-md cursor-pointer"
          >
            Reserve A Table
          </button>
        </div>
      </section>

      {/* 3. Tabbed Menu Display */}
      <section className="max-w-6xl mx-auto px-6 mb-32">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-gold tracking-[0.25em] text-xs font-bold uppercase mb-3">
            THE MENU
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-primary font-light tracking-wide mb-4">
            Bespoke Flavor Selections
          </h2>
          <p className="font-sans text-xs md:text-sm text-dark-slate/60 max-w-xl font-light">
            Browse our selections across dining hours, featuring classic Indian clay ovens, traditional imperial Chinese plates, and rich signature desserts.
          </p>
        </div>

        {/* Tab Buttons bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-primary/10 pb-6 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
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

        {/* Menu Items List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 text-left">
          <AnimatePresence mode="wait">
            {activeItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="border-b border-primary/5 pb-6 flex flex-col gap-2 relative group"
              >
                {/* Name & Price */}
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-serif text-lg text-primary font-medium tracking-wide flex items-center gap-2 group-hover:text-gold transition-colors">
                    {item.name}
                    {item.isSignature && (
                      <span className="bg-gold/10 text-gold text-[8px] font-sans tracking-widest font-bold uppercase py-0.5 px-2 rounded-full border border-gold/15 flex items-center gap-1 shrink-0">
                        <Flame className="w-2.5 h-2.5 fill-gold stroke-none" /> Signature
                      </span>
                    )}
                  </h3>
                  <span className="font-serif text-base text-gold font-light shrink-0">
                    ${item.price}
                  </span>
                </div>
                {/* Description */}
                <p className="font-sans text-xs md:text-sm text-dark-slate/75 leading-relaxed font-light">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* 4. Fine Dining Highlight Section */}
      <section className="bg-primary text-white py-24 mb-32 border-t border-b border-gold/15 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl text-white font-light tracking-wide mb-6">
            Private Dining & Beach Banquets
          </h2>
          <p className="text-white/70 text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto mb-10">
            For couples seeking complete seclusion, we arrange private canopy dining on the beach edge, complete with a dedicated waiter, custom flower setups, and live acoustic violinists.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gold text-primary hover:bg-gold-hover px-8 py-3.5 rounded-sm font-sans text-xs tracking-widest uppercase font-bold transition-all shadow-md cursor-pointer"
          >
            Inquire For Private Dining
          </button>
        </div>
      </section>

      {/* 5. Table Reservation Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              onClick={closeModal}
              className="absolute inset-0 bg-primary/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal Body */}
            <motion.div
              className="relative w-full max-w-lg bg-white rounded shadow-2xl overflow-hidden border border-primary/10 z-10"
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <div className="bg-primary text-white py-6 px-8 flex items-center justify-between border-b border-gold/15">
                <div className="text-left">
                  <h3 className="font-serif text-xl text-gold font-light tracking-wide">
                    Table Reservation
                  </h3>
                  <p className="text-[10px] text-white/50 tracking-wider uppercase mt-1">
                    Fine Dining at Aman Serenity
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="text-white/70 hover:text-gold transition-colors p-1 bg-white/5 rounded-full cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Content */}
              <div className="p-8 text-left">
                {!isReserved ? (
                  <form onSubmit={handleReserveSubmit} className="flex flex-col gap-5">
                    <div>
                      <label className="text-[10px] tracking-widest uppercase text-primary/70 font-bold block mb-1.5">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-light-gray border border-primary/5 rounded px-4 py-2.5 text-xs outline-none focus:border-gold"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] tracking-widest uppercase text-primary/70 font-bold block mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-light-gray border border-primary/5 rounded px-4 py-2.5 text-xs outline-none focus:border-gold"
                        placeholder="johndoe@email.com"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] tracking-widest uppercase text-primary/70 font-bold block mb-1.5">
                          Date
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-2.5 w-3.5 h-3.5 text-gold" />
                          <input
                            type="date"
                            required
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full bg-light-gray border border-primary/5 rounded pl-9 pr-3 py-2.5 text-xs outline-none focus:border-gold cursor-pointer"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] tracking-widest uppercase text-primary/70 font-bold block mb-1.5">
                          Preferred Time
                        </label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-2.5 w-3.5 h-3.5 text-gold" />
                          <select
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="w-full bg-light-gray border border-primary/5 rounded pl-9 pr-3 py-2.5 text-xs outline-none focus:border-gold cursor-pointer appearance-none"
                          >
                            <option value="12:00">12:00 PM</option>
                            <option value="13:00">01:00 PM</option>
                            <option value="14:00">02:00 PM</option>
                            <option value="18:00">06:00 PM</option>
                            <option value="19:00">07:00 PM</option>
                            <option value="20:00">08:00 PM</option>
                            <option value="21:00">09:00 PM</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] tracking-widest uppercase text-primary/70 font-bold block mb-1.5">
                        Number of Guests
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-2.5 w-3.5 h-3.5 text-gold" />
                        <select
                          value={guests}
                          onChange={(e) => setGuests(e.target.value)}
                          className="w-full bg-light-gray border border-primary/5 rounded pl-9 pr-3 py-2.5 text-xs outline-none focus:border-gold cursor-pointer appearance-none"
                        >
                          <option value="1">1 Guest</option>
                          <option value="2">2 Guests</option>
                          <option value="3">3 Guests</option>
                          <option value="4">4 Guests</option>
                          <option value="6">6+ Guests</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] tracking-widest uppercase text-primary/70 font-bold block mb-1.5">
                        Special Requests
                      </label>
                      <textarea
                        value={specialRequest}
                        onChange={(e) => setSpecialRequest(e.target.value)}
                        className="w-full bg-light-gray border border-primary/5 rounded px-4 py-2 text-xs outline-none focus:border-gold resize-none h-16"
                        placeholder="Allergies, sunset beach canopy selection, etc."
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-gold text-primary hover:bg-gold-hover py-3 rounded-sm font-sans text-xs tracking-widest uppercase font-bold transition-all shadow-md cursor-pointer text-center mt-2"
                    >
                      Book Table
                    </button>
                  </form>
                ) : (
                  /* Reservation Success UI */
                  <div className="flex flex-col items-center text-center gap-4 py-8">
                    <CheckCircle className="w-16 h-16 text-[#25D366] stroke-1" />
                    <h3 className="font-serif text-2xl text-primary font-medium tracking-wide">
                      Reservation Requested
                    </h3>
                    <p className="font-sans text-xs md:text-sm text-dark-slate/85 font-light leading-relaxed max-w-xs">
                      Thank you, <span className="font-semibold">{name}</span>. A reservation request for <span className="font-semibold">{guests} guests</span> on <span className="font-semibold">{date}</span> at <span className="font-semibold">{time}</span> has been logged. We will email confirmation within 15 minutes.
                    </p>
                    <button
                      onClick={closeModal}
                      className="bg-primary text-gold border border-gold/15 hover:bg-gold hover:text-primary px-8 py-2.5 rounded-sm font-sans text-xs tracking-widest uppercase font-bold transition-all shadow-md cursor-pointer mt-4"
                    >
                      Close Window
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
