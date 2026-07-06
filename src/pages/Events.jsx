import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Briefcase, Award, CheckCircle, Calendar, Users, Mail, X } from "lucide-react";
import canvasConfetti from "canvas-confetti";

export default function Events() {
  const [rfpSubmitted, setRfpSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [eventType, setEventType] = useState("Wedding");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("50");
  const [details, setDetails] = useState("");

  const handleSubmitRFP = (e) => {
    e.preventDefault();
    if (name.trim() && email.trim() && date.trim()) {
      setRfpSubmitted(true);
      // Trigger event confetti
      canvasConfetti({
        particleCount: 100,
        spread: 70,
        colors: ["#D4AF37", "#0F172A", "#FFFFFF"]
      });
    }
  };

  const resetForm = () => {
    setRfpSubmitted(false);
    setName("");
    setEmail("");
    setEventType("Wedding");
    setDate("");
    setGuests("50");
    setDetails("");
  };

  const weddingPackages = [
    {
      title: "Oceanic Sunset Vows",
      price: "12,500",
      description: "A breathtaking beachfront ceremony framed by reflection pools and tall palms. Perfect for intimate vows as the sun dips below the horizon.",
      highlights: ["Sunset beach pavilion altar", "Rose petal aisle & premium floral arches", "Champagne toast for up to 30 guests", "Live acoustic violinist / harpist"]
    },
    {
      title: "Ivory Lagoon Ceremony",
      price: "24,000",
      description: "An ultra-luxury overwater glass chapel ceremony with a floating wooden walkway. Designed to merge boundary-free views with absolute elegance.",
      highlights: ["Exclusive use of Overwater Chapel", "Bespoke floral setups & floating candles", "Cocktail hour with hot canapés", "Four-course dinner by Chef Jean-Georges"]
    },
    {
      title: "Royal Palace Banquet",
      price: "45,000",
      description: "Our grandest package. Includes full-day buyout of the Grand Royal Ballroom, an epic sunset beach vow exchange, and a midnight fireworks display.",
      highlights: ["Buyout of Grand Royal Ballroom & Beach Altars", "10-piece live orchestra & customized lighting", "Multi-cuisine gourmet buffet for up to 200 guests", "Midnight firework & private yacht check-out"]
    }
  ];

  const corporatePackages = [
    {
      title: "Executive Ocean Retreat",
      desc: "Conduct high-stakes decisions overlooking the turquoise sea. Includes native 4K meeting screens, high-fidelity teleconferencing, and private butler service.",
      icon: Briefcase
    },
    {
      title: "Resort Buyout Summit",
      desc: "Merge work with absolute wellness. Buy out sections of the resort for multi-day summits, incorporating customized chef luncheons, wellness therapies, and yacht charters.",
      icon: Award
    }
  ];

  return (
    <div className="pt-24 md:pt-28 font-sans">
      {/* 1. Header Banner */}
      <section className="relative h-[320px] md:h-[400px] flex items-center justify-center overflow-hidden mb-20 border-b border-gold/15">
        <div className="absolute inset-0 bg-primary/65 z-10" />
        <img
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1920&q=80"
          alt="Beachfront wedding ceremony setup"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center text-white px-6">
          <motion.span
            className="text-gold tracking-[0.3em] text-xs uppercase block mb-3 font-semibold"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            CELEBRATIONS
          </motion.span>
          <motion.h1
            className="font-serif text-3xl md:text-5xl lg:text-6xl font-light tracking-wide"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Luxury Weddings & Events
          </motion.h1>
        </div>
      </section>

      {/* 2. Weddings Showcase */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-32">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-gold tracking-[0.25em] text-xs font-bold uppercase mb-3 flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 fill-gold stroke-none" /> ETERNAL MEMORIES
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-primary font-light tracking-wide mb-6">
            Bespoke Wedding Packages
          </h2>
          <p className="font-sans text-sm md:text-base text-dark-slate/85 font-light max-w-2xl">
            Vow under the palms, float over the lagoon, or celebrate inside our grand ballroom. Our wedding planners craft details tailored to your dream.
          </p>
        </div>

        {/* Wedding Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {weddingPackages.map((pkg, i) => (
            <motion.div
              key={i}
              className="bg-white border border-primary/5 rounded p-8 flex flex-col hover:shadow-xl transition-all duration-500 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <h3 className="font-serif text-xl md:text-2xl text-primary font-medium tracking-wide mb-2 group-hover:text-gold transition-colors text-left">
                {pkg.title}
              </h3>
              <span className="font-serif text-xl text-gold font-light tracking-wide mb-6 text-left">
                From ${pkg.price} <span className="text-[10px] uppercase font-sans text-dark-slate/50">USD</span>
              </span>
              <p className="font-sans text-xs md:text-sm text-dark-slate/80 font-light leading-relaxed mb-6 text-left">
                {pkg.description}
              </p>
              
              <ul className="flex flex-col gap-3.5 mb-8 border-t border-primary/10 pt-6 text-left">
                {pkg.highlights.map((hl, hlIdx) => (
                  <li key={hlIdx} className="text-xs text-dark-slate/85 font-light flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-1.5" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Corporate Summit / Meetings */}
      <section className="bg-primary text-white py-24 mb-32 border-t border-b border-gold/15">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Details */}
            <div className="flex flex-col items-start text-left">
              <span className="text-gold tracking-[0.25em] text-xs font-bold uppercase mb-3">
                BUSINESS SUMMITS
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-white font-light tracking-wide mb-6">
                Executive Summits & Retreats
              </h2>
              <p className="text-white/70 text-sm md:text-base font-light leading-relaxed mb-8">
                Combine complex corporate discussions with unparalleled physical relaxation. We design multi-day itineraries incorporating high-tech conference spaces, custom Sommelier tastings, and deep-sea yacht retreats.
              </p>
              
              <div className="flex flex-col gap-6 w-full">
                {corporatePackages.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex gap-4 items-start border-l border-gold/30 pl-4 py-1">
                      <Icon className="w-5 h-5 text-gold shrink-0 mt-1" />
                      <div>
                        <h4 className="font-serif text-base text-white tracking-wide font-medium">{item.title}</h4>
                        <p className="text-white/50 text-xs mt-1 leading-relaxed font-light">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Corporate Image Showcase */}
            <div className="w-full aspect-[16/10] rounded overflow-hidden shadow-2xl border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80"
                alt="Corporate reception ballroom"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Request for Proposal Inquiry Form */}
      <section className="max-w-3xl mx-auto px-6 mb-32 text-left">
        <div className="bg-white border border-primary/5 p-8 md:p-12 rounded-lg shadow-sm">
          {!rfpSubmitted ? (
            <form onSubmit={handleSubmitRFP} className="flex flex-col gap-6">
              <div className="border-b border-primary/10 pb-4 text-center">
                <h3 className="font-serif text-2xl text-primary font-medium tracking-wide">
                  Request A Proposal (RFP)
                </h3>
                <p className="text-xs text-dark-slate/50 mt-1">
                  Connect with our dedicated events planning directors.
                </p>
              </div>

              <div>
                <label className="text-[10px] tracking-widest uppercase text-primary/70 font-bold block mb-1.5">
                  Contact Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-light-gray border border-primary/5 rounded px-4 py-2.5 text-xs outline-none focus:border-gold"
                  placeholder="Sarah Jenkins"
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
                  placeholder="sarah@events.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] tracking-widest uppercase text-primary/70 font-bold block mb-1.5">
                    Event Type
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full bg-light-gray border border-primary/5 rounded px-4 py-2.5 text-xs outline-none focus:border-gold cursor-pointer"
                  >
                    <option value="Wedding">Wedding</option>
                    <option value="Corporate">Corporate Summit</option>
                    <option value="Anniversary">Anniversary / Birthday</option>
                    <option value="Other">Other Occasions</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] tracking-widest uppercase text-primary/70 font-bold block mb-1.5">
                    Proposed Date
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
              </div>

              <div>
                <label className="text-[10px] tracking-widest uppercase text-primary/70 font-bold block mb-1.5">
                  Estimated Guest Count
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-2.5 w-3.5 h-3.5 text-gold" />
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full bg-light-gray border border-primary/5 rounded pl-9 pr-3 py-2.5 text-xs outline-none focus:border-gold cursor-pointer"
                  >
                    <option value="10">Under 20 guests</option>
                    <option value="50">20 – 50 guests</option>
                    <option value="100">50 – 100 guests</option>
                    <option value="200">100 – 200 guests</option>
                    <option value="500">200+ guests</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] tracking-widest uppercase text-primary/70 font-bold block mb-1.5">
                  Celebration Requirements / Details
                </label>
                <textarea
                  required
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full bg-light-gray border border-primary/5 rounded px-4 py-2 text-xs outline-none focus:border-gold resize-none h-24"
                  placeholder="Detail your dream banquet setup, custom menus, room buyouts, etc."
                />
              </div>

              <button
                type="submit"
                className="bg-primary text-gold border border-gold/15 hover:bg-gold hover:text-primary py-3.5 rounded-sm font-sans text-xs tracking-widest uppercase font-bold transition-all shadow-md cursor-pointer text-center"
              >
                Submit Proposal Inquiry
              </button>
            </form>
          ) : (
            /* Proposal Confirmation */
            <div className="flex flex-col items-center text-center gap-4 py-6">
              <CheckCircle className="w-16 h-16 text-[#25D366] stroke-1" />
              <h3 className="font-serif text-2xl text-primary font-medium tracking-wide">
                Proposal Requested
              </h3>
              <p className="font-sans text-xs md:text-sm text-dark-slate/85 font-light leading-relaxed max-w-sm">
                Thank you, <span className="font-semibold">{name}</span>. Your inquiry for a <span className="font-semibold">{eventType}</span> package on <span className="font-semibold">{date}</span> has been logged. Our Wedding & Events Director will contact you within 24 hours with a customized itinerary proposal.
              </p>
              <button
                onClick={resetForm}
                className="bg-primary text-gold border border-gold/15 hover:bg-gold hover:text-primary px-8 py-2.5 rounded-sm font-sans text-xs tracking-widest uppercase font-bold transition-all shadow-md cursor-pointer mt-4"
              >
                Request Another Event
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
