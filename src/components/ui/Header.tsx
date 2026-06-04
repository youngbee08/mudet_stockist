import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";
import { Phone } from "lucide-react";
import navitems from "../../lib/navitems";
import assets from "../../assets/assets";

const Header = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50">
      <motion.div
        className="border-b border-primary/10 bg-[#f8fbf6]/90 backdrop-blur-xl"
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <nav className="app-container flex h-20 items-center gap-4">
          <a href="/" className="flex min-w-0 items-end gap-1">
            <img
              src={assets.logo2}
              alt="Mudet"
              className="h-8 w-8 object-contain"
            />
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="truncate font-display text-xl font-bold text-tetiary">
                Super Lady
              </span>
              <a
                href={"https://www.mudetrealsolution.com"}
                target="_blank"
                className="truncate text-[8px] font-bold uppercase tracking-[0.16em] text-accent"
              >
                Mudet Real Solution Stockist
              </a>
            </span>
          </a>

          <div className="hidden flex-1 items-center justify-center gap-2 md:flex">
            {navitems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={[
                    "relative rounded-full px-4 py-2 text-sm font-bold transition",
                    active
                      ? "text-primary"
                      : "text-neutral-soft hover:bg-white hover:text-primary",
                  ].join(" ")}
                >
                  {active && (
                    <motion.span
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full bg-primary/10"
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    />
                  )}
                  <span className="relative">{item.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="ml-auto hidden items-center gap-3 md:flex">
            <Link
              to="/purchase-product"
              className="btn-secondary min-h-11 px-5 py-2.5"
            >
              Buy Products
            </Link>
            <a
              href="tel:+2348160550326"
              className="btn-primary min-h-11 gap-2 px-5 py-2.5"
            >
              <Phone className="h-4 w-4" />
              Call
            </a>
          </div>

          <motion.button
            onClick={() => setOpen(true)}
            className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/15 bg-white text-primary shadow-sm transition hover:bg-secondary md:hidden"
            aria-label="Open menu"
            whileTap={{ scale: 0.95 }}
          >
            <HiOutlineMenuAlt3 className="text-2xl" />
          </motion.button>
        </nav>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-70 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-neutral-dark/45"
            />

            <motion.aside
              className="absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col bg-[#f8fbf6] shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between border-b border-primary/10 px-5 py-5">
                <div className="flex items-center gap-3">
                  <img
                    src={assets.logo2}
                    alt="Mudet"
                    className="h-10 w-10 object-contain"
                  />
                  <div className="leading-tight">
                    <p className="font-display text-lg font-bold text-tetiary">
                      Super Lady
                    </p>
                    <a
                      href={"https://www.mudetrealsolution.com"}
                      target="_blank"
                      className="truncate text-[9px] font-bold uppercase tracking-[0.16em] text-accent"
                    >
                      Mudet Real Solution Stockist
                    </a>
                  </div>
                </div>

                <motion.button
                  onClick={() => setOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-tetiary shadow-sm"
                  aria-label="Close menu"
                  whileTap={{ scale: 0.95 }}
                >
                  <HiX className="text-2xl" />
                </motion.button>
              </div>

              <div className="flex flex-col gap-2 px-5 py-6">
                {navitems.map((item) => {
                  const active = location.pathname === item.path;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={[
                        "rounded-2xl px-4 py-4 text-xs font-extrabold transition",
                        active
                          ? "bg-primary text-white"
                          : "bg-white text-neutral-dark hover:bg-secondary",
                      ].join(" ")}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>

              <div className="mt-auto border-t border-primary/10 p-5">
                <Link
                  to="/purchase-product"
                  className="btn-primary w-full"
                  onClick={() => setOpen(false)}
                >
                  Buy Mudet Products
                </Link>
                <a
                  href="https://wa.me/2348160550326?text=Hi%20Super%20Lady,%20I%20want%20to%20ask%20about%20Mudet%20products."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary mt-3 w-full"
                >
                  Message on WhatsApp
                </a>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
