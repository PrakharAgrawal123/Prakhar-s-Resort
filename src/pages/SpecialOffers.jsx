import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Tag, ShieldCheck, ArrowRight } from "lucide-react";
import { offersData } from "../data/mockData";

export default function SpecialOffers() {
  return (
    <div className="pt-24 md:pt-28 font-sans">
      {/* 1. Header Banner */}
      <section className="relative h-[280px] md:h-[350px] flex items-center justify-center overflow-hidden mb-16 border-b border-gold/15">
        <div className="absolute inset-0 bg-primary/60 z-10" />
        <img
          src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1920&q=80"
          alt="Luxury lagoon resort background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center text-white px-6">
          <motion.span
            className="text-gold tracking-[0.3em] text-xs uppercase block mb-3 font-semibold"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            EXCLUSIVES
          </motion.span>
          <motion.h1
            className="font-serif text-3xl md:text-5xl lg:text-6xl font-light tracking-wide"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Exclusive Packages & Offers
          </motion.h1>
        </div>
      </section>

      {/* 2. Offers Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-32">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-gold tracking-[0.25em] text-xs font-bold uppercase mb-3">
            TEMPTING SCENARIOS
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-primary font-light tracking-wide mb-6">
            Bespoke Vacation Experiences
          </h2>
          <p className="font-sans text-sm md:text-base text-dark-slate/85 font-light max-w-2xl">
            Take advantage of special seasonal upgrades, wellness retreats, or all-inclusive overwater sanctuaries, available only when booking directly.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offersData.map((offer, index) => {
            // Setup promo code link
            let promoParam = "";
            let roomParam = "";
            if (offer.id === "offer-1") {
              promoParam = "RETREAT20";
            } else if (offer.id === "offer-2") {
              roomParam = "honeymoon-suite";
              promoParam = "HONEYMOON";
            } else if (offer.id === "offer-3") {
              promoParam = "WELLNESS";
            }

            return (
              <motion.div
                key={offer.id}
                className="bg-white border border-primary/5 rounded overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col group h-full"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                {/* Photo */}
                <div className="h-64 overflow-hidden relative shrink-0">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 z-10 glassmorphism-dark text-gold px-4 py-1.5 rounded-sm font-sans font-bold text-[9px] tracking-widest uppercase border border-gold/20">
                    {offer.type}
                  </div>
                  {/* Discount ribbon */}
                  <div className="absolute bottom-4 right-4 z-10 bg-gold text-primary px-3.5 py-1.5 rounded-sm font-serif font-medium text-xs tracking-wider shadow-md">
                    {offer.discount}
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 md:p-8 flex flex-col flex-grow text-left">
                  <h3 className="font-serif text-lg md:text-xl text-primary font-medium tracking-wide mb-3 group-hover:text-gold transition-colors leading-snug">
                    {offer.title}
                  </h3>

                  <p className="font-sans text-xs md:text-sm text-dark-slate/85 font-light leading-relaxed mb-6 flex-grow">
                    {offer.description}
                  </p>

                  <div className="border-t border-primary/10 pt-4 mt-auto flex flex-col gap-3">
                    {/* Expiry date */}
                    <div className="flex items-center gap-2.5 text-xs text-dark-slate/60 font-light">
                      <Calendar className="w-4 h-4 text-gold" />
                      <span>Valid Until: {offer.validUntil}</span>
                    </div>

                    {/* Promo Code hint */}
                    <div className="flex items-center gap-2.5 text-xs text-dark-slate/60 font-light">
                      <Tag className="w-4 h-4 text-gold" />
                      <span>Promo Code: <strong className="text-primary font-semibold font-mono">{promoParam}</strong></span>
                    </div>

                    {/* CTA Booking Link */}
                    <Link
                      to={`/booking?promo=${promoParam}${roomParam ? `&room=${roomParam}` : ""}`}
                      className="border border-primary/20 hover:border-gold hover:bg-primary hover:text-white group/btn px-5 py-3 rounded-sm font-sans text-xs tracking-widest uppercase font-semibold transition-all duration-300 flex items-center justify-center gap-2 mt-4 cursor-pointer"
                    >
                      Claim This Offer
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1.5 transition-transform duration-300 text-gold" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. Direct booking assurances */}
      <section className="bg-primary text-white py-16 border-t border-gold/15">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {[
            { title: "Best Rate Guarantee", desc: "If you find a lower rate within 24 hours of booking, we will match it and offer a complimentary dinner." },
            { title: "Complimentary Suite Upgrade", desc: "Subject to availability upon check-in, direct website bookings receive priority villa upgrades." },
            { title: "Flexible Cancellation", desc: "Cancel or modify your bookings up to 7 days prior to check-in with zero transaction charges." }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center p-4">
              <ShieldCheck className="w-8 h-8 text-gold mb-4 stroke-1" />
              <h4 className="font-serif text-base text-white font-medium mb-2 tracking-wide">{item.title}</h4>
              <p className="text-white/50 text-xs leading-relaxed font-light max-w-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
