import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Lightbox({ images, currentIndex, onClose, onPrev, onNext }) {
  
  // Close on Escape key, change page on Arrow keys
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (currentIndex === null || currentIndex === undefined) return null;

  const currentItem = images[currentIndex];
  const isVideo = currentItem?.url?.endsWith(".mp4") || currentItem?.url?.includes("video");

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-primary/95 z-[100] flex items-center justify-center p-4 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white/70 hover:text-gold transition-colors z-50 p-2 cursor-pointer bg-white/5 rounded-full"
          aria-label="Close Lightbox"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Navigation Left */}
        {images.length > 1 && (
          <button
            onClick={onPrev}
            className="absolute left-4 md:left-8 text-white/70 hover:text-gold transition-colors z-55 p-3 cursor-pointer bg-white/5 rounded-full"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
        )}

        {/* Active Content */}
        <motion.div
          key={currentIndex}
          className="max-w-5xl max-h-[85vh] flex flex-col items-center gap-4 relative"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {isVideo ? (
            <video
              src={currentItem.url}
              controls
              autoPlay
              className="max-w-full max-h-[75vh] object-contain rounded border border-gold/15"
            />
          ) : (
            <img
              src={currentItem.url}
              alt={currentItem.title || "Gallery Preview"}
              className="max-w-full max-h-[75vh] object-contain rounded border border-gold/15 shadow-2xl"
            />
          )}

          {/* Title bar */}
          {currentItem.title && (
            <span className="text-white/80 font-serif tracking-widest text-sm lg:text-base text-center mt-2">
              {currentItem.title}
            </span>
          )}
          
          <span className="text-white/40 font-sans text-xs">
            {currentIndex + 1} / {images.length}
          </span>
        </motion.div>

        {/* Navigation Right */}
        {images.length > 1 && (
          <button
            onClick={onNext}
            className="absolute right-4 md:right-8 text-white/70 hover:text-gold transition-colors z-55 p-3 cursor-pointer bg-white/5 rounded-full"
            aria-label="Next Image"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
