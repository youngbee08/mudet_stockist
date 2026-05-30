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
      name: "Purity",
      icon: <PiFlowerTulip />,
      detail:
        "Made with carefully selected red botanicals and superfruits, free from unnecessary additives.",
    },
    {
      name: "Quality",
      icon: <MdCleanHands />,
      detail:
        "Formulated with high-grade ingredients and produced under strict quality standards for consistent results.",
    },
    {
      name: "Consistency",
      icon: <GiRopeCoil />,
      detail:
        "Designed for daily use to support long-term wellness through regular, mindful intake.",
    },
  ];

  const faqs = [
    {
      question: "Is this product safe to use?",
      answer:
        "Yes. Our products are made with carefully sourced ingredients and follow recommended safety standards.",
    },
    {
      question: "Do I need experience to become an affiliate?",
      answer:
        "No experience is required. You’ll receive guidance and support to help you get started.",
    },
    {
      question: "How soon can I see results?",
      answer:
        "Results vary depending on consistency and individual response, but many users notice changes over time.",
    },
    {
      question: "How do I get started?",
      answer:
        "Simply reach out to us or follow the sign-up process. We’ll guide you step by step.",
    },
  ];
  return (
    <div className="flex flex-col gap-10 lg:gap-14">
      <section className="flex lg:flex-row flex-col-reverse gap-6 lg:gap-12 items-start">
        <div className="w-full lg:w-1/2 h-full bg-neutral-soft/30 backdrop-blur-2xl rounded-2xl">
          <img
            src={assets.about}
            alt="about-image"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
        <div className="flex flex-col gap-2 lg:gap-5 w-full lg:w-1/2">
          <h1 className="text-neutral-dark text-2xl lg:text-5xl font-semibold">
            Crafted for Daily Wellness{" "}
          </h1>

          <div className="w-full">
            <div className="flex flex-col gap-3">
              <p className="text-neutral-soft font-medium text-xs lg:text-sm">
                The human body functions as a connected system built from cells,
                tissues, organs, and body systems, with healthy cells forming
                the foundation of overall wellbeing. Each day, these cells are
                exposed to metabolic and environmental stress that can affect
                balance over time.
              </p>

              <p className="text-neutral-soft font-medium text-xs lg:text-sm">
                Antioxidants help protect cells by neutralizing free radicals
                and reducing oxidative stress. A key antioxidant produced by the
                body is{" "}
                <span className="font-semibold text-primary">glutathione</span>,
                which supports immune balance, detox processes, and cellular
                stability.{" "}
                <span className="font-semibold text-primary">
                  N-Acetyl Cysteine (NAC)
                </span>{" "}
                supports glutathione production by supplying cysteine, helping
                maintain strong antioxidant defenses.
              </p>

              <p className="text-neutral-soft font-medium text-xs lg:text-sm">
                Double Red Rose is formulated to support antioxidant activity at
                the cellular level, helping protect cells from oxidative stress,
                support glutathione-related functions, and promote healthier
                tissues, organs, and overall wellness.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-6 lg:gap-12">
        <div className="w-full flex items-center gap-2">
          <div className="w-1 h-6 bg-primary rounded-t-xl rounded-b-xl"></div>
          <h2 className="text-xl lg:text-2xl text-neutral-dark font-semibold">
            The Product
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="relative w-full flex justify-center">
            <div className="absolute inset-0 bg-primary/10 blur-3xl opacity-40 rounded-full" />

            <div className="relative w-full lg:max-w-md rounded-2xl border border-secondary-dark/70 bg-white shadow-xl shadow-black/10">
              <img
                src={assets.showcase}
                alt="Double Red Rose Product"
                className="w-full object-contain rounded-2xl"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-2xl lg:text-3xl font-semibold text-neutral-dark">
              Double Red Rose
            </h3>

            <p className="text-xs lg:text-sm text-neutral-soft leading-relaxed">
              A carefully formulated blend of powerful red botanicals and
              antioxidant-rich extracts designed to support cellular protection,
              immune balance, and overall vitality.
            </p>

            <ul className="flex flex-col gap-2 text-xs lg:text-sm text-neutral-soft">
              <li>• Supports antioxidant defense</li>
              <li>• Promotes cellular protection</li>
              <li>• Supports glutathione activity</li>
              <li>• Designed for consistent daily wellness</li>
            </ul>

            <div>
              <span className="inline-flex items-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-md">
                Daily Wellness Formula
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-6 lg:gap-12">
        <div className="w-full flex items-center gap-2">
          <div className="w-1 h-6 bg-primary rounded-t-xl rounded-b-xl"></div>
          <h2 className="text-xl lg:text-2xl  text-neutral-dark font-semibold">
            Core Values
          </h2>
        </div>
        <div className="flex lg:items-center gap-5 lg:flex-row flex-col">
          {values.map((value, index) => (
            <BenefitCard
              name={value.name}
              icon={value.icon}
              detail={value.detail}
              key={index}
            />
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-6 lg:gap-12">
        <div className="w-full flex items-center gap-2">
          <div className="w-1 h-6 bg-primary rounded-t-xl rounded-b-xl"></div>
          <h2 className="text-xl lg:text-2xl  text-neutral-dark font-semibold">
            FAQs
          </h2>
        </div>
        <div className="w-full mx-auto flex flex-col gap-3">
          {faqs.map((faq) => (
            <FaqCard
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
