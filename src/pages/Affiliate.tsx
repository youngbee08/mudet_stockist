import React, { useMemo, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { BadgeCheck, Check, Crown, Sparkles, TrendingUp } from "lucide-react";

const packages = [
  { id: "lunch", name: "Lunch", price: 14000, pv: 10, products: "1 bottle" },
  { id: "ignite", name: "Ignite", price: 28000, pv: 30, products: "2 bottles" },
  { id: "momentum", name: "Momentum", price: 70000, pv: 80, products: "5 bottles" },
  { id: "power", name: "Power", price: 182000, pv: 200, products: "13 bottles" },
  { id: "scale", name: "Scale", price: 406000, pv: 500, products: "29 bottles" },
  { id: "turbo", name: "Turbo", price: 700000, pv: 700, products: "50 bottles" },
  { id: "legend", name: "Legend", price: 1050000, pv: 1000, products: "75 bottles" },
];

const upgradeBonuses = [
  { from: "Lunch", to: "Ignite", fee: 14000, bonus: 4200 },
  { from: "Ignite", to: "Momentum", fee: 42000, bonus: 12600 },
  { from: "Momentum", to: "Power", fee: 112000, bonus: 33600 },
  { from: "Power", to: "Scale", fee: 224000, bonus: 67200 },
  { from: "Scale", to: "Turbo", fee: 294000, bonus: 88200 },
  { from: "Turbo", to: "Legend", fee: 350000, bonus: 105000 },
];

const referralBonuses = [
  { label: "Lunch", amount: 1800 },
  { label: "Ignite", amount: 5400 },
  { label: "Momentum", amount: 14000 },
  { label: "Power", amount: 36000 },
  { label: "Scale", amount: 90000 },
  { label: "Turbo", amount: 126000 },
  { label: "Legend", amount: 180000 },
];

const earningWays = [
  "Retail Profit (25%)",
  "Direct Referral Bonus (30%)",
  "Indirect Referral Bonus",
  "Upgrade Bonus",
  "Pairing Bonus",
  "Unilevel Bonus",
  "Unilevel Pool Bonus",
  "Awards & Appreciation",
  "Winners Celebration Bonus",
  "Max Store Bonus",
  "Mini Store Bonus",
  "Max Store Appreciation Bonus",
  "Crown Jewel Appreciation Bonus",
  "Store Sponsor Bonus",
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
    <div className="flex flex-col gap-16">
      <section className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <motion.div
          className="rounded-[32px] bg-neutral-dark p-7 text-white shadow-2xl shadow-black/10 sm:p-10"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <p className="section-kicker text-accent-soft">Mudet Registration</p>
          <h1 className="mt-4 font-display text-5xl font-bold leading-tight sm:text-6xl">
            Register as a Mudet stockist.
          </h1>
          <p className="mt-5 text-base leading-8 text-white/74">
            Choose your package, save your details, and let Super Lady guide the
            next payment and onboarding step.
          </p>

          <div className="mt-8 rounded-[24px] border border-white/10 bg-white/8 p-5">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-accent-soft">
              Sponsor username
            </p>
            <p className="mt-2 font-display text-4xl font-bold">mercy01</p>
            <p className="mt-3 text-sm leading-7 text-white/66">
              This sponsor ID is ready for your registration request.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              ["7", "Packages"],
              ["30%", "Referral"],
              ["14", "Earning ways"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl bg-white/8 p-4">
                <p className="font-display text-3xl font-bold">{value}</p>
                <p className="mt-1 text-[11px] font-extrabold uppercase tracking-[0.14em] text-white/55">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

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
                  Super Lady will review your package choice and contact you
                  with the next steps.
                </p>
              </div>
              <div className="grid gap-3 rounded-[24px] border border-primary/10 bg-white p-5">
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

              <div className="rounded-[24px] border border-primary/10 bg-secondary p-5">
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
                      type={key === "dob" ? "date" : key === "email" ? "email" : "text"}
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

      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {packages.slice(0, 4).map((pkg) => (
          <button
            key={pkg.id}
            type="button"
            onClick={() => setSelectedPackage(pkg.id)}
            className={[
              "rounded-[26px] border p-5 text-left transition hover:-translate-y-1",
              selectedPackage === pkg.id
                ? "border-primary bg-primary text-white shadow-xl shadow-primary/20"
                : "border-secondary-dark/70 bg-white text-neutral-dark shadow-lg shadow-black/5",
            ].join(" ")}
          >
            <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] opacity-70">
              Package
            </p>
            <h3 className="mt-3 text-2xl font-extrabold">{pkg.name}</h3>
            <p className="mt-3 text-sm font-bold">NGN {pkg.price.toLocaleString()}</p>
            <p className="mt-1 text-sm opacity-75">
              {pkg.pv} PV / {pkg.products}
            </p>
          </button>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="surface-card p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-white">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="section-kicker">Upgrade bonus</p>
              <h2 className="text-2xl font-extrabold text-neutral-dark">
                Earn 30% on upgrade differences.
              </h2>
            </div>
          </div>
          <div className="mt-6 grid gap-3">
            {upgradeBonuses.map((item) => (
              <div key={item.from} className="grid gap-2 rounded-2xl bg-secondary p-4 sm:grid-cols-[1fr_auto] sm:items-center">
                <p className="text-sm font-extrabold text-neutral-dark">
                  {item.from} to {item.to}
                </p>
                <p className="text-sm font-extrabold text-primary">
                  Bonus NGN {item.bonus.toLocaleString()}
                </p>
                <p className="text-sm text-neutral-soft sm:col-span-2">
                  Upgrade fee: NGN {item.fee.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="surface-card p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white">
              <Crown className="h-5 w-5" />
            </div>
            <div>
              <p className="section-kicker">Referral bonus</p>
              <h2 className="text-2xl font-extrabold text-neutral-dark">
                30% direct package reward.
              </h2>
            </div>
          </div>
          <div className="mt-6 grid gap-3">
            {referralBonuses.map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-4 rounded-2xl border border-secondary-dark/70 bg-white p-4">
                <p className="text-sm font-extrabold text-neutral-dark">
                  {item.label}
                </p>
                <p className="text-sm font-extrabold text-primary">
                  NGN {item.amount.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[32px] bg-secondary p-7 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="section-kicker">Earning structure</p>
            <h2 className="mt-3 font-display text-4xl font-bold leading-tight text-neutral-dark">
              Fourteen ways to earn through Mudet.
            </h2>
            <p className="mt-4 text-sm leading-7 text-neutral-soft">
              The business plan includes retail, referral, upgrade, matching,
              pool, store, and appreciation bonuses.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {earningWays.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
                <BadgeCheck className="h-5 w-5 shrink-0 text-primary" />
                <p className="text-sm font-bold text-neutral-dark">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[32px] border border-primary/15 bg-white p-7 shadow-xl shadow-black/5 sm:p-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="section-kicker">Next step</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-neutral-dark">
              Choose a package and save your stockist request.
            </h2>
            <p className="mt-3 text-sm leading-7 text-neutral-soft">
              Super Lady will contact you with payment and onboarding guidance.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-accent-soft px-5 py-4 text-accent">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-extrabold">Sponsor: mercy01</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Affiliate;
