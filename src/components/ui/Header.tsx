import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";
import navitems from "../../lib/navitems";

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
        className="bg-white border-b border-secondary-dark/60"
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <nav className="app-container h-16 flex items-center gap-3">
          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => setOpen(true)}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl hover:bg-black/5 transition"
              aria-label="Open menu"
              whileTap={{ scale: 0.95 }}
            >
              <HiOutlineMenuAlt3 className="text-2xl text-primary" />
            </motion.button>

            <Link to="/" className="flex flex-col leading-tight">
              <span className="font-display text-lg font-bold text-tetiary">
                RedRose by Gladys
              </span>
              <span className="text-[14px] text-neutral-soft">
                Affiliate business owner of Affluence Global
              </span>
            </Link>
          </div>

          <div className="hidden md:flex flex-1 items-center justify-center gap-8">
            {navitems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={[
                    "text-sm font-semibold transition relative",
                    active
                      ? "text-primary"
                      : "text-neutral-dark hover:text-primary",
                  ].join(" ")}
                >
                  {item.name}
                  {active && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute -bottom-2 left-0 right-0 mx-auto h-0.5 w-6 rounded-full bg-primary"
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex justify-end">
            <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="tel:+234814 004 1861"
                className=" items-center justify-center h-10 rounded-xl bg-primary text-white px-4 text-sm font-semibold hover:brightness-110 transition lg:inline-flex hidden"
              >
                Schedule a Call
              </Link>
            </motion.div>
          </div>

          <div className="md:hidden ml-auto w-10" aria-hidden="true" />
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
              className="absolute inset-0 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.aside
              className="absolute left-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between px-4 py-4 border-b border-secondary-dark/60">
                <div className="flex flex-col leading-tight">
                  <span className="font-display font-bold text-tetiary">
                    RedRose by Gladys
                  </span>
                  <span className="text-[11px] text-neutral-soft">
                    Affiliate business owner of Affluence Global
                  </span>
                </div>

                <motion.button
                  onClick={() => setOpen(false)}
                  className="w-10 h-10 rounded-xl hover:bg-black/5 transition flex items-center justify-center"
                  aria-label="Close menu"
                  whileTap={{ scale: 0.95 }}
                >
                  <HiX className="text-2xl text-tetiary" />
                </motion.button>
              </div>

              <div className="px-4 py-6 flex flex-col gap-2">
                {navitems.map((item) => {
                  const active = location.pathname === item.path;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setOpen(false)}
                      className={[
                        "px-4 py-3 rounded-xl text-sm font-semibold transition",
                        active
                          ? "bg-black/5 text-tetiary"
                          : "text-neutral-dark hover:bg-black/5",
                      ].join(" ")}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>

              <div className="mt-auto p-4 border-t border-secondary-dark/60">
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="block w-full text-center rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm hover:brightness-110 transition"
                >
                  Schedule a Call
                </Link>

                <a
                  href="https://wa.me/2348140041861?text=Hi%20there,%20I'd%20like%20to%20learn%20more."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-3 w-full text-center rounded-xl bg-black/5 hover:bg-black/10 px-4 py-3 text-xs font-semibold text-tetiary transition"
                >
                  Message Us
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
