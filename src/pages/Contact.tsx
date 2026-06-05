import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { toast } from "sonner";
import { useFormik } from "formik";
import { contactFormSchema } from "../lib/validationSchemas";

const WHATSAPP_NUMBER = "2348160550326";

const Contact: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: contactFormSchema,
    onSubmit: (values) => {
      const text =
        `Hello, my name is ${values.fullName}.\n\n` +
        `Email: ${values.email}\n` +
        `Subject: ${values.subject || "General enquiry"}\n\n` +
        `Message:\n${values.message}`;

      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
        "_blank",
      );
      toast.success("Opening WhatsApp with your message...");
      formik.resetForm();
    },
  });

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

        <form onSubmit={formik.handleSubmit} className="mt-7 grid gap-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-extrabold text-neutral-dark">
                Full name
              </label>
              <input
                name="fullName"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your name"
                className="field-control"
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <p className="mt-1 text-xs text-red-500">
                  {formik.errors.fullName}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm font-extrabold text-neutral-dark">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="name@example.com"
                className="field-control"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {formik.errors.email}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="text-sm font-extrabold text-neutral-dark">
              Subject
            </label>
            <input
              name="subject"
              value={formik.values.subject}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Order, payment, delivery, or registration"
              className="field-control"
            />
            {formik.touched.subject && formik.errors.subject && (
              <p className="mt-1 text-xs text-red-500">
                {formik.errors.subject}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-extrabold text-neutral-dark">
              Message
            </label>
            <textarea
              rows={7}
              name="message"
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Write your message here"
              className="field-control resize-none"
            />
            {formik.touched.message && formik.errors.message && (
              <p className="mt-1 text-xs text-red-500">
                {formik.errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting}
            className={[
              "btn-primary w-full gap-2",
              !formik.isValid || formik.isSubmitting
                ? "pointer-events-none opacity-60"
                : "",
            ].join(" ")}
          >
            <FaWhatsapp className="h-5 w-5" />
            {formik.isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
