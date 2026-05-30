import React from "react";
import assets from "../assets/assets";
import BenefitCard from "../components/common/BenefitCard";
import type { BenefitCardProps } from "../lib/interfaces";
import { PiFlowerTulip } from "react-icons/pi";
import { MdCleanHands } from "react-icons/md";
import { GiRopeCoil } from "react-icons/gi";
import FaqCard from "../components/common/FaqCard";

const About: React.FC = () => {
  const values: BenefitCardProps[] = [
    {
      name: "Authentic Mudet Products",
      icon: <PiFlowerTulip />,
      detail:
        "We supply genuine Mudet Herbal Extract solutions with trusted sourcing and safe handling.",
    },
    {
      name: "Stockist Support",
      icon: <MdCleanHands />,
      detail:
        "Super Lady provides easy guidance for orders, registration, and product delivery.",
    },
    {
      name: "Daily Wellness Focus",
      icon: <GiRopeCoil />,
      detail:
        "Mudet products are designed for everyday use to support vitality, balance, and recovery.",
    },
  ];

  const faqs = [
    {
      question: "Are the Mudet products original?",
      answer:
        "Yes. Super Lady stocks genuine Mudet Real Solution products for customers in Nigeria.",
    },
    {
      question: "Can I become a distributor?",
      answer:
        "Absolutely. Use the Register page to select a package and submit your registration details.",
    },
    {
      question: "What products are available?",
      answer:
        "We currently offer Cinnamon Herbal Extract and ARMOR Herbal Extract, both at ₦14,000 each.",
    },
    {
      question: "How soon will I receive my order?",
      answer:
        "Delivery depends on your location, but we prioritize fast handling once your order is confirmed.",
    },
  ];

  return (
    <div className="flex flex-col gap-14">
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div className="space-y-5">
          <h1 className="text-4xl font-bold text-neutral-dark">About Super Lady</h1>
          <p className="max-w-2xl text-sm text-neutral-soft sm:text-base">
            Super Lady is your Mudet Real Solution stockist, providing a reliable way to buy Mudet products and register as a distributor. Our goal is to make ordering, registration, and support simple for every customer.
          </p>
          <p className="max-w-2xl text-sm text-neutral-soft sm:text-base">
            We focus on authenticity, clear communication, and the right package for every stockist. If you want to start selling Mudet, we guide you from registration through your first order.
          </p>
        </div>
        <div className="rounded-[2rem] border border-secondary-dark/70 bg-secondary p-6 shadow-lg shadow-black/5">
          <img
            src={assets.about}
            alt="About Mudet"
            className="h-full w-full rounded-[1.5rem] object-cover"
          />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {values.map((value) => (
          <BenefitCard
            key={value.name}
            name={value.name}
            icon={value.icon}
            detail={value.detail}
          />
        ))}
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-start">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-neutral-dark">Our Mudet Product Line</h2>
          <p className="text-sm text-neutral-soft sm:text-base">
            We stock two Mudet Herbal Extracts that are popular with customers and new distributors alike. Each product is priced at ₦14,000.
          </p>
        </div>
        <div className="rounded-[2rem] border border-secondary-dark/70 bg-white p-6 shadow-lg shadow-black/5">
          <img
            src={assets.showcase}
            alt="Mudet product showcase"
            className="w-full rounded-[1.5rem] object-cover"
          />
        </div>
      </section>

      <section className="rounded-[2rem] border border-secondary-dark/70 bg-white p-8 shadow-lg shadow-black/5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-1 rounded-full bg-primary" />
          <h2 className="text-2xl font-bold text-neutral-dark">Frequently Asked Questions</h2>
        </div>
        <div className="mt-6 grid gap-4">
          {faqs.map((faq) => (
            <FaqCard key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
