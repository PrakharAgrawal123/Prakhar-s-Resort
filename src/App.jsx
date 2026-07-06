import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";

// Import all pages
import Home from "./pages/Home";
import About from "./pages/About";
import Rooms from "./pages/Rooms";
import Restaurant from "./pages/Restaurant";
import Amenities from "./pages/Amenities";
import Gallery from "./pages/Gallery";
import Events from "./pages/Events";
import SpecialOffers from "./pages/SpecialOffers";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* All routes are wrapped inside our luxury global layout */}
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="restaurant" element={<Restaurant />} />
          <Route path="amenities" element={<Amenities />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="events" element={<Events />} />
          <Route path="offers" element={<SpecialOffers />} />
          <Route path="contact" element={<Contact />} />
          <Route path="booking" element={<Booking />} />
          
          {/* Fallback route - redirects to Home */}
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
