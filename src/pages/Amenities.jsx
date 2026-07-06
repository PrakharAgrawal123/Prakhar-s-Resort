import { motion } from "framer-motion";
import { 
  Droplets, Sparkles, Dumbbell, Smile, Gamepad2, Trophy, 
  Briefcase, GlassWater, Heart, Wifi, Car, Compass, Flame, Wind, Flower, BookOpen, Music 
} from "lucide-react";
import { amenitiesData } from "../data/mockData";

const iconMap = {
  Droplets,
  Sparkles,
  Dumbbell,
  Smile,
  Gamepad2,
  Trophy,
  Briefcase,
  GlassWater,
  Heart,
  Wifi,
  Car,
  Compass,
  Flame,
  Wind,
  Flower,
  BookOpen,
  Music
};

export default function Amenities() {
  // Group amenities by category for structured layout
  const categories = ["Wellness & Leisure", "Leisure", "Adventure", "Services & Comfort", "Business & Events", "Family Friendly"];

  return (
    <div className="pt-24 md:pt-28 font-sans">
      {/* 1. Header Banner */}
      <section className="relative h-[280px] md:h-[350px] flex items-center justify-center overflow-hidden mb-16 border-b border-gold/15">
        <div className="absolute inset-0 bg-primary/60 z-10" />
        <img
          src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1920&q=80"
          alt="Luxury infinity pool background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center text-white px-6">
          <motion.span
            className="text-gold tracking-[0.3em] text-xs uppercase block mb-3 font-semibold"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            EXPERIENCES
          </motion.span>
          <motion.h1
            className="font-serif text-3xl md:text-5xl lg:text-6xl font-light tracking-wide"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Resort Amenities & Facilities
          </motion.h1>
        </div>
      </section>

      {/* 2. Structured Amenities Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-32">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-gold tracking-[0.25em] text-xs font-bold uppercase mb-3">
            WORLD-CLASS SERVICES
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-primary font-light tracking-wide mb-6">
            Designed for Absolute Comfort
          </h2>
          <p className="font-sans text-sm md:text-base text-dark-slate/85 font-light max-w-2xl">
            From the moment our private Rolls-Royce chauffeur meets you at airport customs to your sunset beach fire pits, enjoy fully integrated five-star assistance.
          </p>
        </div>

        {/* Categories loop */}
        <div className="flex flex-col gap-16">
          {categories.map((categoryName, catIdx) => {
            const catItems = amenitiesData.filter(item => item.category === categoryName);
            if (catItems.length === 0) return null;

            return (
              <div key={catIdx} className="flex flex-col gap-6 text-left">
                {/* Section Subheader */}
                <h3 className="font-serif text-xl md:text-2xl text-primary font-medium tracking-wide border-b border-primary/10 pb-3 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-gold block rounded-sm" />
                  {categoryName}
                </h3>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {catItems.map((item, index) => {
                    const IconComponent = iconMap[item.icon] || Compass;
                    return (
                      <motion.div
                        key={item.id}
                        className="bg-white border border-primary/5 p-6 rounded shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-4 group"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        {/* Icon Wrap */}
                        <div className="w-12 h-12 rounded bg-light-gray flex items-center justify-center shrink-0 border border-primary/5 group-hover:bg-primary transition-colors">
                          <IconComponent className="w-5 h-5 text-gold group-hover:text-white transition-colors" />
                        </div>

                        {/* Text Content */}
                        <div className="flex flex-col gap-1">
                          <h4 className="font-serif text-base text-primary font-semibold tracking-wide group-hover:text-gold transition-colors">
                            {item.name}
                          </h4>
                          <p className="font-sans text-xs md:text-sm text-dark-slate/80 leading-relaxed font-light">
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Bottom Feature Callout */}
      <section className="bg-primary text-white py-20 border-t border-gold/15">
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
          <Sparkles className="w-8 h-8 text-gold mb-4 fill-gold/10" />
          <h3 className="font-serif text-2xl lg:text-3xl text-white font-light tracking-wide mb-4">
            Custom Concierge Request
          </h3>
          <p className="text-white/60 text-sm font-light leading-relaxed max-w-2xl mb-8">
            Do you require helipad transport, custom dietary meal planning, or private island security setup? Contact our Guest Concierge team before your arrival, and we will configure everything.
          </p>
          <a
            href="tel:+1234567890"
            className="bg-gold text-primary hover:bg-gold-hover px-8 py-3.5 rounded-sm font-sans text-xs tracking-widest uppercase font-bold transition-all shadow-md cursor-pointer"
          >
            Call Guest Concierge
          </a>
        </div>
      </section>
    </div>
  );
}
