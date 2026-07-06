import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ScrollToTop from "../components/common/ScrollToTop";
import ScrollProgress from "../components/common/ScrollProgress";
import FloatingButtons from "../components/common/FloatingButtons";

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory text-primary selection:bg-gold selection:text-primary">
      {/* Reset scroll on route change */}
      <ScrollToTop />

      {/* Top progress indicator */}
      <ScrollProgress />

      {/* Fixed Sticky Header */}
      <Navbar />

      {/* Page Content with min-height to fill viewport */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Quick Access Floating Buttons (WhatsApp, Call, Top) */}
      <FloatingButtons />

      {/* Footer component */}
      <Footer />
    </div>
  );
}
