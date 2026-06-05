import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Check } from "lucide-react";
import productDetails from "../lib/productDetails";
import { formatPriceByCurrency } from "../utilities/formatterUtility";
import assets from "../assets/assets";
import type { HowItWorksCardProps } from "../lib/interfaces";
import HowItWorksCard from "../components/common/HowItWorkCard";
import { FaDownload } from "react-icons/fa";
import { TiUserAdd } from "react-icons/ti";
import { FaBoxOpen, FaHeartbeat, FaSitemap } from "react-icons/fa";

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

  const howItWorks: HowItWorksCardProps[] = [
    {
      name: "Choose Your Entry Package",
      id: "1",
      icon: <FaBoxOpen />,
      detail:
        "Select from our seven business packages to access genuine herbal products and start your wellness journey.",
    },
    {
      name: "Experience Natural Wellness",
      id: "2",
      icon: <FaHeartbeat />,
      detail:
        "Use our potent Cinnamon and Armor herbal extracts daily to boost immunity, vitality, and overall health.",
    },
    {
      name: "Share, Network & Earn",
      id: "3",
      icon: <FaSitemap />,
      detail:
        "Refer others to the system, build your sponsor tree, and unlock multiple bonuses as your network grows.",
    },
  ];

  return (
    <div className="flex flex-col gap-20 ">
      <section className="lg:min-h-[calc(100svh-6.5rem)] overflow-hidden lg:mt-0 mt-10">
        {/* <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,transparent,#dcecdc)]" /> */}

        <div className="relative grid lg:min-h-[calc(100svh-13rem)] items-center gap-10 lg:grid-cols-2">
          <motion.div
            className="lg:min-w-2xl flex flex-col gap-8"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <div className="flex flex-col gap-3 lg:gap-6">
              <h1 className=" font-display text-3xl font-bold leading-[0.98] text-neutral-dark sm:text-6xl lg:text-5xl">
                Shop Mudet Health Products & Join the Network{" "}
              </h1>

              <p className=" max-w-xl text-sm leading-8 text-neutral-soft sm:text-base">
                Get your genuine Mudet herbal extracts from Mercy. Receive
                direct support to{" "}
                <Link
                  to={"/purchase-product"}
                  className="text-primary-deep underline font-bold"
                >
                  buy
                </Link>{" "}
                your products, or{" "}
                <Link
                  to={"/register"}
                  className="text-primary-deep underline font-bold"
                >
                  register
                </Link>{" "}
                right here to start earning as a network marketer or stockist.
              </p>
            </div>

            <div className=" flex flex-col gap-3 sm:flex-row">
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
                Register as Networker
              </button>
            </div>
          </motion.div>

          <motion.div
            className="w-146.25 h-115 lg:block hidden"
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
          >
            <img
              src={assets.cinamon}
              alt="Mudet herbal extract product showcase"
              className="w-full h-full object-contain "
            />
          </motion.div>
        </div>
      </section>
      {/* 
      <motion.section {...fadeUp} className="grid gap-5 md:grid-cols-3">
        {[
          {
            icon: <PackageCheck className="h-5 w-5" />,
            title: "Original stock",
            text: "Products are supplied through Mercy with clear order confirmation.",
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
            <p className="mt-3 text-sm leading-7 text-neutral-soft">
              {item.text}
            </p>
          </div>
        ))}
      </motion.section>  */}

      <motion.section {...fadeUp} className="flex flex-col gap-4">
        <div>
          <h2 className="font-display text-xl font-bold leading-tight text-neutral-dark sm:text-3xl">
            Featured Products
          </h2>
          <p className="text-sm leading-8 text-neutral-soft">
            Each product is available for direct order at clear price. Select a
            bottle and continue to the purchase form.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {products.map((product, index) => (
            <motion.article
              key={product.id}
              className={[
                "group overflow-hidden rounded-2xl border bg-white shadow-xl shadow-black/5",
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
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-extrabold text-neutral-dark">
                    {product.name}
                  </h3>
                  <p className="shrink-0 rounded-2xl bg-accent-soft px-3 py-1 text-sm font-extrabold text-accent">
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

      <motion.section {...fadeUp} className="flex flex-col gap-4">
        <div>
          <h2 className="font-display text-xl font-bold leading-tight text-neutral-dark sm:text-3xl">
            Experience Wellness, Build Prosperity{" "}
          </h2>
          <p className="text-left text-sm leading-7 text-neutral-soft w-full lg:w-[70%]">
            Follow the proven path: start by ordering genuine herbal solutions
            for your health, register your package, and inspire your community
            while securing generational freedom.{" "}
          </p>
        </div>

        <div className="relative w-full max-w-[1000px] mx-auto mt-6 md:mt-10">
          <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
            <svg
              className="absolute top-[8%] left-[24%] w-[20%] h-[80px] overflow-visible"
              viewBox="0 0 100 40"
              preserveAspectRatio="none"
            >
              <defs>
                <marker
                  id="arrowhead1"
                  markerWidth="6"
                  markerHeight="6"
                  refX="5"
                  refY="3"
                  orient="auto"
                >
                  <polygon points="0 0, 6 3, 0 6" fill="#333" />
                </marker>
              </defs>
              <path
                d="M 0,30 Q 50,-15 100,25"
                fill="transparent"
                stroke="#333"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                markerEnd="url(#arrowhead1)"
              />
            </svg>
            <svg
              className="absolute top-[18%] left-[56%] w-[20%] h-[80px] overflow-visible"
              viewBox="0 0 100 40"
              preserveAspectRatio="none"
            >
              <defs>
                <marker
                  id="arrowhead2"
                  markerWidth="6"
                  markerHeight="6"
                  refX="5"
                  refY="3"
                  orient="auto"
                >
                  <polygon points="0 0, 6 3, 0 6" fill="#333" />
                </marker>
              </defs>
              <path
                d="M 0,10 Q 50,55 100,15"
                fill="transparent"
                stroke="#333"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                markerEnd="url(#arrowhead2)"
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:gap-14 lg:grid-cols-3 lg:gap-4 relative z-10 w-full place-items-center">
            {howItWorks.map((h) => (
              <HowItWorksCard
                key={h.id}
                name={h.name}
                id={h.id}
                detail={h.detail}
                icon={h.icon}
              />
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section {...fadeUp} className="">
        <div className="rounded-2xl bg-neutral-dark p-7 text-white shadow-2xl shadow-black/10 sm:p-10">
          <h2 className="mt-3 font-display text-xl font-bold leading-tight sm:text-3xl">
            Your Natural Path to Better Health and Abundant Wealth{" "}
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-8 text-white/75">
            Select a business entry package to access exclusive herbal extracts,
            track your network's growth, and multiply your income through retail
            margins, referral commissions, and store sponsor bonuses.
          </p>
          <div className="flex gap-3 mt-5 flex-col lg:flex-row">
            <Link to={"/register"} className="btn-primary flex gap-2">
              <TiUserAdd />
              Register Now
            </Link>
            <a
              download={true}
              href="/complan.pdf"
              className="btn-secondary flex gap-2"
            >
              {" "}
              <FaDownload /> Download Compesation Plan
            </a>
          </div>
          <div className="mt-8 hidden lg:grid gap-3 sm:grid-cols-3">
            {[
              "Multiple Streams of Income",
              "25% Retail Profit Margins",
              "High Direct Referral Bonuses",
              "Passive Indirect Referral Bonuses",
              "Flexible Entry and Easy Upgrades",
              "Luxury Rank Awards and Incentives",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl bg-white/8 px-4 py-4"
              >
                <Check className="h-5 w-5 text-accent-soft" />
                <span className="text-sm font-bold">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section {...fadeUp} className="flex flex-col gap-4">
        <div>
          <h2 className="font-display text-xl font-bold leading-tight text-neutral-dark sm:text-3xl">
            What customers usually ask first.
          </h2>
          <p className="text-left text-sm leading-7 text-neutral-soft">
            Find quick answers to the most common questions about our products
            and services.
          </p>
        </div>
        <div className="grid gap-3">
          {[
            [
              "Are the products original?",
              "Yes, all products are genuine Mudet Real Solution supplements.",
            ],
            [
              "Can I register?",
              "Yes, you can join as a networker or stockist through any available package.",
            ],
            [
              "What products are available?",
              "We offer Cinnamon Herbal Extract and ARMOR Herbal Extract for wellness and vitality support.",
            ],
            [
              "How is delivery arranged?",
              "Place an order or contact us directly to confirm delivery details.",
            ],
          ].map(([question, answer]) => (
            <div key={question} className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex gap-3">
                <BadgeCheck className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <h3 className="font-extrabold text-neutral-dark">
                    {question}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-neutral-soft">
                    {answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        {...fadeUp}
        className="relative overflow-hidden rounded-2xl border border-primary/15 bg-secondary p-7 sm:p-10 lg:p-12"
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-neutral-dark sm:text-5xl">
              Order today or ask Mercy before you buy.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-neutral-soft">
              Use the product order form for a clean checkout path, or contact
              Mercy for payment and delivery guidance.
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
              Contact Mercy
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
