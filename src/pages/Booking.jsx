import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Users, FileText, Sparkles, CreditCard, CheckCircle, ArrowLeft, Tag, ShieldCheck } from "lucide-react";
import { roomsData } from "../data/mockData";
import canvasConfetti from "canvas-confetti";

export default function Booking() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Read URL params
  const checkinParam = searchParams.get("checkin") || "";
  const checkoutParam = searchParams.get("checkout") || "";
  const guestsParam = searchParams.get("guests") || "2";
  const roomParam = searchParams.get("room") || "";
  const promoParam = searchParams.get("promo") || "";

  // Form State
  const [checkIn, setCheckIn] = useState(checkinParam);
  const [checkOut, setCheckOut] = useState(checkoutParam);
  const [guests, setGuests] = useState(guestsParam);
  const [children, setChildren] = useState("0");
  const [selectedRoom, setSelectedRoom] = useState(roomParam);
  const [specialRequests, setSpecialRequests] = useState("");
  const [promoCode, setPromoCode] = useState(promoParam);

  // Validation & Calculations State
  const [dateError, setDateError] = useState("");
  const [nights, setNights] = useState(1);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);

  // Success State
  const [isBooked, setIsBooked] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  // Recalculate nights and prices dynamically
  useEffect(() => {
    if (checkIn && checkOut) {
      const inDate = new Date(checkIn);
      const outDate = new Date(checkOut);

      if (outDate <= inDate) {
        setDateError("Check-out date must be at least 1 day after check-in.");
        setNights(1);
      } else {
        setDateError("");
        const diffTime = Math.abs(outDate - inDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setNights(diffDays);
      }
    } else {
      setNights(1);
    }
  }, [checkIn, checkOut]);

  // Compute Prices
  useEffect(() => {
    const roomObj = roomsData.find((r) => r.id === selectedRoom);
    const roomPrice = roomObj ? roomObj.price : 0;
    const computedSubtotal = roomPrice * nights;
    setSubtotal(computedSubtotal);

    // Apply promo code discount (20%)
    const uppercasePromo = promoCode.toUpperCase().trim();
    if (
      computedSubtotal > 0 &&
      (uppercasePromo === "RETREAT20" ||
        uppercasePromo === "HONEYMOON" ||
        uppercasePromo === "WELLNESS")
    ) {
      const computedDiscount = computedSubtotal * 0.2;
      setDiscount(computedDiscount);
      setTotal(computedSubtotal - computedDiscount);
    } else {
      setDiscount(0);
      setTotal(computedSubtotal);
    }
  }, [selectedRoom, nights, promoCode]);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (dateError) return;

    if (checkIn && checkOut && selectedRoom) {
      // Generate booking reference
      const randomRef = "AMAN-" + Math.floor(100000 + Math.random() * 900000);
      setBookingRef(randomRef);
      setIsBooked(true);

      // Trigger Confetti
      canvasConfetti({
        particleCount: 150,
        spread: 80,
        colors: ["#D4AF37", "#0F172A", "#FFFFFF"],
        origin: { y: 0.6 }
      });
    }
  };

  const selectedRoomDetails = roomsData.find((r) => r.id === selectedRoom);

  return (
    <div className="pt-24 md:pt-28 font-sans">
      {/* 1. Header Banner */}
      <section className="relative h-[250px] md:h-[300px] flex items-center justify-center overflow-hidden mb-12 border-b border-gold/15">
        <div className="absolute inset-0 bg-primary/60 z-10" />
        <img
          src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1920&q=80"
          alt="Suites booking backdrop"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center text-white px-6">
          <motion.span
            className="text-gold tracking-[0.3em] text-xs uppercase block mb-3 font-semibold"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            RESERVATIONS
          </motion.span>
          <motion.h1
            className="font-serif text-3xl md:text-5xl lg:text-6xl font-light tracking-wide"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Book Your Sanctuary
          </motion.h1>
        </div>
      </section>

      {/* 2. Main Booking Forms Container */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-32">
        <AnimatePresence mode="wait">
          {!isBooked ? (
            <motion.div
              key="booking-form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
            >
              {/* Left Column: Form Details */}
              <div className="lg:col-span-8 bg-white border border-primary/5 p-6 md:p-8 rounded shadow-sm text-left">
                <h2 className="font-serif text-2xl text-primary font-light tracking-wide mb-6 border-b border-primary/10 pb-4">
                  Reservation Form
                </h2>

                <form onSubmit={handleBookingSubmit} className="flex flex-col gap-6">
                  {/* Select Room */}
                  <div>
                    <label className="text-[10px] tracking-widest uppercase text-primary/70 font-bold block mb-1.5">
                      Select Suite or Villa *
                    </label>
                    <select
                      required
                      value={selectedRoom}
                      onChange={(e) => setSelectedRoom(e.target.value)}
                      className="w-full bg-light-gray border border-primary/5 rounded px-4 py-3 text-xs outline-none focus:border-gold cursor-pointer"
                    >
                      <option value="">-- Choose a Suite --</option>
                      {roomsData.map((room) => (
                        <option key={room.id} value={room.id}>
                          {room.name} (${room.price} / night)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Dates Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] tracking-widest uppercase text-primary/70 font-bold block mb-1.5">
                        Check-In Date *
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-gold" />
                        <input
                          type="date"
                          required
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}
                          className="w-full bg-light-gray border border-primary/5 rounded pl-10 pr-4 py-3 text-xs outline-none focus:border-gold cursor-pointer"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] tracking-widest uppercase text-primary/70 font-bold block mb-1.5">
                        Check-Out Date *
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-gold" />
                        <input
                          type="date"
                          required
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                          className="w-full bg-light-gray border border-primary/5 rounded pl-10 pr-4 py-3 text-xs outline-none focus:border-gold cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Display Date Error */}
                  {dateError && (
                    <span className="text-xs text-red-500 font-medium">
                      {dateError}
                    </span>
                  )}

                  {/* Guests Dropdowns */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] tracking-widest uppercase text-primary/70 font-bold block mb-1.5">
                        Adults Count *
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3.5 top-3.5 w-4 h-4 text-gold" />
                        <select
                          value={guests}
                          onChange={(e) => setGuests(e.target.value)}
                          className="w-full bg-light-gray border border-primary/5 rounded pl-10 pr-4 py-3.5 text-xs outline-none focus:border-gold cursor-pointer"
                        >
                          <option value="1">1 Adult</option>
                          <option value="2">2 Adults</option>
                          <option value="3">3 Adults</option>
                          <option value="4">4 Adults</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] tracking-widest uppercase text-primary/70 font-bold block mb-1.5">
                        Children Count
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3.5 top-3.5 w-4 h-4 text-gold" />
                        <select
                          value={children}
                          onChange={(e) => setChildren(e.target.value)}
                          className="w-full bg-light-gray border border-primary/5 rounded pl-10 pr-4 py-3.5 text-xs outline-none focus:border-gold cursor-pointer"
                        >
                          <option value="0">No Children</option>
                          <option value="1">1 Child</option>
                          <option value="2">2 Children</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="text-[10px] tracking-widest uppercase text-primary/70 font-bold block mb-1.5">
                      Special Requests
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3.5 top-3 w-4 h-4 text-gold" />
                      <textarea
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        className="w-full bg-light-gray border border-primary/5 rounded pl-10 pr-4 py-2 text-xs outline-none focus:border-gold resize-none h-20"
                        placeholder="Dietary requests, airport private pick-up, sunset beach dinner, etc."
                      />
                    </div>
                  </div>

                  {/* Promo Code Input */}
                  <div>
                    <label className="text-[10px] tracking-widest uppercase text-primary/70 font-bold block mb-1.5 flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5 text-gold" /> Promo Code
                    </label>
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full bg-light-gray border border-primary/5 rounded px-4 py-3 text-xs outline-none focus:border-gold font-mono uppercase"
                      placeholder="e.g. RETREAT20 / HONEYMOON"
                    />
                    {discount > 0 && (
                      <span className="text-[10px] text-[#25D366] mt-1.5 block font-medium flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5" /> 20% Direct Booking Discount Applied!
                      </span>
                    )}
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    disabled={!!dateError || !selectedRoom}
                    className="w-full bg-primary text-gold border border-gold/15 hover:bg-gold hover:text-primary py-4 rounded-sm font-sans text-xs tracking-widest uppercase font-bold transition-all shadow-md cursor-pointer text-center disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                  >
                    Confirm Booking Reservation
                  </button>
                </form>
              </div>

              {/* Right Column: Pricing Summary Sidebar */}
              <div className="lg:col-span-4 flex flex-col gap-6 bg-white border border-primary/5 p-6 md:p-8 rounded shadow-sm self-start text-left">
                <h3 className="font-serif text-lg text-primary font-medium tracking-wide border-b border-primary/10 pb-3">
                  Resort Summary
                </h3>

                {selectedRoomDetails ? (
                  <div className="flex flex-col gap-4">
                    {/* Room Mini Card */}
                    <div className="rounded overflow-hidden h-36 relative border border-primary/5">
                      <img
                        src={selectedRoomDetails.images[0]}
                        alt={selectedRoomDetails.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-primary/20" />
                    </div>

                    <div className="flex flex-col gap-1 border-b border-primary/5 pb-4">
                      <span className="text-[9px] font-sans tracking-widest text-gold font-bold uppercase">
                        {selectedRoomDetails.category}
                      </span>
                      <h4 className="font-serif text-base text-primary font-medium leading-snug">
                        {selectedRoomDetails.name}
                      </h4>
                    </div>

                    {/* Booking Details Bullet */}
                    <div className="flex flex-col gap-2 text-xs font-light text-dark-slate/85 border-b border-primary/5 pb-4">
                      <div className="flex justify-between">
                        <span>Check-In:</span>
                        <span className="font-semibold text-primary">{checkIn || "--"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Check-Out:</span>
                        <span className="font-semibold text-primary">{checkOut || "--"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Nights:</span>
                        <span className="font-semibold text-primary">{nights} {nights === 1 ? "Night" : "Nights"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Guests:</span>
                        <span className="font-semibold text-primary">
                          {guests} Adults {children !== "0" && `, ${children} Child`}
                        </span>
                      </div>
                    </div>

                    {/* Price Calculations */}
                    <div className="flex flex-col gap-2 text-xs font-light text-dark-slate/85 pt-2">
                      <div className="flex justify-between">
                        <span>Room rate:</span>
                        <span>${selectedRoomDetails.price} / night</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Subtotal ({nights} nights):</span>
                        <span>${subtotal}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between font-medium text-[#25D366]">
                          <span>Discount (20% off):</span>
                          <span>-${discount}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-serif text-lg text-primary font-bold border-t border-primary/10 pt-4 mt-2">
                        <span>Total Price:</span>
                        <span className="text-gold">${total}</span>
                      </div>
                      <span className="text-[9px] text-dark-slate/40 leading-relaxed block mt-1.5">
                        * All taxes and resort services are included in the price. No payment details required.
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="py-8 text-center text-xs text-dark-slate/50 font-light flex flex-col items-center gap-2">
                    <Sparkles className="w-6 h-6 text-gold stroke-1" />
                    <span>Please select a suite to view pricing summary details.</span>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            /* 3. Successful Confirmation Screen */
            <motion.div
              key="booking-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto bg-white border border-primary/5 p-8 md:p-12 rounded-lg shadow-xl text-center flex flex-col items-center gap-6"
            >
              <CheckCircle className="w-16 h-16 text-[#25D366] stroke-1" />
              <h2 className="font-serif text-2xl lg:text-3xl text-primary font-light tracking-wide">
                Booking Confirmed
              </h2>
              <div className="bg-gold/10 text-gold border border-gold/15 px-6 py-2.5 rounded font-mono text-sm font-semibold tracking-widest uppercase">
                Reference Number: {bookingRef}
              </div>

              <p className="font-sans text-xs md:text-sm text-dark-slate/85 font-light leading-relaxed max-w-md">
                Thank you for selecting Aman Serenity. Your booking request has been successfully recorded. A formal booking receipt has been sent to your email. We look forward to welcoming you soon.
              </p>

              {/* Booking Summary Box */}
              <div className="w-full bg-light-gray border border-primary/5 rounded p-6 text-left flex flex-col gap-3.5 my-4">
                <h4 className="font-serif text-sm text-primary font-bold tracking-wide border-b border-primary/10 pb-2 flex items-center gap-1.5">
                  <CreditCard className="w-4.5 h-4.5 text-gold" /> Booking Summary
                </h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-dark-slate/85 font-light">
                  <div>
                    <span className="text-dark-slate/50 block">Suite Selected:</span>
                    <strong className="text-primary font-semibold font-serif text-sm">
                      {selectedRoomDetails?.name}
                    </strong>
                  </div>
                  <div>
                    <span className="text-dark-slate/50 block">Stay Duration:</span>
                    <strong className="text-primary font-semibold">
                      {nights} {nights === 1 ? "Night" : "Nights"}
                    </strong>
                  </div>
                  <div className="mt-2">
                    <span className="text-dark-slate/50 block">Check-In:</span>
                    <strong className="text-primary font-semibold">{checkIn}</strong>
                  </div>
                  <div className="mt-2">
                    <span className="text-dark-slate/50 block">Check-Out:</span>
                    <strong className="text-primary font-semibold">{checkOut}</strong>
                  </div>
                  <div className="mt-2">
                    <span className="text-dark-slate/50 block">Guests:</span>
                    <strong className="text-primary font-semibold">
                      {guests} Adults {children !== "0" && `, ${children} Child`}
                    </strong>
                  </div>
                  <div className="mt-2">
                    <span className="text-dark-slate/50 block">Total Cost:</span>
                    <strong className="text-gold font-serif text-base font-bold">${total}</strong>
                  </div>
                </div>

                {specialRequests && (
                  <div className="mt-3 border-t border-primary/10 pt-3">
                    <span className="text-dark-slate/50 text-[10px] block uppercase font-bold tracking-wide">
                      Special Requests logged:
                    </span>
                    <p className="text-xs text-dark-slate/85 italic font-light mt-1">
                      "{specialRequests}"
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => navigate("/")}
                  className="bg-primary text-gold border border-gold/15 hover:bg-gold hover:text-primary px-8 py-3 rounded-sm font-sans text-xs tracking-widest uppercase font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back To Home
                </button>
                <button
                  onClick={handleReset}
                  className="border border-primary/20 hover:border-gold hover:bg-primary hover:text-white px-8 py-3 rounded-sm font-sans text-xs tracking-widest uppercase font-bold transition-all cursor-pointer"
                >
                  New Booking
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
