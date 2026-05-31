import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Check, Leaf, PackageCheck, Sparkles, TrendingUp } from "lucide-react";
import productDetails from "../lib/productDetails";
import { formatPriceByCurrency } from "../utilities/formatterUtility";
import assets from "../assets/assets";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.45, ease: "easeOut" },
} as const;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { products } = productDetails;

  const handleOrder = (productId: string) => {
    sessionStorage.setItem("selectedProductId", productId);
    navigate("/purchase-product");
  };

  return (
    <div className="flex flex-col gap-20 pb-4">
      <section className="relative min-h-[calc(100svh-6.5rem)] overflow-hidden rounded-[32px] border border-primary/10 bg-secondary px-5 py-8 shadow-2xl shadow-primary/10 sm:px-8 lg:px-12 lg:py-12">
        <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,transparent,#dcecdc)]" />
        <div className="relative grid min-h-[calc(100svh-13rem)] items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-accent shadow-sm">
              <BadgeCheck className="h-4 w-4 text-primary" />
              Trusted Mudet Stockist
            </span>

            <h1 className="mt-6 font-display text-5xl font-bold leading-[0.98] text-neutral-dark sm:text-6xl lg:text-7xl">
              Buy Mudet products from Super Lady.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-neutral-soft sm:text-lg">
              Order genuine Mudet herbal extracts, get direct guidance before
              payment, and register as a stockist through one simple support
              channel.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => handleOrder(products[0].id)}
                className="btn-primary gap-2"
              >
                Shop Products
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="btn-secondary"
              >
                Register as Stockist
              </button>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3 border-t border-primary/10 pt-6">
              {[
                ["2", "Mudet products"],
                ["NGN 14k", "Per bottle"],
                ["Direct", "WhatsApp support"],
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="font-display text-2xl font-bold text-primary">
                    {value}
                  </p>
                  <p className="mt-1 text-[12px] font-bold uppercase tracking-[0.12em] text-neutral-faint">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
          >
            <div className="relative mx-auto max-w-xl">
              <div className="absolute -left-4 top-8 hidden rounded-3xl bg-white px-5 py-4 shadow-xl shadow-black/10 sm:block">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-accent">
                  Ready to order
                </p>
                <p className="mt-1 text-sm font-extrabold text-neutral-dark">
                  Payment guidance included
                </p>
              </div>
              <div className="rounded-[32px] border border-white/80 bg-white p-4 shadow-2xl shadow-primary/15">
                <img
                  src={assets.showcase}
                  alt="Mudet herbal extract product showcase"
                  className="aspect-[4/3] w-full rounded-[24px] object-cover"
                />
              </div>
              <div className="absolute -bottom-5 right-4 rounded-[24px] border border-primary/10 bg-neutral-dark px-5 py-4 text-white shadow-2xl">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-accent-soft">
                  Stockist support
                </p>
                <p className="mt-1 text-sm font-bold">0816 055 0326</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <motion.section {...fadeUp} className="grid gap-5 md:grid-cols-3">
        {[
          {
            icon: <PackageCheck className="h-5 w-5" />,
            title: "Original stock",
            text: "Products are supplied through Super Lady with clear order confirmation.",
          },
          {
            icon: <Leaf className="h-5 w-5" />,
            title: "Product-led support",
            text: "Ask questions, choose the right bottle, and receive direct payment instructions.",
          },
          {
            icon: <BadgeCheck className="h-5 w-5" />,
            title: "Registration help",
            text: "Become a Mudet stockist with package guidance and sponsor details ready.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="surface-card p-6 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white">
              {item.icon}
            </div>
            <h2 className="mt-5 text-xl font-extrabold text-neutral-dark">
              {item.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-neutral-soft">{item.text}</p>
          </div>
        ))}
      </motion.section>

      <motion.section {...fadeUp} className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
        <div>
          <p className="section-kicker">Product showcase</p>
          <h2 className="mt-3 font-display text-4xl font-bold leading-tight text-neutral-dark sm:text-5xl">
            Two Mudet extracts, presented for confident buying.
          </h2>
          <p className="mt-5 text-base leading-8 text-neutral-soft">
            Each product is available for direct order at the same clear price.
            Select a bottle and continue to the purchase form.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {products.map((product, index) => (
            <motion.article
              key={product.id}
              className={[
                "group overflow-hidden rounded-[30px] border bg-white shadow-xl shadow-black/5",
                index === 0 ? "border-primary/20" : "border-accent/25",
              ].join(" ")}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <div className="relative bg-secondary p-5">
                <img
                  src={product.image}
                  alt={product.name}
                  className="mx-auto h-64 w-full object-contain transition duration-300 group-hover:scale-105"
                />
                <span className="absolute left-5 top-5 rounded-full bg-white px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-accent shadow-sm">
                  Mudet
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-extrabold text-neutral-dark">
                    {product.name}
                  </h3>
                  <p className="shrink-0 rounded-full bg-accent-soft px-3 py-1 text-sm font-extrabold text-accent">
                    {formatPriceByCurrency(product.price, "NGN")}
                  </p>
                </div>
                <p className="mt-3 text-sm leading-7 text-neutral-soft">
                  {product.description}
                </p>
                <button
                  type="button"
                  onClick={() => handleOrder(product.id)}
                  className="btn-primary mt-6 w-full gap-2"
                >
                  Order This Product
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.section {...fadeUp} className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[32px] bg-neutral-dark p-7 text-white shadow-2xl shadow-black/10 sm:p-10">
          <p className="section-kicker text-accent-soft">Opportunity highlights</p>
          <h2 className="mt-3 font-display text-4xl font-bold leading-tight sm:text-5xl">
            Start as a buyer. Grow into a stockist.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/75">
            Mudet registration packages help new partners buy stock, track PV,
            and earn through direct referral, retail profit, and upgrade bonuses.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {["Retail profit", "30% direct referral", "Upgrade bonus", "Package PV"].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/8 px-4 py-4">
                <Check className="h-5 w-5 text-accent-soft" />
                <span className="text-sm font-bold">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="surface-card p-7 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-white">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="section-kicker">Registration</p>
              <h3 className="text-2xl font-extrabold text-neutral-dark">
                Sponsor username: mercy01
              </h3>
            </div>
          </div>
          <p className="mt-5 text-sm leading-7 text-neutral-soft">
            Choose a package, enter your personal details, and save your
            registration request for Super Lady to confirm.
          </p>
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="btn-secondary mt-7 w-full gap-2"
          >
            View Registration Packages
            <Sparkles className="h-4 w-4" />
          </button>
        </div>
      </motion.section>

      <motion.section
        {...fadeUp}
        className="relative overflow-hidden rounded-[32px] border border-primary/15 bg-secondary p-7 sm:p-10 lg:p-12"
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="section-kicker">Ready when you are</p>
            <h2 className="mt-3 font-display text-4xl font-bold leading-tight text-neutral-dark sm:text-5xl">
              Order today or ask Super Lady before you buy.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-neutral-soft">
              Use the product order form for a clean checkout path, or contact
              Super Lady for payment and delivery guidance.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <button
              type="button"
              onClick={() => handleOrder(products[0].id)}
              className="btn-primary"
            >
              Start an Order
            </button>
            <button
              type="button"
              onClick={() => navigate("/contact")}
              className="btn-secondary"
            >
              Contact Super Lady
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
