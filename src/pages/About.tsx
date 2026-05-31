import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BadgeCheck, Handshake, Leaf, PackageCheck } from "lucide-react";
import assets from "../assets/assets";

const About: React.FC = () => {
  return (
    <div className="flex flex-col gap-16">
      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div
          className="relative overflow-hidden rounded-[32px] bg-secondary p-4 shadow-2xl shadow-primary/10"
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.42, ease: "easeOut" }}
        >
          <img
            src={assets.about}
            alt="Mudet product support"
            className="aspect-[4/5] w-full rounded-[26px] object-cover sm:aspect-[5/4] lg:aspect-[4/5]"
          />
          <div className="absolute bottom-8 left-8 right-8 rounded-[24px] bg-white/92 p-5 shadow-xl backdrop-blur">
            <p className="section-kicker">Direct stockist</p>
            <p className="mt-2 text-lg font-extrabold text-neutral-dark">
              Super Lady connects customers to original Mudet products.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, ease: "easeOut", delay: 0.08 }}
        >
          <p className="section-kicker">About Super Lady</p>
          <h1 className="mt-4 font-display text-5xl font-bold leading-tight text-neutral-dark sm:text-6xl">
            A trusted Mudet stockist for product orders and registration.
          </h1>
          <p className="mt-6 text-base leading-8 text-neutral-soft">
            Super Lady provides a reliable way to buy Mudet Real Solution
            products and register as a distributor. The focus is simple:
            authentic products, clear communication, and practical support from
            order to delivery.
          </p>
          <p className="mt-4 text-base leading-8 text-neutral-soft">
            New stockists can choose a package, submit their details, and receive
            guidance for payment and onboarding.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/purchase-product" className="btn-primary">
              Buy Products
            </Link>
            <Link to="/register" className="btn-secondary">
              Register as Stockist
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {[
          {
            icon: <PackageCheck className="h-5 w-5" />,
            title: "Authentic Mudet supply",
            text: "Original Mudet herbal extract products with straightforward order handling.",
          },
          {
            icon: <Handshake className="h-5 w-5" />,
            title: "Human support",
            text: "Direct contact for payment instructions, delivery questions, and registration help.",
          },
          {
            icon: <Leaf className="h-5 w-5" />,
            title: "Wellness focused",
            text: "Products are presented clearly so customers can buy with confidence.",
          },
        ].map((item) => (
          <div key={item.title} className="surface-card p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white">
              {item.icon}
            </div>
            <h2 className="mt-5 text-xl font-extrabold text-neutral-dark">
              {item.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-neutral-soft">{item.text}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-8 rounded-[32px] bg-neutral-dark p-7 text-white sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="section-kicker text-accent-soft">Product line</p>
          <h2 className="mt-3 font-display text-4xl font-bold leading-tight sm:text-5xl">
            Cinnamon Herbal Extract and ARMOR Herbal Extract.
          </h2>
          <p className="mt-5 text-sm leading-7 text-white/70">
            Both products are available through Super Lady at NGN 14,000 each.
            Customers can order directly, upload a receipt, and share payment
            details through WhatsApp.
          </p>
        </div>
        <img
          src={assets.showcase}
          alt="Mudet product showcase"
          className="aspect-[4/3] w-full rounded-[26px] object-cover"
        />
      </section>

      <section className="rounded-[32px] border border-primary/15 bg-secondary p-7 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="section-kicker">Common questions</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-neutral-dark">
              What customers usually ask first.
            </h2>
          </div>
          <div className="grid gap-3">
            {[
              ["Are the products original?", "Yes. Super Lady stocks genuine Mudet Real Solution products."],
              ["Can I become a distributor?", "Yes. Use the Register page to choose a package and submit your details."],
              ["What products are available?", "Cinnamon Herbal Extract and ARMOR Herbal Extract are currently available."],
              ["How do I get delivery details?", "Submit an order or contact Super Lady directly for confirmation."],
            ].map(([question, answer]) => (
              <div key={question} className="rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex gap-3">
                  <BadgeCheck className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <h3 className="font-extrabold text-neutral-dark">{question}</h3>
                    <p className="mt-2 text-sm leading-7 text-neutral-soft">{answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
