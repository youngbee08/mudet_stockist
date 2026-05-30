import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa";

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
                Affiliate Opportunity
              </span>

              <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.05]">
                Start Your Wellness Business Today.
              </h2>

              <p className="mt-4 text-sm sm:text-base text-white/85 max-w-xl">
                Join a growing community of affiliate business owners. Earn
                competitive margins, get dedicated partner support, and help
                more people live healthier, with RedRose by Gladys.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="https://www.affluenceglobaldream.com/en/gladys99/ng/agl/ref-member/LEFT"
                    target="_blank"
                    className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-bold text-primary shadow-sm hover:brightness-95 transition"
                  >
                    Become an Affiliate
                  </Link>
                </motion.div>

                <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/become-an-affiliate"
                    className="inline-flex items-center justify-center rounded-xl border border-white/35 bg-white/10 px-6 py-3 text-sm font-bold text-white hover:bg-white/15 transition"
                  >
                    Learn More
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
              © {year} RedRose by Gladys. All rights reserved.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/double_red_roseofficial?igsh=OHNobWo4Z3M0MXVk&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-full border border-secondary-dark/70 flex items-center justify-center text-neutral-dark hover:bg-primary hover:text-white hover:border-primary transition"
              >
                <FaInstagram className="text-sm" />
              </a>

              <a
                href="https://www.facebook.com/share/1KhTcJE95H/"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-full border border-secondary-dark/70 flex items-center justify-center text-neutral-dark hover:bg-primary hover:text-white hover:border-primary transition"
              >
                <FaFacebookF className="text-sm" />
              </a>

              <a
                href="https://www.tiktok.com/@double.red.rose.ng?_r=1&_t=ZN-945EzPni80c"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-full border border-secondary-dark/70 flex items-center justify-center text-neutral-dark hover:bg-primary hover:text-white hover:border-primary transition"
              >
                <FaTiktok className="text-sm" />
              </a>
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
