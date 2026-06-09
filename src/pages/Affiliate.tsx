import React, { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Check, Send } from "lucide-react";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import { CiWarning } from "react-icons/ci";
import { useFormik } from "formik";
import { affiliateFormSchema } from "../lib/validationSchemas";

const BANK_DETAILS = {
  accountNumber: "2048297903",
  accountName: "KAROLINK INTER BIZ LIMITED",
  bank: "First Bank",
  whatsappPhone: "2348160550326",
  displayPhone: "0816 055 0326",
};

const packages = [
  { id: "lunch", name: "Lunch", price: 14000, pv: 10, products: "1 bottle" },
  { id: "ignite", name: "Ignite", price: 28000, pv: 30, products: "2 bottles" },
  {
    id: "momentum",
    name: "Momentum",
    price: 70000,
    pv: 80,
    products: "5 bottles",
  },
  {
    id: "power",
    name: "Power",
    price: 182000,
    pv: 200,
    products: "13 bottles",
  },
  {
    id: "scale",
    name: "Scale",
    price: 406000,
    pv: 500,
    products: "29 bottles",
  },
  {
    id: "turbo",
    name: "Turbo",
    price: 700000,
    pv: 700,
    products: "50 bottles",
  },
  {
    id: "legend",
    name: "Legend",
    price: 1050000,
    pv: 1000,
    products: "75 bottles",
  },
];

