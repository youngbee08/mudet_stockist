import React, { useMemo, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { toast } from "sonner";

const WHATSAPP_NUMBER = "2348160550326";

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
      `Hello, my name is ${form.fullName || "-"}.\n\n` +
      `Email: ${form.email || "-"}\n` +
      `Subject: ${form.subject || "General enquiry"}\n\n` +
      `Message:\n${form.message || "-"}`;

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
    <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      <div className="rounded-[32px] bg-neutral-dark p-7 text-white shadow-2xl shadow-black/10 sm:p-10">
        <p className="section-kicker text-accent-soft">Contact Super Lady</p>
        <h1 className="mt-4 font-display text-5xl font-bold leading-tight sm:text-6xl">
          Ask before you order or register.
        </h1>
        <p className="mt-5 text-base leading-8 text-white/72">
          Send your product, payment, delivery, or stockist registration
          question. Your message opens in WhatsApp with the details already
          prepared.
        </p>

        <div className="mt-8 grid gap-4">
          {[
            {
              icon: <Phone className="h-5 w-5" />,
              label: "Call",
              value: "0816 055 0326",
              href: "tel:+2348160550326",
            },
            {
              icon: <Mail className="h-5 w-5" />,
              label: "Email",
              value: "mudetrealsolution@gmail.com",
              href: "mailto:mudetrealsolution@gmail.com",
            },
            {
              icon: <FaWhatsapp className="h-5 w-5" />,
              label: "WhatsApp",
              value: "Chat with Super Lady",
              href: buildWhatsAppLink(),
            },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.label === "WhatsApp" ? "_blank" : undefined}
              rel={item.label === "WhatsApp" ? "noopener noreferrer" : undefined}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/8 p-4 transition hover:bg-white/12"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-primary">
                {item.icon}
              </span>
              <span>
                <span className="block text-[11px] font-extrabold uppercase tracking-[0.16em] text-accent-soft">
                  {item.label}
                </span>
                <span className="mt-1 block text-sm font-bold text-white/82">
                  {item.value}
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="surface-card p-5 sm:p-7 lg:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="section-kicker">Message form</p>
            <h2 className="mt-2 text-2xl font-extrabold text-neutral-dark">
              Continue on WhatsApp
            </h2>
          </div>
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-white">
            <MessageCircle className="h-5 w-5" />
          </div>
        </div>

        <form onSubmit={onSubmit} className="mt-7 grid gap-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-extrabold text-neutral-dark">
                Full name
              </label>
              <input
                value={form.fullName}
                onChange={onChange("fullName")}
                placeholder="Enter your name"
                className="field-control"
              />
            </div>
            <div>
              <label className="text-sm font-extrabold text-neutral-dark">
                Email address
              </label>
              <input
                type="email"
                value={form.email}
                onChange={onChange("email")}
                placeholder="name@example.com"
                className="field-control"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-extrabold text-neutral-dark">
              Subject
            </label>
            <input
              value={form.subject}
              onChange={onChange("subject")}
              placeholder="Order, payment, delivery, or registration"
              className="field-control"
            />
          </div>

          <div>
            <label className="text-sm font-extrabold text-neutral-dark">
              Message
            </label>
            <textarea
              rows={7}
              value={form.message}
              onChange={onChange("message")}
              placeholder="Write your message here"
              className="field-control resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={!canSend}
            className={[
              "btn-primary w-full gap-2",
              !canSend ? "pointer-events-none opacity-60" : "",
            ].join(" ")}
          >
            <FaWhatsapp className="h-5 w-5" />
            Open WhatsApp Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
