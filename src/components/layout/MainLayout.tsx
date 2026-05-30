import React, { useEffect } from "react";
import type { mainLayoutProps } from "../../lib/interfaces";
import Footer from "../ui/Footer";
import Header from "../ui/Header";
import WhatsAppFloat from "../ui/WhatsAppFloat";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const MainLayout: React.FC<mainLayoutProps> = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return (
    <div className="min-h-screen bg-secondary/30 text-tetiary">
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          className="app-container pt-7 lg:pt-14"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default MainLayout;
