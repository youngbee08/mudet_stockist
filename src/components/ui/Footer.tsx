import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 lg:mt-20">
      <section className="app-container">
        <motion.div
          className="rounded-4xl border border-white/15 bg-linear-to-r from-primary to-primary-deep px-5 sm:px-8 lg:px-12 py-10 lg:py-12 shadow-2xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div className="text-white">
              <span className="inline-flex items-center rounded-full bg-white/15 px-4 py-2 text-[11px] font-bold tracking-widest uppercase">
                Mudet Stockist
              </span>

              <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.05]">
                Buy Mudet products directly from Super Lady.
              </h2>

              <p className="mt-4 text-sm sm:text-base text-white/85 max-w-xl">
                Order genuine Mudet Herbal Extract products and register as a
                stockist with easy package selection, full support, and direct
                contact from Super Lady.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/register"
                    className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-bold text-primary shadow-sm hover:brightness-95 transition"
                  >
                    Register Now
                  </Link>
                </motion.div>

                <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center rounded-xl border border-white/35 bg-white/10 px-6 py-3 text-sm font-bold text-white hover:bg-white/15 transition"
                  >
                    Contact Super Lady
                  </Link>
                </motion.div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "1,200+", label: "Active Partners" },
                { value: "25+", label: "Countries Served" },
                { value: "98%", label: "Customer Satisfaction" },
                { value: "24/7", label: "Partner Support" },
              ].map((s) => (
                <motion.div
                  key={s.label}
                  className="rounded-2xl border border-white/20 bg-white/10 px-5 py-5 backdrop-blur-xl"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-white font-display text-2xl sm:text-3xl font-extrabold">
                    {s.value}
                  </div>
                  <div className="mt-1 text-[11px] sm:text-xs text-white/80">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
      <section className="mt-10 border-t border-secondary-dark/60 bg-white">
        <div className="app-container py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold text-neutral-soft">
              © {year} Super Lady. All rights reserved.
            </p>

            <div className="flex items-center gap-3">
              <div className="text-sm text-white/85">
                <p>Phone: 0816 055 0326</p>
                <p>Email: mudetrealsolution@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-bold tracking-widest uppercase text-neutral-soft">
            <a
              href="https://zenithdevtech.name.ng"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-tetiary transition"
            >
              Built by Zenith Dev™
            </a>

            <Link to="/contact" className="hover:text-tetiary transition">
              Contact
            </Link>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