const Affiliate: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState(packages[0].id);
  const [submitted, setSubmitted] = useState(false);

  const selectedPackageDetails =
    packages.find((pkg) => pkg.id === selectedPackage) || packages[0];

  const formik = useFormik({
    initialValues: {
      userName: "",
      fullName: "",
      gender: "",
      dob: "",
      email: "",
      phone: "",
      city: "",
      accountNumber: "",
      accountName: "",
      bankName: "",
    },
    validationSchema: affiliateFormSchema,
    onSubmit: (values) => {
      const message = `*📌 MUDET AFFILIATE REGISTRATION 📌*

*═══════════════════════════════*
*SPONSOR & PACKAGE INFORMATION*
*═══════════════════════════════*
Sponsor Username: mercy01
Reg. Package: ${selectedPackageDetails.name}
Price: NGN ${selectedPackageDetails.price.toLocaleString()}
PV Points: ${selectedPackageDetails.pv}
Products: ${selectedPackageDetails.products}

*═══════════════════════════════*
*NEW MEMBER DETAILS*
*═══════════════════════════════*
Username: ${values.userName}
Full Name: ${values.fullName}
Gender: ${values.gender}
Date Of Birth: ${values.dob}
Active E-mail: ${values.email}
Mobile No: ${values.phone}
Pick up City: ${values.city}

*═══════════════════════════════*
*ACCOUNT DETAILS*
*═══════════════════════════════*
Account No: ${values.accountNumber}
Account Name: ${values.accountName}
Bank Name: ${values.bankName}
`.trim();

      const registration = {
        sponsor: "mercy01",
        package: selectedPackageDetails.name,
        ...values,
        paymentInfo: BANK_DETAILS,
        dateISO: new Date().toISOString(),
        status: "sent_to_whatsapp",
      };
      sessionStorage.setItem("mudetRegistration", JSON.stringify(registration));

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${BANK_DETAILS.whatsappPhone}?text=${encodedMessage}`;
      window.open(whatsappUrl, "_blank");

      setSubmitted(true);
      toast.success("Opening WhatsApp with your registration details.");
    },
  });

  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied.`);
    } catch {
      toast.error("Copy failed. Please copy manually.");
    }
  };

  return (
    <section className="mt-10">
      <motion.div
        className="surface-card p-5 sm:p-7"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, ease: "easeOut", delay: 0.08 }}
      >
        {submitted ? (
          <div className="grid gap-5">
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white">
                <Check className="h-7 w-7" />
              </div>
              <p className="mt-5 section-kicker">Registration details sent</p>
              <h2 className="mt-3 font-display text-3xl font-bold text-neutral-dark">
                Thank you for registering.
              </h2>
              <p className="mt-3 text-sm leading-7 text-neutral-soft">
                Your details have been prepared for WhatsApp. Please send
                payment proof (receipt) on WhatsApp.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-xl lg:text-3xl font-extrabold text-neutral-dark">
                Complete Registration
              </h2>
              <p className="text-sm leading-7 text-neutral-soft">
                Choose a startup package to access exclusive herbal extracts,
                and store sponsor bonuses.
              </p>
            </div>
            <form className="grid gap-5" onSubmit={formik.handleSubmit}>
              <div>
                <label className="text-sm font-extrabold text-neutral-dark">
                  Choose package
                </label>
                <select
                  value={selectedPackage}
                  onChange={(event) => setSelectedPackage(event.target.value)}
                  className="field-control"
                >
                  {packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name} - NGN {pkg.price.toLocaleString()} - {pkg.pv}{" "}
                      PV
                    </option>
                  ))}
                </select>
              </div>

              <div className="rounded-2xl border border-primary/10 bg-secondary p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="section-kicker">Selected</p>
                    <h2 className="mt-2 text-2xl font-extrabold text-neutral-dark">
                      {selectedPackageDetails.name}
                    </h2>
                  </div>
                  <p className="rounded-2xl bg-white px-4 py-2 text-sm font-extrabold text-primary shadow-sm">
                    {selectedPackageDetails.pv} PV
                  </p>
                </div>
                <p className="mt-3 text-sm font-bold text-neutral-soft">
                  NGN {selectedPackageDetails.price.toLocaleString()} includes{" "}
                  {selectedPackageDetails.products}.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["fullName", "Full name", "Your full name"],
                  ["userName", "Username", "Your username"],
                  ["gender", "Gender", "Male / Female"],
                  ["dob", "Date of birth", ""],
                  ["email", "Email address", "name@example.com"],
                  ["phone", "Mobile number", "0816 055 0326"],
                  ["city", "City", "Your city"],
                  ["accountNumber", "Account number", "Bank account number"],
                  ["accountName", "Account name", "Account holder name"],
                  ["bankName", "Bank name", "Bank name"],
                ].map(([key, label, placeholder]) => (
                  <div key={key as string}>
                    <label className="text-sm font-extrabold text-neutral-dark">
                      {label}
                    </label>
                    <input
                      type={
                        key === "dob"
                          ? "date"
                          : key === "email"
                            ? "email"
                            : "text"
                      }
                      name={key as string}
                      value={formik.values[key as keyof typeof formik.values]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder={placeholder as string}
                      className="field-control"
                    />
                    {formik.touched[key as keyof typeof formik.touched] &&
                      formik.errors[key as keyof typeof formik.errors] && (
                        <p className="mt-1 text-xs text-red-500">
                          {
                            formik.errors[
                              key as keyof typeof formik.errors
                            ] as string
                          }
                        </p>
                      )}
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-col gap-5">
                <h3 className="text-sm font-extrabold text-neutral-dark">
                  Bank Payment Details
                </h3>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-accent/20 bg-white p-4 shadow-sm">
                    <p className="text-xs font-bold text-neutral-soft">
                      Account Number
                    </p>
                    <p className="mt-2 font-display text-lg font-bold text-neutral-dark">
                      {BANK_DETAILS.accountNumber}
                    </p>
                    <button
                      onClick={() =>
                        handleCopy(BANK_DETAILS.accountNumber, "Account number")
                      }
                      className="mt-3 flex items-center gap-2 text-xs font-semibold text-primary transition hover:text-primary/80"
                    >
                      <HiOutlineClipboardCopy className="h-4 w-4" />
                      Copy
                    </button>
                  </div>

                  <div className="rounded-2xl border border-accent/20 bg-white p-4 shadow-sm">
                    <p className="text-xs font-bold text-neutral-soft">
                      Account Name
                    </p>
                    <p className="mt-2 font-display text-lg font-bold text-neutral-dark">
                      {BANK_DETAILS.accountName}
                    </p>
                    <button
                      onClick={() =>
                        handleCopy(BANK_DETAILS.accountName, "Account name")
                      }
                      className="mt-3 flex items-center gap-2 text-xs font-semibold text-primary transition hover:text-primary/80"
                    >
                      <HiOutlineClipboardCopy className="h-4 w-4" />
                      Copy
                    </button>
                  </div>

                  <div className="rounded-2xl border border-accent/20 bg-white p-4 shadow-sm">
                    <p className="text-xs font-bold text-neutral-soft">Bank</p>
                    <p className="mt-2 font-display text-lg font-bold text-neutral-dark">
                      {BANK_DETAILS.bank}
                    </p>
                    <button
                      onClick={() => handleCopy(BANK_DETAILS.bank, "Bank name")}
                      className="mt-3 flex items-center gap-2 text-xs font-semibold text-primary transition hover:text-primary/80"
                    >
                      <HiOutlineClipboardCopy className="h-4 w-4" />
                      Copy
                    </button>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border-l-4 border-accent/50 bg-accent/5 p-4">
                  <p className="text-xs font-semibold text-accent flex items-center gap-3">
                    <CiWarning size={20} /> Send your payment proof to WhatsApp
                    and we'll verify your payment in minutes.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting}
                className="btn-primary w-full flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5" />
                Complete Registration{" "}
                <span className="hidden lg:flex">via WhatsApp</span>
              </button>
            </form>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default Affiliate;
