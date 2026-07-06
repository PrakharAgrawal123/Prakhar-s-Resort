import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export default function Accordion({ items }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {items.map((item, index) => {
        const isOpen = activeIndex === index;
        return (
          <div
            key={index}
            className="border-b border-primary/10 pb-4 transition-all duration-300"
          >
            <button
              onClick={() => toggleIndex(index)}
              className="w-full flex items-center justify-between py-3 text-left font-serif text-lg lg:text-xl text-primary hover:text-gold transition-colors cursor-pointer group"
            >
              <span className="font-light tracking-wide">{item.question}</span>
              <span className="ml-4 shrink-0 w-8 h-8 rounded-full border border-primary/10 group-hover:border-gold flex items-center justify-center transition-colors">
                {isOpen ? (
                  <Minus className="w-4 h-4 text-gold" />
                ) : (
                  <Plus className="w-4 h-4 text-primary group-hover:text-gold" />
                )}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="font-sans text-sm lg:text-base text-dark-slate/85 leading-relaxed font-light mt-1 pb-2 max-w-4xl">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
