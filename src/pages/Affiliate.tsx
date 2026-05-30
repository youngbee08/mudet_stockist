import React, { useMemo, useState } from "react";
import { toast } from "sonner";

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
    <div className="flex flex-col gap-12">
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-start">
        <div className="space-y-6">
          <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            Mudet Registration
          </span>
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-dark">
              Register as a Mudet stockist with Super Lady.
            </h1>
            <p className="max-w-2xl text-sm text-neutral-soft sm:text-base">
              Fill the registration form below, choose your package, and complete your account details for a smooth onboarding process.
            </p>
          </div>
          <div className="rounded-3xl border border-secondary-dark/70 bg-secondary p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-soft">
              Sponsor Username
            </p>
            <p className="mt-2 text-lg font-bold text-neutral-dark">mercy01</p>
            <p className="mt-4 text-sm text-neutral-soft">
              Your sponsor username is pre-filled for registration. Choose a package and complete the required personal and account details.
            </p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-secondary-dark/70 bg-white p-8 shadow-lg shadow-black/5">
          {submitted ? (
            <div className="space-y-5">
              <div className="rounded-3xl bg-primary/5 p-6 text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  Registration Complete
                </p>
                <h2 className="mt-4 text-2xl font-bold text-neutral-dark">
                  Thank you for registering.
                </h2>
                <p className="mt-3 text-sm text-neutral-soft">
                  Super Lady will review your package choice and contact you at the email or phone number you provided.
                </p>
              </div>

              <div className="rounded-3xl border border-secondary-dark/70 bg-secondary p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-soft">
                  Selected package
                </p>
                <p className="mt-2 text-lg font-bold text-neutral-dark">
                  {selectedPackageDetails.name}
                </p>
                <p className="mt-1 text-sm text-neutral-soft">
                  ₦{selectedPackageDetails.price.toLocaleString()} • {selectedPackageDetails.pv} PV • {selectedPackageDetails.products}
                </p>
              </div>

              <div className="rounded-3xl border border-secondary-dark/70 bg-secondary p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-soft">
                  Next step
                </p>
                <p className="mt-2 text-sm text-neutral-soft">
                  Keep an eye on your inbox and phone. For faster support, send your details to 0816 055 0326 or mudetrealsolution@gmail.com.
                </p>
              </div>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-3">
                <label className="text-sm font-semibold text-neutral-dark">Choose package</label>
                <select
                  value={selectedPackage}
                  onChange={(event) => setSelectedPackage(event.target.value)}
                  className="w-full rounded-3xl border border-secondary-dark/70 bg-secondary px-4 py-3 text-sm outline-none focus:border-primary"
                >
                  {packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name} — ₦{pkg.price.toLocaleString()} • {pkg.pv} PV
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-neutral-dark">Full Name</label>
                  <input
                    value={form.fullName}
                    onChange={handleChange("fullName")}
                    placeholder="Your full name"
                    className="mt-2 w-full rounded-3xl border border-secondary-dark/70 bg-secondary px-4 py-3 text-sm outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-neutral-dark">Gender</label>
                  <input
                    value={form.gender}
                    onChange={handleChange("gender")}
                    placeholder="Male / Female"
                    className="mt-2 w-full rounded-3xl border border-secondary-dark/70 bg-secondary px-4 py-3 text-sm outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-neutral-dark">Date of Birth</label>
                  <input
                    type="date"
                    value={form.dob}
                    onChange={handleChange("dob")}
                    className="mt-2 w-full rounded-3xl border border-secondary-dark/70 bg-secondary px-4 py-3 text-sm outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-neutral-dark">Active Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={handleChange("email")}
                    placeholder="name@example.com"
                    className="mt-2 w-full rounded-3xl border border-secondary-dark/70 bg-secondary px-4 py-3 text-sm outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-neutral-dark">Mobile No</label>
                  <input
                    value={form.phone}
                    onChange={handleChange("phone")}
                    placeholder="0816 055 0326"
                    className="mt-2 w-full rounded-3xl border border-secondary-dark/70 bg-secondary px-4 py-3 text-sm outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-neutral-dark">Pick up City</label>
                  <input
                    value={form.city}
                    onChange={handleChange("city")}
                    placeholder="Your city"
                    className="mt-2 w-full rounded-3xl border border-secondary-dark/70 bg-secondary px-4 py-3 text-sm outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-neutral-dark">Account No</label>
                  <input
                    value={form.accountNumber}
                    onChange={handleChange("accountNumber")}
                    placeholder="Bank account number"
                    className="mt-2 w-full rounded-3xl border border-secondary-dark/70 bg-secondary px-4 py-3 text-sm outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-neutral-dark">Account Name</label>
                  <input
                    value={form.accountName}
                    onChange={handleChange("accountName")}
                    placeholder="Account holder name"
                    className="mt-2 w-full rounded-3xl border border-secondary-dark/70 bg-secondary px-4 py-3 text-sm outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-neutral-dark">Bank Name</label>
                <input
                  value={form.bankName}
                  onChange={handleChange("bankName")}
                  placeholder="Bank name"
                  className="mt-2 w-full rounded-3xl border border-secondary-dark/70 bg-secondary px-4 py-3 text-sm outline-none focus:border-primary"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-3xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm hover:brightness-110 transition"
              >
                Complete Registration
              </button>
            </form>
          )}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-[2rem] border border-secondary-dark/70 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-neutral-dark">Upgrade Bonus</h2>
          <p className="mt-3 text-sm text-neutral-soft">
            This is the difference you pay to move from one package to another higher package. As a sponsor, you earn 30% bonus on every upgrade difference your downline pays.
          </p>
          <div className="mt-5 space-y-3">
            {upgradeBonuses.map((item) => (
              <div key={item.from} className="rounded-3xl border border-secondary-dark/70 bg-secondary p-4">
                <p className="text-sm font-semibold text-neutral-dark">{item.from} → {item.to}</p>
                <p className="mt-1 text-sm text-neutral-soft">Upgrade Fee: ₦{item.fee.toLocaleString()}</p>
                <p className="mt-1 text-sm font-bold text-primary">Sponsor Bonus: ₦{item.bonus.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-secondary-dark/70 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-neutral-dark">Referral Bonus (30%)</h2>
          <div className="mt-5 grid gap-3">
            {referralBonuses.map((item) => (
              <div key={item.label} className="rounded-3xl border border-secondary-dark/70 bg-secondary p-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-neutral-dark">{item.label} Package</p>
                <p className="text-sm font-bold text-primary">₦{item.amount.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-secondary-dark/70 bg-white p-8 shadow-lg shadow-black/5">
        <h2 className="text-2xl font-bold text-neutral-dark">14 Ways of Earning in Mudet</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Retail Profit (25%)",
            "Direct Referral Bonus (30%)",
            "Indirect Referral Bonus",
            "Upgrade Bonus",
            "Pairing (Matching) Bonus",
            "Unilevel Bonus",
            "Unilevel Pool Bonus",
            "Awards & Appreciation",
            "Winners Celebration Bonus",
            "Max Store Bonus",
            "Mini Store Bonus",
            "Max Store Appreciation Bonus",
            "Crown Jewel Appreciation Bonus",
            "Store Sponsor Bonus",
          ].map((item) => (
            <div key={item} className="rounded-3xl border border-secondary-dark/70 bg-secondary p-4 text-sm text-neutral-dark">
              {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Affiliate;
