import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import productDetails from "../lib/productDetails";
import { formatPriceByCurrency } from "../utilities/formatterUtility";
import BenefitCard from "../components/common/BenefitCard";
import FaqCard from "../components/common/FaqCard";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { products } = productDetails;

  const benefits = [
    {
      title: "Genuine Mudet Supply",
      description:
        "Order authentic Mudet products directly from Super Lady, an approved stockist.",
    },
    {
      title: "Easy Local Delivery",
      description:
        "Fast order handling and simple pickup or delivery options across your city.",
    },
    {
      title: "Trusted Customer Support",
      description:
        "Clear order guidance, registration help, and direct support via phone or email.",
    },
  ];

  const faqs = [
    {
      question: "How do I order Mudet products?",
      answer:
        "Choose a product below and complete the order form. We will confirm your order and payment instructions.",
    },
    {
      question: "Can I register as a stockist?",
      answer:
        "Yes. Use the Register page to select your package, enter registration details, and complete your stockist application.",
    },
    {
      question: "What are the product prices?",
      answer:
        "Both Cinnamon Herbal Extract and ARMOR Herbal Extract sell for ₦14,000 each.",
    },
    {
      question: "How can I contact Super Lady?",
      answer:
        "Call 0816 055 0326 or send an email to mudetrealsolution@gmail.com.",
    },
  ];

  const handleOrder = (productId: string) => {
    sessionStorage.setItem("selectedProductId", productId);
    navigate("/purchase-product");
  };

  return (
    <div className="flex flex-col gap-14">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
        <div className="space-y-6">
          <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            Mudet Stockist • Super Lady
          </span>
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-dark">
              Buy Mudet products directly from Super Lady.
            </h1>
            <p className="max-w-2xl text-sm text-neutral-soft sm:text-base">
              Choose premium Mudet herbal extracts, register as a distributor,
              and get support with every order and stockist package.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:brightness-110 transition"
            >
              Register as Stockist
            </button>
            <button
              type="button"
              onClick={() => navigate("/contact")}
              className="inline-flex items-center justify-center rounded-xl border border-primary bg-white px-6 py-3 text-sm font-semibold text-primary hover:bg-primary/10 transition"
            >
              Contact Super Lady
            </button>
          </div>
        </div>

        <div className="rounded-[2rem] border border-secondary-dark/70 bg-secondary p-6 shadow-lg shadow-black/5">
          <div className="flex flex-col gap-4">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-soft">
              Featured Products
            </div>
            <div className="grid gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="rounded-3xl border border-secondary-dark/60 bg-white p-5 shadow-sm"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-44 w-full rounded-3xl object-cover"
                  />
                  <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-neutral-dark">
                        {product.name}
                      </h2>
                      <p className="mt-2 text-sm text-neutral-soft">
                        {product.description}
                      </p>
                    </div>
                    <div className="flex flex-col items-start gap-3 text-right sm:items-end">
                      <p className="text-lg font-bold text-primary">
                        {formatPriceByCurrency(product.price, "NGN")}
                      </p>
                      <button
                        type="button"
                        onClick={() => handleOrder(product.id)}
                        className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:brightness-110 transition"
                      >
                        <FaShoppingCart />
                        Order
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-secondary-dark/70 bg-white p-8 shadow-lg shadow-black/5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Stockist Registration
            </p>
            <h2 className="mt-3 text-2xl font-bold text-neutral-dark">
              Choose your Mudet distributor package and register with ease.
            </h2>
          </div>
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:brightness-110 transition"
          >
            Start Registration
          </button>
        </div>
        <p className="mt-4 text-sm text-neutral-soft">
          Select a package, enter your registration details, and complete your
          application without leaving the website.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {benefits.map((item) => (
          <BenefitCard
            key={item.title}
            name={item.title}
            icon={<span className="text-2xl">✓</span>}
            detail={item.description}
          />
        ))}
      </section>

      <section className="rounded-[2rem] border border-secondary-dark/70 bg-white p-8 shadow-lg shadow-black/5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-1 rounded-full bg-primary" />
          <h2 className="text-2xl font-bold text-neutral-dark">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="mt-6 grid gap-4">
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

export default Home;
