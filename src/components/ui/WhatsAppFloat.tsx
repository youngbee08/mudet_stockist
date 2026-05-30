import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

const WHATSAPP_LINK =
  "https://wa.me/2348140041861?text=Hi%20there,%20I'd%20like%20to%20learn%20more.";

const WhatsAppFloat: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 260);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="fixed z-60 bottom-5 right-5 md:bottom-6 md:right-6 group"
          initial={{ opacity: 0, y: 14, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 14, scale: 0.98 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <motion.span
            className="absolute -inset-2 rounded-full blur-xl bg-primary/20 opacity-0"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />

          <motion.span
            className={[
              "relative",
              "w-12 h-12 sm:w-14 sm:h-14",
              "rounded-full flex items-center justify-center",
              "bg-white",
              "border border-secondary-dark/70",
              "shadow-lg shadow-black/10",
            ].join(" ")}
            whileHover={{ y: -2, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <span className="absolute inset-0 rounded-full ring-2 ring-primary/10" />

            <FaWhatsapp className="relative text-[#25D366] text-xl sm:text-2xl" />
          </motion.span>

          <motion.span
            className={[
              "hidden md:block",
              "absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2",
              "px-3 py-2 rounded-full",
              "text-xs font-semibold text-neutral-dark",
              "bg-white border border-secondary-dark/70 shadow-md shadow-black/10",
              "whitespace-nowrap",
            ].join(" ")}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 0, x: 10 }}
            whileHover={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            Chat on WhatsApp
          </motion.span>

          <style>{`
            .group:hover > span:last-child {
              opacity: 1 !important;
              transform: translateY(-50%) translateX(0) !important;
            }
          `}</style>
        </motion.a>
      )}
    </AnimatePresence>
  );
};

export default WhatsAppFloat;
