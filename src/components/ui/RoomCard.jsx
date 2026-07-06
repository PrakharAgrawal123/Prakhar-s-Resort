import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade } from "swiper/modules";
import { Users, Maximize2, BedDouble, Eye, ArrowRight } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function RoomCard({ room }) {
  return (
    <div className="bg-white border border-primary/5 rounded overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col group h-full">
      {/* Image Swiper section */}
      <div className="relative h-64 md:h-72 overflow-hidden shrink-0">
        <Swiper
          modules={[Navigation, Pagination, EffectFade]}
          navigation
          pagination={{ clickable: true }}
          effect="fade"
          loop={true}
          className="w-full h-full"
        >
          {room.images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`${room.name} view ${index + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Floating Price Tag */}
        <div className="absolute top-4 right-4 z-10 glassmorphism-dark text-gold px-4 py-1.5 rounded-sm font-serif font-light text-sm tracking-widest border border-gold/20">
          ${room.price} <span className="text-[10px] uppercase font-sans text-white/60">/ Night</span>
        </div>
      </div>

      {/* Details Section */}
      <div className="p-6 md:p-8 flex flex-col flex-grow">
        {/* Category tag */}
        <span className="text-[10px] font-sans tracking-[0.25em] text-gold uppercase font-bold block mb-2">
          {room.category}
        </span>

        {/* Room Title */}
        <h3 className="font-serif text-xl md:text-2xl text-primary font-medium tracking-wide mb-3 leading-snug group-hover:text-gold transition-colors">
          {room.name}
        </h3>

        {/* Room Description */}
        <p className="font-sans text-xs md:text-sm text-dark-slate/75 font-light leading-relaxed mb-6 flex-grow">
          {room.description}
        </p>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-4 border-t border-b border-primary/10 py-4 mb-6">
          <div className="flex items-center gap-2.5 text-xs text-dark-slate/85 font-light">
            <Maximize2 className="w-4 h-4 text-gold shrink-0" />
            <span>Size: {room.size}</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-dark-slate/85 font-light">
            <Users className="w-4 h-4 text-gold shrink-0" />
            <span>Guests: {room.occupancy}</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-dark-slate/85 font-light">
            <BedDouble className="w-4 h-4 text-gold shrink-0" />
            <span>Beds: {room.bed}</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-dark-slate/85 font-light">
            <Eye className="w-4 h-4 text-gold shrink-0" />
            <span className="truncate">View: {room.view}</span>
          </div>
        </div>

        {/* Core Amenities bullets */}
        <div className="mb-6 flex flex-wrap gap-2">
          {room.amenities.slice(0, 3).map((amenity, i) => (
            <span
              key={i}
              className="text-[10px] font-sans tracking-wide text-primary/60 bg-light-gray px-2.5 py-1 rounded-sm"
            >
              {amenity}
            </span>
          ))}
          {room.amenities.length > 3 && (
            <span className="text-[10px] font-sans tracking-wide text-gold bg-gold/5 px-2.5 py-1 rounded-sm border border-gold/10">
              +{room.amenities.length - 3} More
            </span>
          )}
        </div>

        {/* CTA Link */}
        <Link
          to={`/booking?room=${room.id}`}
          className="mt-auto border border-primary/20 hover:border-gold hover:bg-primary hover:text-white group/btn px-6 py-3 rounded-sm font-sans text-xs tracking-widest uppercase font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
        >
          Book This Suite
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1.5 transition-transform duration-300 text-gold" />
        </Link>
      </div>
    </div>
  );
}
