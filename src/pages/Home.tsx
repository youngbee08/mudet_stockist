import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import assets from "../assets/assets";
import {
  FaArrowRight,
  FaLeaf,
  FaShieldAlt,
  FaStar,
  FaStarHalf,
} from "react-icons/fa";
import { FaCartShopping, FaUserDoctor } from "react-icons/fa6";
import product from "../lib/productDetails";
import { useNavigate } from "react-router-dom";
import {
  getAltPrice,
  formatPayAmountFromNaira,
  useCurrencyPreference,
} from "../utilities/formatterUtility";
import type {
  BenefitCardProps,
  HowItWorksCardProps,
  HowToUseCardProps,
  IngredientCardProps,
  Review,
} from "../lib/interfaces";
import { GiCottonFlower } from "react-icons/gi";
import { BiSolidZap } from "react-icons/bi";
import { SiHoneygain } from "react-icons/si";
import BenefitCard from "../components/common/BenefitCard";
import HowItWorksCard from "../components/common/HowItWorkCard";
import IngredientCard from "../components/common/IngredientsCard";
import HowToUseCard from "../components/common/HowToUseCard";
import WhyChooseCard from "../components/common/WhyChooseCard";
import FaqCard from "../components/common/FaqCard";
import Stars from "../components/common/Stars";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import AttachmentModal from "../components/Modals/AttachementModal";
import CurrencyToggle from "../components/ui/CurrencyToggle";
import IngredientModal from "../components/Modals/IngredientModal";

