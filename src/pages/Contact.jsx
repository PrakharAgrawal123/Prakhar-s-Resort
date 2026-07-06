import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Clock, ShieldAlert, Send, CheckCircle, PhoneCall } from "lucide-react";
import { FaWhatsapp, FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import { faqData } from "../data/mockData";
import Accordion from "../components/ui/Accordion";
import canvasConfetti from "canvas-confetti";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && email.trim() && message.trim()) {
      setSubmitted(true);
      // Trigger success confetti
      canvasConfetti({
        particleCount: 80,
        spread: 60,
        colors: ["#D4AF37", "#0F172A", "#FFFFFF"]
      });
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  const contactCards = [
    {
      icon: MapPin,
      title: "Resort Address",
      details: ["Aman Serenity Island", "South Malé Atoll, Republic of Maldives"],
      actionLabel: "Get Directions",
      actionUrl: "https://maps.google.com"
    },
    {
      icon: Phone,
      title: "Reception & Booking",
      details: ["Toll-Free: +1 (234) 567-890", "International: +960 999 1234"],
      actionLabel: "Call Now",
      actionUrl: "tel:+1234567890"
    },
    {
      icon: Mail,
      title: "General Inquiry",
      details: ["info@amanserenity.com", "reservations@amanserenity.com"],
      actionLabel: "Send Email",
      actionUrl: "mailto:reservations@amanserenity.com"
    }
  ];

  return (
    <div className="pt-24 md:pt-28 font-sans">
      {/* 1. Header Banner */}
      <section className="relative h-[280px] md:h-[350px] flex items-center justify-center overflow-hidden mb-16 border-b border-gold/15">
        <div className="absolute inset-0 bg-primary/60 z-10" />
        <img
          src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1920&q=80"
          alt="Contact resort scenery background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center text-white px-6">
          <motion.span
            className="text-gold tracking-[0.3em] text-xs uppercase block mb-3 font-semibold"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            GET IN TOUCH
          </motion.span>
          <motion.h1
            className="font-serif text-3xl md:text-5xl lg:text-6xl font-light tracking-wide"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Contact Aman Serenity
          </motion.h1>
        </div>
      </section>

      {/* 2. Quick Info Cards */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={i}
                className="bg-white border border-primary/5 p-8 rounded shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <span className="w-12 h-12 rounded-full bg-light-gray flex items-center justify-center mb-6 group-hover:bg-primary transition-colors border border-primary/5">
                  <Icon className="w-5 h-5 text-gold group-hover:text-white transition-colors" />
                </span>
                <h3 className="font-serif text-lg text-primary font-medium tracking-wide mb-3">{card.title}</h3>
                <div className="text-dark-slate/85 text-xs md:text-sm font-light leading-relaxed mb-6 flex-grow">
                  {card.details.map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
                <a
                  href={card.actionUrl}
                  target={card.actionUrl.startsWith("http") ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="font-sans text-[10px] tracking-widest font-bold uppercase text-gold hover:text-primary transition-colors flex items-center gap-1.5 cursor-pointer border-b border-gold/30 pb-0.5"
                >
                  {card.actionLabel}
                </a>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. Form & Hours / Maps */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-32 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white border border-primary/5 p-8 md:p-12 rounded shadow-sm text-left">
          <h2 className="font-serif text-2xl lg:text-3xl text-primary font-light tracking-wide mb-2">
            Send A Secure Message
          </h2>
          <p className="font-sans text-xs text-dark-slate/50 mb-8">
            Complete the form, and our front desk officers will reply within 4 hours.
          </p>

          {!submitted ? (
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
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

              <div>
                <label className="text-[10px] tracking-widest uppercase text-primary/70 font-bold block mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-light-gray border border-primary/5 rounded px-4 py-2.5 text-xs outline-none focus:border-gold"
                  placeholder="Suite upgrade request / dining menu clarification"
                />
              </div>

              <div>
                <label className="text-[10px] tracking-widest uppercase text-primary/70 font-bold block mb-1.5">
                  Message Details
                </label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-light-gray border border-primary/5 rounded px-4 py-2 text-xs outline-none focus:border-gold resize-none h-32"
                  placeholder="Type details of your inquiry here..."
                />
              </div>

              <button
                type="submit"
                className="bg-primary text-gold border border-gold/15 hover:bg-gold hover:text-primary py-3.5 rounded-sm font-sans text-xs tracking-widest uppercase font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                Send Message <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-center text-center gap-4 py-8">
              <CheckCircle className="w-16 h-16 text-[#25D366] stroke-1" />
              <h3 className="font-serif text-2xl text-primary font-medium tracking-wide">
                Message Sent Successfully
              </h3>
              <p className="font-sans text-xs md:text-sm text-dark-slate/85 font-light leading-relaxed max-w-xs">
                Thank you, <span className="font-semibold">{name}</span>. Your message regarding <span className="font-semibold">"{subject}"</span> has been logged. We will reach back to <span className="font-semibold">{email}</span> shortly.
              </p>
              <button
                onClick={handleReset}
                className="bg-primary text-gold border border-gold/15 hover:bg-gold hover:text-primary px-8 py-2.5 rounded-sm font-sans text-xs tracking-widest uppercase font-bold transition-all shadow-md cursor-pointer mt-4"
              >
                Send Another Message
              </button>
            </div>
          )}
        </div>

        {/* Operating Hours / Socials / Emergency */}
        <div className="lg:col-span-5 flex flex-col gap-8 text-left">
          
          {/* Opening hours */}
          <div className="bg-white border border-primary/5 p-6 rounded shadow-sm">
            <h3 className="font-serif text-lg text-primary font-semibold tracking-wide mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-gold" /> Operating Hours
            </h3>
            <ul className="flex flex-col gap-3 text-xs md:text-sm font-light text-dark-slate/85">
              <li className="flex justify-between border-b border-primary/5 pb-2">
                <span>Front Reception:</span>
                <span className="font-semibold text-primary">24/7 Hours</span>
              </li>
              <li className="flex justify-between border-b border-primary/5 pb-2">
                <span>Fine Dining Dining:</span>
                <span>11:30 AM – 11:30 PM</span>
              </li>
              <li className="flex justify-between border-b border-primary/5 pb-2">
                <span>Spa & Massage Chambers:</span>
                <span>08:00 AM – 10:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Water Sports & Marina:</span>
                <span>07:00 AM – 06:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Emergency Alert Card */}
          <div className="bg-red-500/5 border border-red-500/10 p-6 rounded flex items-start gap-4">
            <ShieldAlert className="w-8 h-8 text-red-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-serif text-base text-red-700 font-semibold tracking-wide">Emergency Contact</h4>
              <p className="text-dark-slate/80 text-xs md:text-sm mt-1.5 font-light leading-relaxed">
                For immediate guest extraction, marine search, or medical urgency, call our direct 24-hour response line:
              </p>
              <a
                href="tel:+9609990191"
                className="mt-3 flex items-center gap-2 text-xs font-bold font-sans text-red-700 hover:underline"
              >
                <PhoneCall className="w-4 h-4 text-red-600" /> +960 999 0191 (Direct Ext.)
              </a>
            </div>
          </div>

          {/* Social connections */}
          <div className="bg-white border border-primary/5 p-6 rounded shadow-sm">
            <h3 className="font-serif text-lg text-primary font-semibold tracking-wide mb-4">Connect Socially</h3>
            <div className="flex items-center gap-4">
              {[
                { icon: FaWhatsapp, label: "WhatsApp Chat", url: "https://wa.me/1234567890" },
                { icon: FaInstagram, label: "Instagram", url: "https://instagram.com" },
                { icon: FaFacebookF, label: "Facebook", url: "https://facebook.com" },
                { icon: FaTwitter, label: "Twitter", url: "https://twitter.com" }
              ].map((soc, i) => (
                <a
                  key={i}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={soc.label}
                  className="w-10 h-10 rounded-full border border-primary/10 hover:border-gold hover:text-gold flex items-center justify-center transition-colors text-primary/80 cursor-pointer"
                >
                  <soc.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 4. Google Maps Iframe */}
      <section className="w-full h-[400px] border-b border-gold/15 filter grayscale hover:grayscale-0 transition-all duration-700 relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15949.771239855562!2d73.50989569999999!3d4.1754959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b3f7efb0f2a74c3%3A0x6b63d6b1d1d1b1df!2sSouth%20Mal%C3%A9%20Atoll!5e0!3m2!1sen!2smv!4v1700000000000!5m2!1sen!2smv"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Aman Serenity Resort Location Map"
        ></iframe>
      </section>

      {/* 5. FAQ Accordion Section */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-gold tracking-[0.25em] text-xs font-bold uppercase mb-3">
            QUESTIONS & ANSWERS
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-primary font-light tracking-wide mb-4">
            Frequently Asked Questions
          </h2>
          <p className="font-sans text-xs md:text-sm text-dark-slate/60 max-w-lg font-light">
            Review guidelines on checking in, custom menus, cancellation parameters, and private event planning.
          </p>
        </div>

        {/* Accordion Component */}
        <Accordion items={faqData} />
      </section>
    </div>
  );
}
