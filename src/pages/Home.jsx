import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Users, ArrowRight, ShieldCheck, Star, Award, Compass, Heart } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

// Project dependencies
import { roomsData, testimonialsData, attractionsData, offersData } from "../data/mockData";
import RoomCard from "../components/ui/RoomCard";
import CountUp from "../components/ui/CountUp";

export default function Home() {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [roomType, setRoomType] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      `/booking?checkin=${checkIn}&checkout=${checkOut}&guests=${guests}&room=${roomType}`
    );
  };

  const stats = [
    { number: 5, suffix: "★", label: "Michelin Star standard rating" },
    { number: 120, suffix: "+", label: "Bespoke Oceanfront Rooms" },
    { number: 4, suffix: "", label: "Award-winning fine dining kitchens" },
    { number: 99, suffix: "%", label: "Guest satisfaction rate" }
  ];

  return (
    <div className="overflow-hidden">
      {/* 1. Full-Screen Cinematic Hero */}
      <section className="relative h-screen flex items-center justify-center">
        {/* Background Swiper Slider */}
        <div className="absolute inset-0 z-0">
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            loop={true}
            className="w-full h-full"
          >
            {[
              "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1920&q=80",
              "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1920&q=80",
              "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1920&q=80"
            ].map((url, i) => (
              <SwiperSlide key={i} className="w-full h-full">
                <div className="absolute inset-0 bg-primary/45 z-10" />
                <img
                  src={url}
                  alt={`Resort hero ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white flex flex-col items-center">
          <motion.span
            className="text-gold tracking-[0.3em] text-xs lg:text-sm uppercase font-semibold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            A Sanctuary of Quiet Elegance
          </motion.span>
          <motion.h1
            className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight font-light mb-6 tracking-wide"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Escape to Unrivaled Luxury
          </motion.h1>
          <motion.p
            className="text-white/80 font-sans text-sm md:text-lg tracking-wide max-w-2xl mb-10 font-light leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Welcome to AMAN SERENITY, where the deep turquoise waters of the Maldives blend into private infinity sanctuaries. Discover luxury tailored to your soul.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              to="/booking"
              className="bg-gold hover:bg-gold-hover text-primary px-8 py-3.5 rounded-sm font-sans text-xs tracking-widest uppercase font-semibold transition-all duration-300 shadow-lg cursor-pointer"
            >
              Book Your Stay
            </Link>
            <Link
              to="/rooms"
              className="border border-white/40 hover:border-gold hover:bg-white/10 px-8 py-3.5 rounded-sm font-sans text-xs tracking-widest uppercase font-semibold transition-all duration-300 cursor-pointer"
            >
              Explore Suites
            </Link>
          </motion.div>
        </div>

        {/* Floating Scroll indicator */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
          <motion.div
            className="w-[1px] h-12 bg-white/20 relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              className="absolute top-0 left-0 right-0 h-4 bg-gold"
              animate={{ y: [0, 48, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </section>

      {/* 2. Embedded Quick Booking Widget */}
      <section className="relative z-20 max-w-6xl mx-auto px-6 -mt-16 mb-24">
        <div className="glassmorphism-dark border border-gold/15 p-6 lg:p-8 rounded shadow-2xl">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-end">
            <div>
              <label className="text-[10px] tracking-widest uppercase text-white/60 font-semibold block mb-2">
                Check-In Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-gold" />
                <input
                  type="date"
                  required
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-gold text-white/90 text-xs px-10 py-3.5 rounded-sm outline-none cursor-pointer"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] tracking-widest uppercase text-white/60 font-semibold block mb-2">
                Check-Out Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-gold" />
                <input
                  type="date"
                  required
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-gold text-white/90 text-xs px-10 py-3.5 rounded-sm outline-none cursor-pointer"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] tracking-widest uppercase text-white/60 font-semibold block mb-2">
                Guests
              </label>
              <div className="relative">
                <Users className="absolute left-3.5 top-3 w-4 h-4 text-gold" />
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full bg-primary border border-white/10 focus:border-gold text-white/90 text-xs px-10 py-3.5 rounded-sm outline-none cursor-pointer appearance-none"
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5">5+ Guests</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[10px] tracking-widest uppercase text-white/60 font-semibold block mb-2">
                Select Suite
              </label>
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="w-full bg-primary border border-white/10 focus:border-gold text-white/90 text-xs px-4 py-3.5 rounded-sm outline-none cursor-pointer appearance-none"
              >
                <option value="">Any Suite</option>
                <option value="deluxe-room">Deluxe Garden Room</option>
                <option value="premium-room">Premium Ocean Room</option>
                <option value="executive-suite">Executive Oasis Suite</option>
                <option value="honeymoon-suite">Honeymoon Sanctuary</option>
                <option value="presidential-suite">Presidential Palace</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-gold hover:bg-gold-hover text-primary py-3.5 rounded-sm text-xs tracking-widest uppercase font-bold transition-all shadow-md cursor-pointer hover:shadow-gold/25"
              >
                Check Rates
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* 3. Luxury Story Showcase & Image Reveal */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-start"
        >
          <span className="text-gold tracking-[0.25em] text-xs font-bold uppercase mb-3">
            Since 1988
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-primary font-light tracking-wide mb-6 leading-tight">
            Designed to Harmonize With Nature
          </h2>
          <p className="font-sans text-sm md:text-base text-dark-slate/80 leading-relaxed font-light mb-6">
            Aman Serenity was conceptualized with a single purpose: to blend boundary-free architectures with the pristine coral sand dunes of Malé. Here, private overwater walkways carve routes over ancient marine gardens. 
          </p>
          <p className="font-sans text-sm md:text-base text-dark-slate/85 leading-relaxed font-light mb-8">
            Every element—from hand-carved local teak decks to custom salt-resistant glass windows—is meticulously polished to deliver uninterrupted oceanic reflections. Come, explore space reimagined around peace.
          </p>
          <Link
            to="/about"
            className="group font-sans text-xs tracking-[0.25em] uppercase font-bold text-primary hover:text-gold transition-colors flex items-center gap-2"
          >
            Discover Our Story
            <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Dual Stacked Overlapping Images */}
        <div className="relative w-full h-[450px] lg:h-[550px] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-[75%] h-[75%] absolute top-0 left-0 rounded overflow-hidden shadow-2xl border border-primary/5"
          >
            <img
              src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
              alt="Luxury Dining Interior"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="w-[65%] h-[65%] absolute bottom-0 right-0 rounded overflow-hidden shadow-2xl border-4 border-ivory"
          >
            <img
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
              alt="Spa Zen room"
              className="w-full h-full object-cover animate-pulse-slow"
            />
          </motion.div>
        </div>
      </section>

      {/* 4. Stats Banner */}
      <section className="bg-primary text-white py-20 border-t border-b border-gold/15 mb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <span className="font-serif text-4xl lg:text-5xl text-gold font-light tracking-wide mb-2">
                <CountUp end={stat.number} suffix={stat.suffix} />
              </span>
              <p className="text-white/60 text-xs md:text-sm tracking-wider font-light max-w-[200px] leading-relaxed">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Featured Suites Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-32">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-gold tracking-[0.25em] text-xs font-bold uppercase mb-3">
            ACCOMMODATION
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-primary font-light tracking-wide mb-6">
            Featured Suites & Residences
          </h2>
          <p className="font-sans text-sm md:text-base text-dark-slate/85 font-light max-w-2xl">
            Each villa is built in complete isolation with local teak decks, a private pool, and floor-to-ceiling windows overlooking the sunset.
          </p>
        </div>

        {/* Grid showing top 3 suites */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {roomsData.slice(0, 3).map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <RoomCard room={room} />
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link
            to="/rooms"
            className="bg-primary text-gold border border-gold/15 hover:bg-gold hover:text-primary px-8 py-3.5 rounded-sm font-sans text-xs tracking-widest uppercase font-semibold transition-all duration-300 shadow-md cursor-pointer"
          >
            View All Suites
          </Link>
        </div>
      </section>

      {/* 6. Experiences Carousel Preview */}
      <section className="bg-primary text-white py-24 mb-32 border-t border-b border-gold/15">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-4 flex flex-col items-start">
            <span className="text-gold tracking-[0.25em] text-xs font-bold uppercase mb-3">
              EXQUISITE EXPERIENCES
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl text-white font-light tracking-wide mb-6 leading-tight">
              A Symphony of Luxury Living
            </h2>
            <p className="text-white/70 text-sm font-light leading-relaxed mb-8">
              Whether indulging in ancient therapies inside our overwater spa, yachting at sunset, or dining on dishes compiled by three-Michelin-starred Chef Jean-Georges, every hour is tailored to elevate your senses.
            </p>
            <div className="flex gap-4">
              <Link
                to="/amenities"
                className="bg-gold text-primary hover:bg-gold-hover px-6 py-3 rounded-sm font-sans text-xs tracking-widest uppercase font-bold transition-all shadow-md cursor-pointer"
              >
                Amenities
              </Link>
              <Link
                to="/restaurant"
                className="border border-white/20 hover:border-gold px-6 py-3 rounded-sm font-sans text-xs tracking-widest uppercase font-bold transition-all cursor-pointer"
              >
                Fine Dining
              </Link>
            </div>
          </div>

          {/* Large Image Sliders */}
          <div className="lg:col-span-8 w-full rounded overflow-hidden shadow-2xl border border-gold/10">
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 4500 }}
              pagination={{ clickable: true }}
              loop={true}
              className="w-full h-[400px] lg:h-[480px]"
            >
              {[
                {
                  title: "Aman Spa Holistic Healing",
                  img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
                  tag: "WELLNESS"
                },
                {
                  title: "Sunset Catamaran Charter",
                  img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
                  tag: "ADVENTURE"
                },
                {
                  title: "Fine Dining under the Palms",
                  img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
                  tag: "GASTRONOMY"
                }
              ].map((item, i) => (
                <SwiperSlide key={i} className="relative w-full h-full">
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent z-10" />
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-10 left-10 z-20 text-left">
                    <span className="text-[10px] tracking-[0.25em] text-gold font-bold uppercase block mb-2">
                      {item.tag}
                    </span>
                    <h3 className="font-serif text-xl md:text-2xl text-white font-light tracking-wide">
                      {item.title}
                    </h3>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* 7. Interactive Testimonials & Google Reviews */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-32">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-gold tracking-[0.25em] text-xs font-bold uppercase mb-3">
            TESTIMONIALS
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-primary font-light tracking-wide mb-6">
            Words From Our Honored Guests
          </h2>
          <p className="font-sans text-sm md:text-base text-dark-slate/85 font-light max-w-2xl">
            Read verified reviews from leading travel publications and luxury enthusiasts who have made Aman Serenity their second home.
          </p>
        </div>

        {/* Testimonials Swiper */}
        <div className="max-w-4xl mx-auto">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop={true}
            className="pb-16"
          >
            {testimonialsData.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="bg-white border border-primary/5 rounded-lg p-8 md:p-12 text-center shadow-sm flex flex-col items-center">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-gold mb-6">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-gold stroke-none" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="font-serif text-base md:text-xl lg:text-2xl text-primary/85 leading-relaxed font-light italic mb-8 max-w-2xl">
                    "{item.text}"
                  </p>

                  {/* Avatar and name */}
                  <div className="flex items-center gap-4 text-left">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover border border-gold/25"
                    />
                    <div>
                      <h4 className="font-sans text-sm font-bold text-primary tracking-wide">
                        {item.name}
                      </h4>
                      <p className="font-sans text-xs text-white/0 text-dark-slate/60 font-light">
                        {item.role} • <span className="text-gold font-semibold uppercase">{item.platform}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* 8. Escape Banner Call to Action */}
      <section className="relative h-[450px] flex items-center justify-center overflow-hidden border-t border-b border-gold/15">
        <div className="absolute inset-0 bg-primary/65 z-10" />
        <img
          src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1920&q=80"
          alt="Maldives sunrise"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center text-white flex flex-col items-center">
          <Star className="w-8 h-8 text-gold mb-4 fill-gold animate-bounce-slow" />
          <h2 className="font-serif text-3xl md:text-5xl text-white font-light tracking-wide mb-6 leading-tight">
            Escape to a World of Quiet Serenity
          </h2>
          <p className="text-white/80 font-sans text-sm md:text-base tracking-wide max-w-xl mb-10 font-light leading-relaxed">
            Reserve your luxury experience directly on our official website today and unlock exclusive benefits, including a complimentary villa upgrade on check-in.
          </p>
          <Link
            to="/booking"
            className="bg-gold hover:bg-gold-hover text-primary px-8 py-3.5 rounded-sm font-sans text-xs tracking-widest uppercase font-bold transition-all duration-300 shadow-lg cursor-pointer"
          >
            Begin Your Booking
          </Link>
        </div>
      </section>
    </div>
  );
}
