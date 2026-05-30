import React, { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { FaWhatsapp } from "react-icons/fa";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import type { PendingOrder } from "../lib/interfaces";
import CurrencyToggle from "../components/ui/CurrencyToggle";
import {
  formatPayAmountFromNaira,
  useCurrencyPreference,
} from "../utilities/formatterUtility";

const WHATSAPP_NUMBER = "2348140041861";

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
        hint: "Your payment has been confirmed. We’ll proceed with processing your order.",
      };
    }

    return {
      title: "Payment Pending",
      hint: "Your receipt has been uploaded successfully. We’re currently verifying your payment. This usually takes 5–15 minutes.",
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
      `Hello, I’m following up on my payment. Please verify my receipt.\n` +
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
    <section className="w-full">
      <div className="mx-auto w-full max-w-xl">
        <div className="rounded-2xl border border-secondary-dark/70 bg-white p-5 sm:p-6 shadow-md shadow-black/5">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-sm font-bold text-neutral-soft hover:text-tetiary transition"
            >
              <HiOutlineArrowLeft className="text-lg" />
              Back
            </button>

            <span className="text-[11px] font-bold tracking-widest uppercase text-neutral-soft">
              Status
            </span>
          </div>
          <div className="mt-5 flex flex-col items-center text-center">
            <div className="w-full flex justify-end">
              <CurrencyToggle currency={currency} onChange={setCurrency} />
            </div>
            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
              <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-extrabold">
                ✓
              </div>
            </div>

            <h1 className="mt-4 font-display text-2xl font-extrabold text-tetiary">
              {statusUI.title}
            </h1>

            <p className="mt-2 text-sm text-neutral-soft max-w-md">
              {statusUI.hint}
            </p>
          </div>
          <div className="mt-6 rounded-2xl border border-secondary-dark/70 bg-secondary/30 p-4">
            <p className="text-[11px] font-bold tracking-widest uppercase text-neutral-soft">
              Order Summary
            </p>

            <div className="mt-4 grid grid-cols-1 gap-3 text-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="text-neutral-soft">Order ID</span>
                <span className="font-bold text-tetiary">{order.orderId}</span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-neutral-soft">Product</span>
                <span className="font-bold text-tetiary">
                  {order.productName}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-neutral-soft">Amount</span>
                <span className="font-bold text-tetiary">
                  {formatPayAmountFromNaira(order.unitPrice * order.qty, currency)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-neutral-soft">Date</span>
                <span className="font-bold text-tetiary">{dateText}</span>
              </div>
            </div>
          </div>
          <div className="mt-5">
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

            <button
              type="button"
              onClick={handlePickReceipt}
              className="w-full rounded-xl border border-secondary-dark/70 bg-white px-5 py-3 text-sm font-bold text-tetiary hover:bg-secondary/30 transition"
            >
              {receiptFile || order.receiptFileName
                ? "Change Receipt"
                : "Upload Receipt"}
            </button>

            <p className="mt-2 text-[11px] text-neutral-soft text-center">
              You’ll select the receipt here, then attach it in WhatsApp.
            </p>
          </div>
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-md shadow-black/10 hover:brightness-110 transition"
          >
            <FaWhatsapp className="text-lg" />
            Share Receipt via WhatsApp
          </a>

          <div className="mt-6">
            <p className="text-[11px] font-bold tracking-widest uppercase text-neutral-soft text-center">
              Other options
            </p>

            <div className="mt-3">
              <button
                type="button"
                onClick={handleResetOrder}
                className="inline-flex items-center justify-center rounded-xl border border-secondary-dark/70 bg-white px-4 py-3 text-xs font-bold text-tetiary hover:bg-secondary/30 transition w-full"
              >
                Start New Order
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="mt-1 text-[11px] text-neutral-soft">
              Transaction Ref:{" "}
              <span className="font-semibold">{order.orderId}-CONF</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentStatus;
