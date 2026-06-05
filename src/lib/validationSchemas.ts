import * as yup from "yup";

export const contactFormSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name must not exceed 50 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email address"),
  subject: yup
    .string()
    .optional()
    .max(100, "Subject must not exceed 100 characters"),
  message: yup
    .string()
    .required("Message is required")
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must not exceed 1000 characters"),
});

export const purchaseFormSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name must not exceed 50 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email address"),
  phone: yup
    .string()
    .required("Mobile number is required")
    .matches(
      /^(\+234|0)[0-9]{10}$/,
      "Please enter a valid Nigerian phone number",
    ),
  address: yup
    .string()
    .required("Delivery address is required")
    .min(5, "Delivery address must be at least 5 characters")
    .max(200, "Delivery address must not exceed 200 characters"),
});

export const affiliateFormSchema = yup.object().shape({
  userName: yup
    .string()
    .required("Username is required")
    .min(2, "Username must be at least 2 characters")
    .max(30, "Username must not exceed 30 characters"),
  fullName: yup
    .string()
    .required("Full name is required")
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name must not exceed 50 characters"),
  gender: yup
    .string()
    .required("Gender is required")
    .oneOf(["Male", "Female"], "Please select a valid gender"),
  dob: yup
    .string()
    .required("Date of birth is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Please enter a valid date of birth"),
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email address"),
  phone: yup
    .string()
    .required("Mobile number is required")
    .matches(
      /^(\+234|0)[0-9]{10}$/,
      "Please enter a valid Nigerian phone number",
    ),
  city: yup
    .string()
    .required("City is required")
    .min(2, "City must be at least 2 characters")
    .max(50, "City must not exceed 50 characters"),
  accountNumber: yup
    .string()
    .required("Account number is required")
    .min(10, "Account number must be at least 10 digits")
    .max(20, "Account number must not exceed 20 digits"),
  accountName: yup
    .string()
    .required("Account name is required")
    .min(2, "Account name must be at least 2 characters")
    .max(100, "Account name must not exceed 100 characters"),
  bankName: yup
    .string()
    .required("Bank name is required")
    .min(2, "Bank name must be at least 2 characters")
    .max(50, "Bank name must not exceed 50 characters"),
});

export type ContactFormValues = yup.InferType<typeof contactFormSchema>;
export type PurchaseFormValues = yup.InferType<typeof purchaseFormSchema>;
export type AffiliateFormValues = yup.InferType<typeof affiliateFormSchema>;