const Home: React.FC = () => {
  const savedCount = sessionStorage.getItem("productCount");
  const [productCount, setProductCount] = useState(
    savedCount ? +savedCount : 1,
  );
  const [reviewAttachement, setReviewAttachement] = useState("");
  const navigate = useNavigate();
  const { currency, setCurrency } = useCurrencyPreference();
  const packageScrollRef = useRef<HTMLDivElement | null>(null);
  const [ingredientModal, setIngredientModal] =
    useState<IngredientCardProps | null>(null);
  const [visibleIngredients, setVisibleIngredients] = useState(3);
  const isMobile =
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 767px)").matches
      : false;

  const dollarPricing = [
    { name: "Associate", count: 1, price: 65 },
    { name: "Promoter", count: 3, price: 195 },
    { name: "Business Builder", count: 15, price: 600, discount: 975 },
    { name: "Business Owner", count: 30, price: 1200, discount: 1950 },
  ];

  const nairaPricing = [
    { name: "Associate", count: 1, price: 73600 },
    { name: "Promoter", count: 3, price: 200000, discount: 220800 },
    { name: "Business Builder", count: 15, price: 840000, discount: 1104000 },
    { name: "Business Owner", count: 30, price: 1672000, discount: 2208000 },
  ];

  const packages = currency === "USD" ? dollarPricing : nairaPricing;

  const currencyLabel = currency === "USD" ? "USD" : "NGN";
  const formatMoneyNumber = (amount: number) =>
    new Intl.NumberFormat(currency === "USD" ? "en-US" : "en-NG", {
      maximumFractionDigits: 0,
    }).format(amount);

  const packageThemes = [
    {
      header: "bg-primary",
      button: "bg-primary text-white hover:brightness-110",
    },
    {
      header: "bg-primary-deep",
      button: "bg-primary-deep text-white hover:brightness-110",
    },
  ];

  const manageProductQuantity = (type = "add") => {
    if (type === "add") {
      setProductCount(productCount + 1);
      return;
    }
    if (productCount === 1) {
      return;
    }
    setProductCount(productCount - 1);
  };

  const benefits: BenefitCardProps[] = [
    {
      name: "Pure, Plant-Based Formula",
      icon: <GiCottonFlower />,
      detail:
        "Made with carefully selected red botanicals and superfruits, no artificial colors, no fillers, and no added sugar. Clean nutrition your body can recognize and use daily.",
    },
    {
      name: "Daily Vitality Boost",
      icon: <BiSolidZap />,
      detail:
        "Designed to support natural energy, mental clarity, and immune strength when taken consistently. Feel refreshed, focused, and ready to take on your day.",
    },
    {
      name: "Quality You Can Trust",
      icon: <SiHoneygain />,
      detail:
        "Formulated with evidence-based nutraceuticals and produced in GMP-certified, FDA-registered facilities using independently tested ingredients.",
    },
  ];

  const howItWorks: HowItWorksCardProps[] = [
    {
      name: "Place Your Order",
      id: "1",
      detail:
        "Choose your preferred package and complete a secure checkout to begin your journey as a member.",
    },
    {
      name: "Receive & Experience",
      id: "2",
      detail:
        "Enjoy fast delivery and start using Double Red Rose daily to support your wellness and track your results.",
    },
    {
      name: "Share & Grow",
      id: "3",
      detail:
        "Recommend Double Red Rose to others, share your referral link confidently, and earn consistent rewards as your network expands and your impact grows.",
    },
  ];

  const ingredients: IngredientCardProps[] = [
    {
      title: "Red Rose Extract",
      description:
        "Rich in phytonutrients and antioxidants that support cellular health and skin vitality.",
      image: assets.rose,
    },
    {
      title: "Goji Berry",
      description:
        "A powerful antioxidant superfruit traditionally used to support immunity and energy.",
      image: assets.goji,
    },
    {
      title: "N-Acetyl Cysteine (NAC)",
      description:
        "Helps support glutathione production, promoting antioxidant defense and cellular protection.",
      image: assets.nac,
    },

    {
      title: "Pomegranate",
      description:
        "Supports healthy aging, skin health, and antioxidant defense.",
      image: assets.pomegranate,
    },
    {
      title: "Red Grapes",
      description:
        "Natural source of resveratrol and polyphenols for cellular protection.",
      image: assets.grape,
    },
    {
      title: "Acerola Cherry",
      description: "Naturally high in vitamin C to support immune function.",
      image: assets.acerola,
    },
    {
      title: "Peach Extract",
      description:
        "Contributes antioxidants and supports hydration and digestion.",
      image: assets.peach,
    },
    {
      title: "Chinese Date (Jujube)",
      description:
        "Traditionally used to support energy, mood balance, and overall vitality.",
      image: assets.jujube,
    },
    {
      title: "Red Ginseng Extract",
      description: "Supports mental clarity, focus, and physical energy.",
      image: assets.ginseng,
    },
    {
      title: "Locust Honey",
      description:
        "Natural sweetener that supports energy and nutrient absorption.",
      image: assets.honey,
    },
    {
      title: "Lemon Extract",
      description: "Supports hydration, digestion, and freshness of taste.",
      image: assets.lemon,
    },
  ];

  const howToUse: HowToUseCardProps[] = [
    {
      step: 1,
      title: "Take Daily as Recommended",
      description:
        "Consume one sachet each day as directed to support consistent nutrient intake and overall wellness.",
    },
    {
      step: 2,
      title: "Stay Consistent",
      description:
        "Daily use allows your body to absorb and respond to key nutrients effectively over time.",
    },
    {
      step: 3,
      title: "Listen to Your Body",
      description:
        "Observe how you feel as you continue use and make adjustments with professional guidance if needed.",
    },
  ];

  const whyChooseUs = [
    {
      icon: <FaLeaf className="text-base" />,
      title: "Premium Quality Ingredients",
      description:
        "Our products are made with carefully selected ingredients to ensure safety, purity, and effectiveness.",
    },
    {
      icon: <FaUserDoctor className="text-base" />,
      title: "Strong Partner Support",
      description:
        "As an affiliate business owner, you get access to guidance, community, and ongoing support.",
    },
    {
      icon: <FaShieldAlt className="text-base" />,
      title: "Trusted Wellness Brand",
      description:
        "Used by partners across multiple regions, Double Red Rose is built on trust and transparency.",
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

  const reviews: Review[] = [
    {
      name: "Bekezela PRN",
      title: "More strength & better rest",
      remark:
        "I’m grateful. After staying consistent, my mum felt noticeably stronger and more comfortable, and she slept well. We’re really happy with the experience.",
      rating: 4,
      source: "WhatsApp",
      attachment: assets.att1,
    },
    {
      name: "Samuel Osei",
      title: "Quick wellness support",
      remark:
        "After a few sachets, my wife felt much better and more active. This product has been a great support in our home.",
      rating: 5,
      source: "WhatsApp",
      attachment: assets.att2,
    },
    {
      name: "Anima",
      title: "Less tired after work",
      remark:
        "I used it consistently for several days and I felt less tired and more balanced after work. I can see why people recommend it.",
      rating: 4,
      source: "WhatsApp",
      attachment: assets.att3,
    },
    {
      name: "Honorine Relax",
      title: "Encouraging personal progress",
      remark:
        "A client shared very encouraging progress after staying consistent with Double Red Rose as part of her wellness routine. We’re grateful for the positive feedback and experience.",
      rating: 5,
      source: "WhatsApp",
      attachment: assets.att4,
    },
  ];

  const [index, setIndex] = useState(0);

  const visibleCount =
    typeof window !== "undefined" && window.innerWidth >= 1024
      ? 3
      : typeof window !== "undefined" && window.innerWidth >= 768
        ? 2
        : 1;

  const total = reviews.length;

  const next = () => {
    setIndex((prev) => (prev + 1) % total);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + total) % total);
  };

  useEffect(() => {
    if (productCount > 1) {
      sessionStorage.setItem("productCount", productCount.toString());
    }
  }, [productCount]);

  const handleViewMoreIngredients = () => {
    setVisibleIngredients((prev) => Math.min(prev + 3, ingredients.length));
  };

  return (
    <>
      <div className="flex flex-col gap-10 lg:gap-14">
        <section className="flex lg:flex-row flex-col gap-6 lg:gap-12 items-start">
          <div className="w-full lg:w-1/2 h-full bg-neutral-soft/30 backdrop-blur-2xl rounded-2xl relative">
            <img
              src={assets.mockup}
              alt="mockup-image"
              className="w-full h-full object-cover rounded-2xl"
            />
            <span className="absolute top-3 right-6 bg-primary text-white rounded-2xl px-3 py-1 text-xs uppercase font-semibold">
              in stock
            </span>
          </div>
          <div className="flex flex-col gap-2 lg:gap-5 w-full lg:w-1/2">
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4].map((_, index) => (
                  <FaStar
                    key={index}
                    className="w-2.75 text-primary font-semibold"
                  />
                ))}
                <FaStarHalf className="w-2.75 text-primary font-semibold" />
              </div>
              <h4 className="text-neutral-soft text-xs font-medium">
                (4.8/5 from 1,200 + users)
              </h4>
            </div>
            <div className="flex flex-col">
              <h1 className="text-neutral-dark text-2xl lg:text-5xl font-semibold">
                Nourish Your Body.{" "}
              </h1>
              <h1 className="text-primary text-2xl lg:text-5xl font-semibold">
                Elevate Your Lifestyle.{" "}
              </h1>
            </div>
            <div className="w-full">
              <p className="text-neutral-soft font-medium text-xs lg:text-sm">
                Discover a premium wellness supplement crafted to support daily
                vitality, immunity, and mental clarity. Made with carefully
                selected botanicals and superfruits to help you perform at your
                best every single day. Join our growing global community of
                business owners today.
              </p>
            </div>
            <div className="border border-neutral-soft/20 rounded-2xl bg-white shadow flex flex-col gap-3 px-5 py-3 w-full lg:w-[55%] sm:w-1/2">
              <div className="flex items-start justify-between gap-1">
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-semibold text-primary">
                    {formatPayAmountFromNaira(
                      product.price * productCount,
                      currency,
                    )}
                  </h3>
                  <p className="text-xs font-medium text-neutral-soft">
                    Get discount on over 15 items.
                  </p>
                </div>
                <CurrencyToggle currency={currency} onChange={setCurrency} />
              </div>
              <div className="flex items-center gap-4 w-full lg:justify-between">
                <div className="bg-neutral-soft/10 border border-neutral-soft/10 rounded-lg flex items-center gap-3 px-3 py-2 lg:w-[35%]  justify-between">
                  <button
                    className="text-neutral-dark text-sm font-semibold cursor-pointer"
                    onClick={() => manageProductQuantity("deduct")}
                  >
                    -
                  </button>
                  <span className="text-neutral-dark text-sm font-semibold">
                    {productCount}
                  </span>
                  <button
                    className="text-neutral-dark text-sm font-semibold cursor-pointer"
                    onClick={() => manageProductQuantity()}
                  >
                    +
                  </button>
                </div>
                <div className="">
                  <button
                    onClick={() => navigate("/purchase-product")}
                    className="flex items-center gap-2 bg-primary text-white font-semibold text-sm rounded-lg px-3 py-2 cursor-pointer"
                  >
                    <FaCartShopping size={15} />
                    Buy Now
                    <FaArrowRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="flex flex-col gap-6 lg:gap-2">
          <div className="w-full flex items-center gap-2">
            <div className="w-1 h-6 bg-primary rounded-t-xl rounded-b-xl"></div>
            <h2 className="text-xl lg:text-2xl text-neutral-dark font-semibold">
              Choose Your Package
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-sm leading-7 text-neutral-soft max-w-2xl">
              Select a starting level and begin your journey with a package that
              fits your goals.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrency("NGN")}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                  currency === "NGN"
                    ? "bg-primary text-white"
                    : "bg-secondary-dark/10 text-neutral-dark"
                }`}
              >
                Nigeria
              </button>

              <button
                onClick={() => setCurrency("USD")}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                  currency === "USD"
                    ? "bg-primary text-white"
                    : "bg-secondary-dark/10 text-neutral-dark"
                }`}
              >
                USA
              </button>
            </div>
          </div>

          <div className="relative w-full">
            <button
              onClick={() => {
                packageScrollRef.current?.scrollBy({
                  left: -320,
                  behavior: "smooth",
                });
              }}
              className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white border border-primary text-primary shadow flex items-center justify-center hover:bg-primary hover:text-white transition"
              aria-label="Scroll packages left"
            >
              <HiChevronLeft />
            </button>

            <div
              ref={packageScrollRef}
              className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth py-4 styled-scrollbar"
            >
              {packages.map((pkg, index) => {
                const payPrice = pkg.discount
                  ? getAltPrice(pkg.discount)
                  : pkg.price;
                const theme =
                  packageThemes[
                    Math.floor(index + 1 / 2) % packageThemes.length
                  ];

                return (
                  <div
                    key={index}
                    onClick={() => {
                      sessionStorage.setItem("productCount", String(pkg.count));
                      navigate("/purchase-product");
                    }}
                    className="min-w-68 sm:min-w-64 cursor-pointer group rounded-2xl overflow-hidden border border-secondary-dark/70 bg-white shadow-sm transition hover:shadow-md hover:-translate-y-1"
                  >
                    <div className={`${theme.header} px-5 py-4`}>
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-lg font-semibold text-white group-hover:underline">
                          {pkg.name}
                        </h3>
                      </div>
                    </div>

                    <div className="px-5 py-5 flex flex-col">
                      <p className="text-sm text-neutral-soft">
                        {pkg.count} {pkg.count === 1 ? "Pack" : "Packs"}
                      </p>

                      <div className="mt-3 flex flex-col gap-1">
                        <span className="h-5 text-sm text-neutral-soft line-through">
                          {pkg.discount
                            ? `${formatMoneyNumber(pkg.discount)} ${currencyLabel}`
                            : "\u00A0"}
                        </span>

                        <div className="flex items-end gap-2">
                          <span className="text-xl font-bold text-neutral-dark leading-none">
                            {formatMoneyNumber(payPrice)}
                          </span>
                          <span className="pb-0.5 text-xs tracking-widest text-neutral-soft">
                            {currencyLabel}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        className={`mt-5 w-fit rounded-full px-6 py-2.5 text-sm font-semibold transition ${theme.button}`}
                      >
                        Get Started
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => {
                packageScrollRef.current?.scrollBy({
                  left: 320,
                  behavior: "smooth",
                });
              }}
              className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white border border-primary text-primary shadow flex items-center justify-center hover:bg-primary hover:text-white transition"
              aria-label="Scroll packages right"
            >
              <HiChevronRight />
            </button>
          </div>
        </section>
        <section className="flex flex-col gap-6 lg:gap-12">
          <div className="w-full flex items-center gap-2">
            <div className="w-1 h-6 bg-primary rounded-t-xl rounded-b-xl"></div>
            <h2 className="text-xl lg:text-2xl  text-neutral-dark font-semibold">
              Key Benefits
            </h2>
          </div>
          <div className="flex lg:items-center gap-5 lg:flex-row flex-col">
            {benefits.map((benefit, index) => (
              <BenefitCard
                name={benefit.name}
                icon={benefit.icon}
                detail={benefit.detail}
                key={index}
              />
            ))}
          </div>
        </section>
        <section className="flex flex-col gap-6 lg:gap-12">
          <div className="w-full flex items-center gap-2">
            <div className="w-1 h-6 bg-primary rounded-t-xl rounded-b-xl"></div>
            <h2 className="text-xl lg:text-2xl  text-neutral-dark font-semibold">
              How It Works
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-3 lg:gap-7 lg:place-items-center">
            {howItWorks.map((h) => (
              <HowItWorksCard
                key={h.id}
                name={h.name}
                id={h.id}
                detail={h.detail}
              />
            ))}
          </div>
        </section>
        <section className="flex flex-col gap-6 lg:gap-12">
          <div className="w-full flex items-center gap-2">
            <div className="w-1 h-6 bg-primary rounded-t-xl rounded-b-xl"></div>
            <h2 className="text-xl lg:text-2xl  text-neutral-dark font-semibold">
              Premium Ingredients
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
            {(isMobile
              ? ingredients.slice(0, visibleIngredients)
              : ingredients
            ).map((ingredient, index) => (
              <IngredientCard
                key={index}
                title={ingredient.title}
                image={ingredient.image}
                description={
                  isMobile
                    ? `${ingredient.description.slice(0, 30)}...`
                    : ingredient.description
                }
                onClick={() => setIngredientModal(ingredient)}
              />
            ))}
          </div>
          {isMobile && visibleIngredients < ingredients.length && (
            <div className="flex justify-end">
              <button
                onClick={handleViewMoreIngredients}
                className="flex justify-end text-primary font-semibold transition duration-300 underline"
              >
                View More
              </button>
            </div>
          )}
        </section>
        <section className="flex flex-col gap-6 lg:gap-12">
          <div className="w-full flex items-center gap-2">
            <div className="w-1 h-6 bg-primary rounded-t-xl rounded-b-xl"></div>
            <h2 className="text-xl lg:text-2xl  text-neutral-dark font-semibold">
              How To Use
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {howToUse.map((item) => (
              <HowToUseCard
                key={item.step}
                step={item.step}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </section>
        <section className="flex flex-col gap-6 lg:gap-12">
          <div className="w-full flex items-center gap-2">
            <div className="w-1 h-6 bg-primary rounded-t-xl rounded-b-xl"></div>
            <h2 className="text-xl lg:text-2xl  text-neutral-dark font-semibold">
              Why Choose us
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item) => (
              <WhyChooseCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
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
        <section className="relative flex flex-col gap-6 lg:gap-10">
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
              >
                {reviews.slice(index, index + visibleCount).map((r) => (
                  <motion.article
                    key={`${r.name}-${r.title}`}
                    whileHover={{ y: -3 }}
                    className="h-full rounded-3xl border border-secondary-dark/70 bg-white p-5 sm:p-6 transition"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex flex-col gap-1 min-w-0">
                        <p className="font-display text-base font-extrabold text-tetiary truncate">
                          {r.name}
                        </p>
                      </div>

                      <Stars rating={r.rating} />
                    </div>

                    <h3 className="mt-4 font-display text-lg font-extrabold text-tetiary leading-tight">
                      {r.title}
                    </h3>

                    <p className="my-2 text-sm text-neutral-soft leading-relaxed">
                      “{r.remark}”
                    </p>

                    <span
                      onClick={() => setReviewAttachement(r.attachment)}
                      className="cursor-pointer italic hover:underline text-xs text-primary absolute bottom-2"
                    >
                      View Attachment
                    </span>
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="h-10 w-10 rounded-full border border-secondary-dark/70 bg-white flex items-center justify-center hover:bg-primary hover:text-white transition"
              >
                <HiChevronLeft className="text-xl" />
              </button>

              <button
                onClick={next}
                className="h-10 w-10 rounded-full border border-secondary-dark/70 bg-white flex items-center justify-center hover:bg-primary hover:text-white transition"
              >
                <HiChevronRight className="text-xl" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={[
                    "h-2.5 rounded-full transition-all duration-300",
                    index === i ? "w-6 bg-primary" : "w-2.5 bg-secondary-dark",
                  ].join(" ")}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
      <AttachmentModal
        image={reviewAttachement}
        isOpen={reviewAttachement ? true : false}
        onClose={() => setReviewAttachement("")}
        allowDownload
      />
      <IngredientModal
        ingredient={ingredientModal}
        isOpen={Boolean(ingredientModal)}
        onClose={() => setIngredientModal(null)}
      />
    </>
  );
};

export default Home;
