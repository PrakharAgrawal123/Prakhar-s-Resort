import { motion } from "framer-motion";
import { Award, Compass, Heart, Shield, Landmark } from "lucide-react";
import { teamData } from "../data/mockData";

export default function About() {
  const timelineMilestones = [
    {
      year: "1988",
      title: "The Vision",
      desc: "Founder Sir Adrian Zecha selects South Malé Atoll for its pristine turquoise lagoon, envisioning a sanctuary built entirely around space and peace."
    },
    {
      year: "1994",
      title: "Grand Opening",
      desc: "Aman Serenity opens its doors, introducing the world to overwater architecture and an unprecedented 1:4 guest-to-staff ratio."
    },
    {
      year: "2008",
      title: "Wellness Sanctuary Launch",
      desc: "Our holistic overwater spa pavilion is inaugurated, combining Ayurvedic rituals with modern cellular wellness therapies."
    },
    {
      year: "2020",
      title: "Carbon-Neutral Renovation",
      desc: "A full-resort renovation integrates state-of-the-art solar roofs, localized water filtration, and zero-waste kitchens, setting a benchmark for eco-luxury."
    }
  ];

  const coreValues = [
    {
      icon: Shield,
      title: "Complete Discretion",
      desc: "We guard our guests' privacy and serenity with absolute dedication, offering private entrances and soundproof natural barriers."
    },
    {
      icon: Heart,
      title: "Warm Hospitality",
      desc: "Our relationship with guests goes beyond service; it is a warm, anticipatory connection that makes Aman Serenity feel like a second home."
    },
    {
      icon: Compass,
      title: "Ecological Harmony",
      desc: "We build alongside nature, preserving coral reefs, protecting coastal sea flora, and maintaining carbon-neutral operations."
    }
  ];

  const awards = [
    { award: "World's Best Resort — Conde Nast Traveler", year: "2025" },
    { award: "Best Wellness Retreat — Travel + Leisure", year: "2024" },
    { award: "Michelin Guide — 3 Keys Hotel rating", year: "2026" },
    { award: "Global Eco-Hospitality Award — Green Globe", year: "2025" }
  ];

  return (
    <div className="pt-24 md:pt-28 font-sans">
      {/* 1. Header Banner */}
      <section className="relative h-[320px] md:h-[400px] flex items-center justify-center overflow-hidden mb-20 border-b border-gold/15">
        <div className="absolute inset-0 bg-primary/60 z-10" />
        <img
          src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1920&q=80"
          alt="Resort beach sunset"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center text-white px-6">
          <motion.span
            className="text-gold tracking-[0.3em] text-xs uppercase block mb-3 font-semibold"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            OUR HERITAGE
          </motion.span>
          <motion.h1
            className="font-serif text-3xl md:text-5xl lg:text-6xl font-light tracking-wide"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            The Story of Aman Serenity
          </motion.h1>
        </div>
      </section>

      {/* 2. Brand Story / Welcome Letter */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-32 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Founder Letter */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <span className="text-gold tracking-[0.25em] text-xs font-bold uppercase mb-3">
            A LETTER FROM THE FOUNDER
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-primary font-light tracking-wide mb-6">
            Quietude is the Ultimate Luxury
          </h2>
          <div className="font-sans text-sm md:text-base text-dark-slate/85 font-light leading-relaxed flex flex-col gap-5">
            <p>
              "When we laid the first stone of Aman Serenity in the late 1980s, the Maldives was an untouched landscape of pure nature. We did not set out to build a hotel. We set out to build a home away from home, where the boundaries between the sea and the room dissolve."
            </p>
            <p>
              "We realized that true luxury is not about opulent gold chandeliers or crowded lobbies. True luxury is space. It is time. It is the ability to walk along a beach and hear nothing but the ocean breeze and the gentle call of native birds. It is having your favorite vintage prepared at the perfect temperature before you even request it."
            </p>
            <p>
              "We invite you to step away from the noise of the modern world and enter our sanctuary. Reconnect with yourself, with your loved ones, and with the elements."
            </p>
          </div>
          {/* Signature */}
          <div className="mt-8 flex flex-col items-start border-t border-primary/10 pt-4 w-full">
            <span className="font-serif text-2xl italic text-gold tracking-wide">Adrian Zecha</span>
            <span className="text-xs text-dark-slate/50 font-sans tracking-widest uppercase mt-1">Founder, Aman Serenity</span>
          </div>
        </div>

        {/* Large Aesthetic Image Stack */}
        <div className="lg:col-span-5 w-full aspect-[4/5] rounded overflow-hidden shadow-2xl border border-gold/15 relative">
          <img
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
            alt="Spa wellness room"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* 3. Core Values Deck */}
      <section className="bg-primary text-white py-24 mb-32 border-t border-b border-gold/15">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-gold tracking-[0.25em] text-xs font-bold uppercase mb-3">
              WHAT DRIVES US
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-white font-light tracking-wide">
              Our Core Philosophies
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {coreValues.map((val, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center text-center p-6 border border-white/5 bg-white/5 rounded-sm"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <span className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center mb-6">
                  <val.icon className="w-5 h-5 text-gold" />
                </span>
                <h3 className="font-serif text-lg text-white font-medium mb-3 tracking-wide">{val.title}</h3>
                <p className="text-white/60 text-xs md:text-sm font-light leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Timeline / History */}
      <section className="max-w-4xl mx-auto px-6 mb-32">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-gold tracking-[0.25em] text-xs font-bold uppercase mb-3">
            MILESTONES
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-primary font-light tracking-wide">
            Our Historic Timeline
          </h2>
        </div>

        {/* Timeline Line */}
        <div className="relative border-l border-gold/30 pl-8 ml-4 flex flex-col gap-12">
          {timelineMilestones.map((item, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              {/* Bullet node */}
              <span className="absolute -left-12 top-1.5 w-8 h-8 rounded-full bg-gold border-4 border-ivory flex items-center justify-center shadow-md">
                <Landmark className="w-3 h-3 text-primary" />
              </span>

              {/* Content box */}
              <div className="bg-white border border-primary/5 p-6 rounded shadow-sm">
                <span className="font-serif text-xl text-gold font-light tracking-widest block mb-2">
                  {item.year}
                </span>
                <h3 className="font-serif text-lg text-primary font-medium tracking-wide mb-2">
                  {item.title}
                </h3>
                <p className="font-sans text-xs md:text-sm text-dark-slate/85 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Team Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-32">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-gold tracking-[0.25em] text-xs font-bold uppercase mb-3">
            OUR GUARDIANS
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-primary font-light tracking-wide mb-6">
            Meet the Leadership Team
          </h2>
          <p className="font-sans text-sm md:text-base text-dark-slate/85 font-light max-w-2xl">
            Passionate hospitality professionals dedicated to crafting flawless experiences for every guest.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamData.map((member, index) => (
            <motion.div
              key={member.id}
              className="bg-white border border-primary/5 rounded overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              {/* Photo */}
              <div className="h-80 overflow-hidden relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Bio Details */}
              <div className="p-6 md:p-8 flex flex-col flex-grow text-center items-center">
                <h3 className="font-serif text-lg md:text-xl text-primary font-medium tracking-wide mb-1 group-hover:text-gold transition-colors">
                  {member.name}
                </h3>
                <span className="text-[10px] font-sans tracking-widest text-gold font-bold uppercase mb-4">
                  {member.role}
                </span>
                <p className="font-sans text-xs md:text-sm text-dark-slate/75 leading-relaxed font-light">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. Awards */}
      <section className="bg-primary text-white py-20 border-t border-gold/15">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-start">
            <span className="text-gold tracking-[0.25em] text-xs font-bold uppercase mb-3">
              RECOGNITIONS
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-white font-light tracking-wide mb-6">
              Global Accolades & Awards
            </h2>
            <p className="text-white/60 text-sm font-light leading-relaxed">
              Our quest for quiet perfection has earned us recognition from major international publications. While these titles honor us, our greatest reward remains the satisfaction of our guests.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {awards.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b border-white/10 pb-4 text-sm font-light text-white/80 hover:text-gold transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-gold" />
                  <span>{item.award}</span>
                </div>
                <span className="text-white/40">{item.year}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
