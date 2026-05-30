import React, { useMemo, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { toast } from "sonner";

const WHATSAPP_NUMBER = "2348140041861";

const Contact: React.FC = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const onChange =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const canSend = useMemo(
    () => !!(form.fullName.trim() && form.email.trim() && form.message.trim()),
    [form.fullName, form.email, form.message],
  );

  const buildWhatsAppLink = () => {
    const text =
      `Hello, my name is ${form.fullName || "—"}.\n\n` +
      `Email: ${form.email || "—"}\n` +
      `Subject: ${form.subject || "General enquiry"}\n\n` +
      `Message:\n${form.message || "—"}`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!canSend) {
      toast.error("Please fill your name, email, and message.");
      return;
    }

    window.open(buildWhatsAppLink(), "_blank");
  };

  return (
    <section className="py-2">
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-tetiary">
          Contact Us
        </h1>
        <p className="text-sm sm:text-base text-neutral-soft max-w-2xl">
          Fill the form below and continue the conversation on WhatsApp.
        </p>
      </div>

      <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 items-start">
        <div className="rounded-2xl border border-secondary-dark/70 bg-white p-4 sm:p-6 shadow-md shadow-black/5">
          <div className="flex items-start justify-between gap-3">
            <h2 className="font-display text-lg sm:text-xl font-extrabold text-tetiary">
              Send a Message
            </h2>

            <span className="shrink-0 inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
              WhatsApp
            </span>
          </div>

          <form
            onSubmit={onSubmit}
            className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div className="sm:col-span-2">
              <label className="text-[11px] font-bold tracking-widest uppercase text-neutral-soft">
                Full name
              </label>
              <input
                value={form.fullName}
                onChange={onChange("fullName")}
                placeholder="Enter your name"
                className="mt-2 w-full rounded-xl border border-secondary-dark/70 bg-white px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-[11px] font-bold tracking-widest uppercase text-neutral-soft">
                Email address
              </label>
              <input
                type="email"
                value={form.email}
                onChange={onChange("email")}
                placeholder="name@example.com"
                className="mt-2 w-full rounded-xl border border-secondary-dark/70 bg-white px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-[11px] font-bold tracking-widest uppercase text-neutral-soft">
                Subject
              </label>
              <input
                value={form.subject}
                onChange={onChange("subject")}
                placeholder="How can we help?"
                className="mt-2 w-full rounded-xl border border-secondary-dark/70 bg-white px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-[11px] font-bold tracking-widest uppercase text-neutral-soft">
                Message
              </label>
              <textarea
                rows={6}
                value={form.message}
                onChange={onChange("message")}
                placeholder="Your message here..."
                className="mt-2 w-full resize-none rounded-xl border border-secondary-dark/70 bg-white px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={!canSend}
                className={[
                  "mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold shadow-md shadow-black/10 transition",
                  canSend
                    ? "bg-primary text-white hover:brightness-110"
                    : "bg-primary/60 text-white/90 cursor-not-allowed",
                ].join(" ")}
              >
                Continue on WhatsApp
                <span className="text-lg">›</span>
              </button>

              <p className="mt-2 text-[11px] text-neutral-soft text-center">
                Tip: Fill the form first — your message will be pre-filled in
                WhatsApp.
              </p>
            </div>
          </form>
        </div>

        <div className="flex flex-col gap-4 sm:gap-6">
          <div className="rounded-2xl border border-secondary-dark/70 bg-white p-4 sm:p-6 shadow-md shadow-black/5">
            <h2 className="font-display text-lg sm:text-xl font-extrabold text-tetiary">
              Quick Contact
            </h2>
            <p className="mt-1 text-sm text-neutral-soft">
              Prefer a faster option? Use any of the links below.
            </p>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <a
                href="tel:+2348140041861"
                className="rounded-2xl border border-secondary-dark/70 bg-white p-4 shadow-md shadow-black/5 hover:-translate-y-0.5 transition"
              >
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <HiOutlinePhone className="text-xl" />
                </div>
                <p className="mt-3 text-sm font-bold text-tetiary">Call</p>
                <p className="mt-1 text-xs text-neutral-soft">Tap to call</p>
              </a>

              <a
                href="mailto:affluenceglobal01@gmail.com"
                className="rounded-2xl border border-secondary-dark/70 bg-white p-4 shadow-md shadow-black/5 hover:-translate-y-0.5 transition"
              >
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <HiOutlineMail className="text-xl" />
                </div>
                <p className="mt-3 text-sm font-bold text-tetiary">Email</p>
                <p className="mt-1 text-xs text-neutral-soft">Send an email</p>
              </a>

              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (!canSend) {
                    e.preventDefault();
                    toast.error("Fill the form first to prefill WhatsApp.");
                  }
                }}
                className="rounded-2xl border border-secondary-dark/70 bg-white p-4 shadow-md shadow-black/5 hover:-translate-y-0.5 transition"
              >
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <FaWhatsapp className="text-[#25D366] text-xl" />
                </div>
                <p className="mt-3 text-sm font-bold text-tetiary">WhatsApp</p>
                <p className="mt-1 text-xs text-neutral-soft">Chat instantly</p>
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-secondary-dark/70 bg-white p-4 sm:p-6 shadow-md shadow-black/5">
            <p className="text-sm font-bold text-tetiary">Response Time</p>
            <p className="mt-1 text-sm text-neutral-soft">
              We usually reply within a few minutes during business hours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
