import React, { useMemo, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {  Check} from "lucide-react";

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
      !!(
        form.fullName.trim() &&
        form.email.trim() &&
        form.phone.trim() &&
        form.city.trim() &&
        form.accountNumber.trim() &&
        form.accountName.trim() &&
        form.bankName.trim()
      ),
    [form],
  );

  const handleChange =
    (key: keyof typeof form) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((current) => ({ ...current, [key]: event.target.value }));
    };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isCompleted) {
      toast.error("Please fill all registration and account details.");
      return;
    }

    const registration = {
      sponsor: "mercy01",
      package: selectedPackageDetails.name,
      ...form,
    };
    sessionStorage.setItem("mudetRegistration", JSON.stringify(registration));
    setSubmitted(true);
    toast.success("Registration details saved. We will contact you soon.");
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
            <div className="rounded-[26px] bg-secondary p-7 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white">
                <Check className="h-7 w-7" />
              </div>
              <p className="mt-5 section-kicker">Registration saved</p>
              <h2 className="mt-3 font-display text-3xl font-bold text-neutral-dark">
                Thank you for registering.
              </h2>
              <p className="mt-3 text-sm leading-7 text-neutral-soft">
                Super Lady will review your package choice and contact you with
                the next steps.
              </p>
            </div>
            <div className="grid gap-3 rounded-3xl border border-primary/10 bg-white p-5">
              <p className="section-kicker">Selected package</p>
              <p className="text-2xl font-extrabold text-neutral-dark">
                {selectedPackageDetails.name}
              </p>
              <p className="text-sm font-bold text-primary">
                NGN {selectedPackageDetails.price.toLocaleString()} /{" "}
                {selectedPackageDetails.pv} PV /{" "}
                {selectedPackageDetails.products}
              </p>
            </div>
          </div>
        ) : (
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
                    {pkg.name} - NGN {pkg.price.toLocaleString()} - {pkg.pv} PV
                  </option>
                ))}
              </select>
            </div>

            <div className="rounded-3xl border border-primary/10 bg-secondary p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="section-kicker">Selected</p>
                  <h2 className="mt-2 text-2xl font-extrabold text-neutral-dark">
                    {selectedPackageDetails.name}
                  </h2>
                </div>
                <p className="rounded-full bg-white px-4 py-2 text-sm font-extrabold text-primary shadow-sm">
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
                ["gender", "Gender", "Male / Female"],
                ["dob", "Date of birth", ""],
                ["email", "Active email", "name@example.com"],
                ["phone", "Mobile number", "0816 055 0326"],
                ["city", "Pickup city", "Your city"],
                ["accountNumber", "Account number", "Bank account number"],
                ["accountName", "Account name", "Account holder name"],
              ].map(([key, label, placeholder]) => (
                <div key={key}>
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
                    placeholder={placeholder}
                    className="field-control"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="text-sm font-extrabold text-neutral-dark">
                Bank name
              </label>
              <input
                value={form.bankName}
                onChange={handleChange("bankName")}
                placeholder="Bank name"
                className="field-control"
              />
            </div>

            <button type="submit" className="btn-primary w-full">
              Complete Registration
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
};

export default Affiliate;
