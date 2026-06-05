import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import assets from "../../assets/assets";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-primary/10 bg-neutral-dark text-white">
      <section className="app-container py-12 lg:py-16">
        <motion.div
          className="grid gap-10 lg:grid-cols-[1fr_0.9fr]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white">
                <img
                  src={assets.logo1}
                  alt="Mudet"
                  className="h-8 w-8 object-contain"
                />
              </span>
              <div>
                <p className="font-display text-2xl font-bold">Mercy</p>
                <a
                  href={"https://www.mudetrealsolution.com"}
                  target="_blank"
                  className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-accent-soft"
                >
                  Mudet Real Solution Stockist
                </a>
              </div>
            </div>
            <div className="hidden lg:block">
              <h2 className="mt-8 max-w-2xl font-display text-3xl font-bold leading-tight lg:text-5xl ">
                Genuine Mudet products with direct stockist support.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/70">
                Buy Cinnamon Herbal Extract and ARMOR Herbal Extract, or
                register as a Mudet stockist through Mercy.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/purchase-product"
                  className="btn-primary bg-white text-primary hover:bg-secondary"
                >
                  Buy Products
                </Link>
                <Link
                  to="/register"
                  className="btn-secondary border-white/20 bg-white/8 text-white hover:bg-white/12"
                >
                  Register as Stockist
                </Link>
              </div>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-accent-soft">
                Navigate
              </p>
              <div className="mt-5 grid gap-3">
                {[
                  ["Home", "/"],
                  ["Register", "/register"],
                  ["Contact", "/contact"],
                ].map(([label, path]) => (
                  <Link
                    key={label}
                    to={path}
                    className="text-sm font-bold text-white/72 transition hover:text-white"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-accent-soft">
                Contact
              </p>
              <div className="mt-5 grid gap-4">
                <a
                  href="tel:+2348160550326"
                  className="flex gap-3 text-sm text-white/75 transition hover:text-white"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent-soft" />
                  0816 055 0326
                </a>
                <a
                  href="mailto:mudetrealsolution@gmail.com"
                  className="flex gap-3 text-sm text-white/75 transition hover:text-white"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent-soft" />
                  mudetrealsolution@gmail.com
                </a>
                <p className="flex gap-3 text-sm leading-6 text-white/75">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-soft" />
                  Oyo State, Nigeria
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/6 p-5 sm:col-span-2">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-accent-soft">
                Quick note
              </p>
              <p className="mt-3 text-sm leading-7 text-white/70">
                For order confirmation and payment guidance, contact Mercy
                directly after sending payment.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs font-bold text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright {year} Mercy. All rights reserved.</p>
          <a
            href="https://zenithdevtech.name.ng"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-white"
          >
            Built by Zenith Dev
          </a>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
