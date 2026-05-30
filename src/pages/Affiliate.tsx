import React from "react";
import assets from "../assets/assets";
import { MdGroupAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import BenefitCard from "../components/common/BenefitCard";
import type { BenefitCardProps } from "../lib/interfaces";
import { GiProfit } from "react-icons/gi";
import { FaDownload, FaTools } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import LegCard from "../components/common/LegCard";
import FaqCard from "../components/common/FaqCard";

const Affiliate: React.FC = () => {
  const values: BenefitCardProps[] = [
    {
      name: "Attractive Earning Potential",
      icon: <GiProfit />,
      detail:
        "Benefit from competitive owners pricing that allows you to earn as you grow your network.",
    },
    {
      name: "Ready-to-Use Marketing Tools",
      icon: <FaTools />,
      detail:
        "Get access to professionally designed digital materials to help you share Double Red Rose with confidence.",
    },
    {
      name: "Trusted Quality",
      icon: <MdVerified />,
      detail:
        "Represent a carefully formulated wellness product made with quality ingredients and trusted production standards.",
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
            src={assets.member}
            alt="about-image"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
        <div className="flex flex-col gap-2 lg:gap-5 w-full lg:w-1/2">
          <h1 className="text-neutral-dark text-2xl lg:text-5xl font-semibold">
            Become an affiliate business owner{" "}
          </h1>

          <div className="w-full">
            <div className="flex flex-col gap-3">
              <p className="text-neutral-soft font-medium text-xs lg:text-sm">
                Join a growing community of wellness advocates and earn by
                sharing a premium daily health product people can trust. As a
                business owner, you gain access to a proven wellness formula,
                simple onboarding, and an opportunity to build income while
                promoting better living.
              </p>

              <p className="text-neutral-soft font-medium text-xs lg:text-sm">
                Start with your first order, use the product consistently, and
                confidently recommend it to others—turning everyday wellness
                into long-term value.
              </p>
            </div>
          </div>
          <div className="w-fit">
            <Link
              to={
                "https://www.affluenceglobaldream.com/en/gladys99/ng/agl/ref-member/LEFT"
              }
              target="_blank"
              className="flex items-center gap-2 bg-primary text-white font-semibold text-sm rounded-lg px-3 py-2 cursor-pointer"
            >
              <MdGroupAdd size={15} />
              Join the Network{" "}
            </Link>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-6 lg:gap-12">
        <div className="w-full flex items-center gap-2">
          <div className="w-1 h-6 bg-primary rounded-t-xl rounded-b-xl"></div>
          <h2 className="text-xl lg:text-2xl  text-neutral-dark font-semibold">
            Why Join Us?
          </h2>
        </div>
        <div className="flex items-center gap-5 lg:flex-row flex-col">
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
            Chose Your Placement
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          <LegCard
            tag="Fast Growth"
            title="Left Leg"
            description="Position yourself in the primary spillover leg for maximum team momentum."
            cta="Join Left Leg"
            href={
              "https://www.affluenceglobaldream.com/en/gladys99/ng/agl/ref-member/LEFT"
            }
          />

          <LegCard
            tag="Strategic"
            title="Right Leg"
            description="Ideal for balanced team building and maximizing personal bonus overrides."
            cta="Join Right Leg"
            href={
              "https://www.affluenceglobaldream.com/en/gladys99/ng/agl/ref-member/RIGHT"
            }
          />
        </div>
      </section>
      <section className="flex flex-col gap-5 sm:gap-6 lg:gap-10">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 sm:h-7 bg-primary rounded-full" />
          <h2 className="font-display text-lg sm:text-xl lg:text-2xl text-tetiary font-extrabold">
            Compensation & Package
          </h2>
        </div>
        <div className="rounded-2xl border border-secondary-dark/70 bg-white p-4 sm:p-6 shadow-md shadow-black/5">
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,420px)_1fr] lg:grid-cols-[minmax(0,460px)_auto] gap-5 sm:gap-6 items-center">
            <div className="w-full">
              <div className="w-full rounded-2xl bg-white shadow-lg shadow-black/10 overflow-hidden border border-secondary-dark/60">
                <div className="h-14 bg-primary flex items-center px-4">
                  <span className="text-white text-xs font-bold tracking-widest uppercase">
                    COMP PLAN {new Date().getFullYear()}
                  </span>
                </div>

                <div className="p-4 sm:p-5">
                  <div className="h-2 w-3/4 rounded bg-secondary-dark/70" />
                  <div className="mt-3 space-y-2">
                    <div className="h-2 w-full rounded bg-secondary-dark/60" />
                    <div className="h-2 w-11/12 rounded bg-secondary-dark/60" />
                    <div className="h-2 w-10/12 rounded bg-secondary-dark/60" />
                    <div className="h-2 w-8/12 rounded bg-secondary-dark/60" />
                  </div>

                  <div className="mt-6 flex items-center justify-center">
                    <div className="rounded-md border border-secondary-dark/70 px-3 py-1 text-[10px] font-bold text-neutral-soft">
                      PPTX
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-xs sm:text-sm text-neutral-soft">
                Download our detailed guide to bonuses and reward structures.
              </p>
            </div>
            <div className="flex md:justify-start lg:justify-end">
              <a
                href={"/complan.pptx"}
                download
                className="inline-flex w-full md:w-fit items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-md shadow-black/10 hover:brightness-110 transition"
              >
                <FaDownload />
                Download Package Details (PPTX)
              </a>
            </div>
          </div>
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

export default Affiliate;
