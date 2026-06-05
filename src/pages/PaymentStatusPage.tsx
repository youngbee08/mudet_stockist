import React, { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { FaWhatsapp } from "react-icons/fa";
import { ArrowLeft, Check, FileUp, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { PendingOrder } from "../lib/interfaces";
import CurrencyToggle from "../components/ui/CurrencyToggle";
import {
  formatPayAmountFromNaira,
  useCurrencyPreference,
} from "../utilities/formatterUtility";

const WHATSAPP_NUMBER = "2348160550326";

const PaymentStatus: React.FC = () => {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [order, setOrder] = useState<PendingOrder | null>(() => {
    const raw = sessionStorage.getItem("pendingOrder");
    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw) as PendingOrder;
    } catch {
      sessionStorage.removeItem("pendingOrder");
      return null;
    }
  });
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const { currency, setCurrency } = useCurrencyPreference();

  useEffect(() => {
    if (!order) {
      navigate("/purchase-product");
    }
  }, [navigate, order]);

  const statusUI = useMemo(() => {
    if (!order) return { title: "Loading...", hint: "" };

    if (order.status === "verified") {
      return {
        title: "Payment Verified",
        hint: "Your payment has been confirmed. We will proceed with processing your order.",
      };
    }

    return {
      title: "Payment Pending",
      hint: "Your order has been saved. Upload or select your receipt, then share it with Mercy on WhatsApp for verification.",
    };
  }, [order]);

  const buildWhatsAppLink = () => {
    if (!order) return "#";

    const dt = new Date(order.dateISO);
    const dateText = dt.toLocaleString();

    const text =
      `Payment Receipt Submission\n\n` +
      `Order ID: ${order.orderId}\n` +
      `Product: ${order.productName}\n` +
      `Quantity: ${order.qty}\n` +
      `Amount: ${formatPayAmountFromNaira(order.unitPrice * order.qty, currency)}\n` +
      `Name: ${order.fullName}\n` +
      `Address: ${order.address}\n` +
      `Date: ${dateText}\n\n` +
      `Receipt: ${receiptFile?.name || order.receiptFileName || "Attached"}\n\n` +
      `Hello, I am following up on my payment. Please verify my receipt.\n` +
      `Note: I will attach the receipt image/PDF in this chat.`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  const handlePickReceipt = () => {
    fileRef.current?.click();
  };

  const handleSaveReceiptName = (fileName: string) => {
    if (!order) return;

    const updated: PendingOrder = {
      ...order,
      receiptFileName: fileName,
      status: "pending",
    };

    sessionStorage.setItem("pendingOrder", JSON.stringify(updated));
    setOrder(updated);
  };

  const handleResetOrder = () => {
    sessionStorage.removeItem("pendingOrder");
    toast.success("Order cleared.");
    navigate("/purchase-product");
  };

  if (!order) return null;

  const dt = new Date(order.dateISO);
  const dateText = dt.toLocaleString();

  return (
    <section className="mx-auto w-full max-w-3xl">
      <div className="surface-card overflow-hidden">
        <div className="bg-neutral-dark p-6 text-white sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-sm font-extrabold text-white/70 transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <CurrencyToggle currency={currency} onChange={setCurrency} />
          </div>

          <div className="mt-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white">
                <Check className="h-6 w-6" />
              </div>
            </div>
            <p className="mt-5 section-kicker text-accent-soft">Order status</p>
            <h1 className="mt-2 font-display text-4xl font-bold">
              {statusUI.title}
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-white/70">
              {statusUI.hint}
            </p>
          </div>
        </div>

        <div className="p-5 sm:p-8">
          <div className="rounded-[24px] bg-secondary p-5">
            <p className="section-kicker">Order summary</p>
            <div className="mt-5 grid gap-3 text-sm">
              {[
                ["Order ID", order.orderId],
                ["Product", order.productName],
                [
                  "Amount",
                  formatPayAmountFromNaira(
                    order.unitPrice * order.qty,
                    currency,
                  ),
                ],
                ["Date", dateText],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-4 rounded-2xl bg-white px-4 py-3"
                >
                  <span className="text-neutral-soft">{label}</span>
                  <span className="text-right font-extrabold text-neutral-dark">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <input
            ref={fileRef}
            type="file"
            accept="image/*,application/pdf"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setReceiptFile(file);
              if (file) {
                handleSaveReceiptName(file.name);
                toast.success(`Receipt selected: ${file.name}`);
              }
            }}
          />

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={handlePickReceipt}
              className="btn-secondary gap-2"
            >
              <FileUp className="h-4 w-4" />
              {receiptFile || order.receiptFileName
                ? "Change Receipt"
                : "Upload Receipt"}
            </button>

            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary gap-2"
            >
              <FaWhatsapp className="h-5 w-5" />
              Share Receipt
            </a>
          </div>

          <button
            type="button"
            onClick={handleResetOrder}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-secondary-dark/70 bg-white px-5 py-3 text-sm font-extrabold text-neutral-dark transition hover:bg-secondary"
          >
            <RotateCcw className="h-4 w-4" />
            Start New Order
          </button>

          <p className="mt-6 text-center text-xs font-bold text-neutral-faint">
            Transaction Ref: {order.orderId}-CONF
          </p>
        </div>
      </div>
    </section>
  );
};

export default PaymentStatus;
