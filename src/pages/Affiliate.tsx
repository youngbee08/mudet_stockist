import React, { useMemo, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Check, Send } from "lucide-react";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import { CiWarning } from "react-icons/ci";

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
  const [form, setForm] = useState({
    fullName: "",
    userName: "",
    gender: "",
    dob: "",
    email: "",
    phone: "",
    city: "",
    accountNumber: "",
    accountName: "",
    bankName: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const selectedPackageDetails = useMemo(
    () => packages.find((pkg) => pkg.id === selectedPackage) || packages[0],
    [selectedPackage],
  );

  const isCompleted = useMemo(
    () =>
      !!(form.fullName.trim() && form.userName,
      form.gender.trim() &&
        form.dob.trim() &&
        form.email.trim() &&
        form.phone.trim() &&
        form.city.trim() &&
        form.accountNumber.trim() &&
        form.accountName.trim() &&
        form.bankName.trim()),
    [form],
  );

  const handleChange =
    (key: keyof typeof form) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((current) => ({ ...current, [key]: event.target.value }));
    };

  const handleCopyAccountNumber = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied.`);
    } catch {
      toast.error("Copy failed. Please copy manually.");
    }
  };

  const formatWhatsAppMessage = () => {
    return `*📌 MUDET REGISTRATION 📌*

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
Username: ${form.userName}
Full Name: ${form.fullName}
Gender: ${form.gender}
Date Of Birth: ${form.dob}
Active E-mail: ${form.email}
Mobile No: ${form.phone}
Pick up City: ${form.city}

*═══════════════════════════════*
*ACCOUNT DETAILS*
*═══════════════════════════════*
Account No: ${form.accountNumber}
Account Name: ${form.accountName}
Bank Name: ${form.bankName}
`.trim();
  };

  const getMissingFields = (): string[] => {
    const missing: string[] = [];
    if (!form.fullName.trim()) missing.push("Full Name");
    if (!form.userName.trim()) missing.push("Username");
    if (!form.gender.trim()) missing.push("Gender");
    if (!form.dob.trim()) missing.push("Date of Birth");
    if (!form.email.trim()) missing.push("Email");
    if (!form.phone.trim()) missing.push("Mobile Number");
    if (!form.city.trim()) missing.push("City");
    if (!form.accountNumber.trim()) missing.push("Account Number");
    if (!form.accountName.trim()) missing.push("Account Name");
    if (!form.bankName.trim()) missing.push("Bank Name");
    return missing;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const missingFields = getMissingFields();
    if (missingFields.length > 0) {
      toast.error(`Missing: ${missingFields.join(", ")}`);
      return;
    }

    const registration = {
      sponsor: "mercy01",
      package: selectedPackageDetails.name,
      ...form,
      paymentInfo: BANK_DETAILS,
      dateISO: new Date().toISOString(),
      status: "sent_to_whatsapp",
    };
    sessionStorage.setItem("mudetRegistration", JSON.stringify(registration));

    const message = encodeURIComponent(formatWhatsAppMessage());
    const whatsappUrl = `https://wa.me/${BANK_DETAILS.whatsappPhone}?text=${message}`;
    window.open(whatsappUrl, "_blank");

    setSubmitted(true);
    toast.success("Opening WhatsApp with your registration details.");
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
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white">
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
            <form className="grid gap-5" onSubmit={handleSubmit}>
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

              <div className="rounded-3xl border border-primary/10 bg-secondary p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="mt-2 text-2xl font-extrabold text-neutral-dark">
                      {selectedPackageDetails.name}
                    </h2>
                  </div>
                </div>
                <p className="mt-3 text-sm font-bold text-neutral-soft">
                  NGN {selectedPackageDetails.price.toLocaleString()} includes{" "}
                  {selectedPackageDetails.products} &{" "}
                  {selectedPackageDetails.pv} point value(pv).
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
                      value={form[key as keyof typeof form]}
                      onChange={handleChange(key as keyof typeof form)}
                      placeholder={placeholder as string}
                      className="field-control"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-col gap-5">
                <h3 className="text-sm font-extrabold text-neutral-dark">
                  Bank Payment Details
                </h3>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl border border-accent/20 bg-white p-4 shadow-sm">
                    <p className="text-xs font-bold text-neutral-soft">
                      Account Number
                    </p>
                    <p className="mt-2 font-display text-lg font-bold text-neutral-dark">
                      {BANK_DETAILS.accountNumber}
                    </p>
                    <button
                      onClick={() =>
                        handleCopyAccountNumber(
                          BANK_DETAILS.accountNumber,
                          "Account number",
                        )
                      }
                      className="mt-3 flex items-center gap-2 text-xs font-semibold text-primary transition hover:text-primary/80"
                    >
                      <HiOutlineClipboardCopy className="h-4 w-4" />
                      Copy
                    </button>
                  </div>

                  <div className="rounded-xl border border-accent/20 bg-white p-4 shadow-sm">
                    <p className="text-xs font-bold text-neutral-soft">
                      Account Name
                    </p>
                    <p className="mt-2 font-display text-lg font-bold text-neutral-dark">
                      {BANK_DETAILS.accountName}
                    </p>
                    <button
                      onClick={() =>
                        handleCopyAccountNumber(
                          BANK_DETAILS.accountName,
                          "Account name",
                        )
                      }
                      className="mt-3 flex items-center gap-2 text-xs font-semibold text-primary transition hover:text-primary/80"
                    >
                      <HiOutlineClipboardCopy className="h-4 w-4" />
                      Copy
                    </button>
                  </div>

                  <div className="rounded-xl border border-accent/20 bg-white p-4 shadow-sm">
                    <p className="text-xs font-bold text-neutral-soft">Bank</p>
                    <p className="mt-2 font-display text-lg font-bold text-neutral-dark">
                      {BANK_DETAILS.bank}
                    </p>
                    <button
                      onClick={() =>
                        handleCopyAccountNumber(BANK_DETAILS.bank, "Bank name")
                      }
                      className="mt-3 flex items-center gap-2 text-xs font-semibold text-primary transition hover:text-primary/80"
                    >
                      <HiOutlineClipboardCopy className="h-4 w-4" />
                      Copy
                    </button>
                  </div>
                </div>

                <div className="mt-4 rounded-lg border-l-4 border-accent/50 bg-accent/5 p-4">
                  <p className="text-xs font-semibold text-accent flex items-center gap-3">
                    <CiWarning size={20} /> Send your payment proof to WhatsApp
                    and we'll verify your payment in minutes.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={!isCompleted}
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
