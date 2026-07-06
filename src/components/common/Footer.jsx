import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Clock, ShieldCheck, Heart, Send } from "lucide-react";
import { FaInstagram, FaFacebookF, FaTwitter, FaPinterestP } from "react-icons/fa";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const instagramImages = [
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=150&h=150&q=80",
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=150&h=150&q=80",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=150&h=150&q=80",
    "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=150&h=150&q=80",
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=150&h=150&q=80",
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=150&h=150&q=80"
  ];

  return (
    <footer className="bg-primary text-white border-t border-gold/15 pt-20 pb-10 font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Column 1: Brand Story & Socials */}
        <div className="flex flex-col gap-6">
          <Link to="/" className="flex flex-col items-start cursor-pointer">
            <span className="font-serif text-3xl tracking-[0.2em] text-gold font-light leading-none">
              AMAN
            </span>
            <span className="text-[10px] tracking-[0.35em] text-white/50 uppercase mt-1">
              Serenity Resort
            </span>
          </Link>
          <p className="text-white/60 text-sm leading-relaxed font-light">
            A sanctuary of peace and exquisite beauty, tucked away in the crystal waters of the Maldives. Experience five-star luxury reimagined for the modern soul.
          </p>
          <div className="flex items-center gap-4 mt-2">
            {[
              { icon: FaInstagram, url: "https://instagram.com" },
              { icon: FaFacebookF, url: "https://facebook.com" },
              { icon: FaTwitter, url: "https://twitter.com" },
              { icon: FaPinterestP, url: "https://pinterest.com" }
            ].map((social, i) => (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/20 hover:border-gold hover:text-gold flex items-center justify-center transition-colors text-white/80 cursor-pointer"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col gap-6">
          <h3 className="font-serif text-lg tracking-widest text-gold font-medium">Quick Links</h3>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm font-light text-white/70">
            <li><Link to="/about" className="hover:text-gold transition-colors">Our Story</Link></li>
            <li><Link to="/rooms" className="hover:text-gold transition-colors">Rooms & Suites</Link></li>
            <li><Link to="/restaurant" className="hover:text-gold transition-colors">Dining</Link></li>
            <li><Link to="/amenities" className="hover:text-gold transition-colors">Amenities</Link></li>
            <li><Link to="/gallery" className="hover:text-gold transition-colors">Gallery</Link></li>
            <li><Link to="/events" className="hover:text-gold transition-colors">Weddings</Link></li>
            <li><Link to="/offers" className="hover:text-gold transition-colors">Special Offers</Link></li>
            <li><Link to="/contact" className="hover:text-gold transition-colors">Contact Us</Link></li>
            <li><Link to="/booking" className="hover:text-gold transition-colors">Book Now</Link></li>
          </ul>
        </div>

        {/* Column 3: Contact & Hours */}
        <div className="flex flex-col gap-5">
          <h3 className="font-serif text-lg tracking-widest text-gold font-medium">Contact Details</h3>
          <ul className="flex flex-col gap-4 text-sm font-light text-white/70">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <span>Aman Serenity Island, South Malé Atoll, Republic of Maldives</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gold shrink-0" />
              <span>+1 (234) 567-890</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gold shrink-0" />
              <span>reservations@amanserenity.com</span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <div>
                <p>Reception: 24/7</p>
                <p className="text-xs text-white/50">Spa: 08:00 AM – 10:00 PM</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter & Insta Preview */}
        <div className="flex flex-col gap-6">
          <h3 className="font-serif text-lg tracking-widest text-gold font-medium">Newsletter</h3>
          <form onSubmit={handleSubscribe} className="relative flex">
            <input
              type="email"
              required
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 focus:border-gold outline-none px-4 py-2.5 text-sm text-white rounded-l-sm"
            />
            <button
              type="submit"
              className="bg-gold text-primary hover:bg-gold-hover px-4 flex items-center justify-center rounded-r-sm cursor-pointer transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {subscribed && (
            <span className="text-xs text-[#25D366] flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> Subscribed successfully!
            </span>
          )}

          {/* Instagram Grid */}
          <div>
            <h4 className="text-xs tracking-widest text-white/50 uppercase mb-3 flex items-center gap-1.5">
              <FaInstagram className="w-3.5 h-3.5 text-gold" /> INSTAGRAM
            </h4>
            <div className="grid grid-cols-6 gap-2">
              {instagramImages.map((img, i) => (
                <div key={i} className="relative group overflow-hidden aspect-square border border-white/5 rounded-sm">
                  <img
                    src={img}
                    alt={`Instagram ${i + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Heart className="w-3 h-3 text-gold fill-gold" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/10 pt-8 max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-light text-white/40">
        <p>© {new Date().getFullYear()} Aman Serenity Resorts. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link to="/contact" className="hover:text-gold transition-colors">Privacy Policy</Link>
          <Link to="/contact" className="hover:text-gold transition-colors">Terms of Service</Link>
          <Link to="/contact" className="hover:text-gold transition-colors">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
}
