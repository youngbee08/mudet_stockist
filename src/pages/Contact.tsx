import React, { useMemo, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
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
    <section className="mt-10 w-full lg:w-[70%] mx-auto">
      <div className="surface-card p-5 sm:p-7 lg:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="mt-2 text-xl lg:text-3xl font-extrabold text-neutral-dark">
              Continue on WhatsApp
            </h2>
            <p className="text-sm leading-7 text-neutral-soft">
              Feel free to reach out if you have any questions or feedback.
            </p>
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
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
