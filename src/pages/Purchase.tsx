import React, { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import product from "../lib/productDetails";
import type { PendingOrder } from "../lib/interfaces";
import { useNavigate } from "react-router-dom";
import CurrencyToggle from "../components/ui/CurrencyToggle";
import {
  formatPayAmountFromNaira,
  formatPriceByCurrency,
  getAltPrice,
  useCurrencyPreference,
} from "../utilities/formatterUtility";

const WHATSAPP_NUMBER = "2348140041861";

const makeOrderId = () => `ORD-${Math.floor(10000 + Math.random() * 90000)}`;

const PurchasePage: React.FC = () => {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const initialQty = useMemo(() => {
    const raw = sessionStorage.getItem("productCount");
    const n = raw ? Number(raw) : 1;
    return Number.isFinite(n) && n > 0 ? n : 1;
  }, []);

  const productName = product.name;
  const unitPrice = product.price;
  const [qty, setQty] = useState<number>(initialQty);
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [orderId, setOrderId] = useState<string>("");
  const { currency, setCurrency } = useCurrencyPreference();

  const grossNairaAmount = useMemo(() => unitPrice * qty, [unitPrice, qty]);
  const nairaAmountToPay = useMemo(
    () => getAltPrice(grossNairaAmount),
    [grossNairaAmount],
  );

  const BANK_DETAILS =
    currency === "NGN"
      ? {
          bankName: "UBA",
          accountName: "AFFLUENCE GLOBAL NUTRITION AND WELLNESS LTD",
          accountNumber: "1026783434",
          branch: "POWA PLAZA, ABUJA",
        }
      : {
          bankName: "ZELLE",
          accountName: "AFFLUENCE GLOBAL USA",
          accountNumber: "affluenceglobalusa@gmail.com",
          branch: "114 Kirk Rd Wilmington Delaware 19807",
        };

  useEffect(() => {
    sessionStorage.setItem("productCount", String(qty));
  }, [qty]);

  useEffect(() => {
    const existing = sessionStorage.getItem("pendingOrder");
    if (existing) {
      try {
        const parsed: PendingOrder = JSON.parse(existing);
        setOrderId(parsed.orderId);
        setQty(parsed.qty || initialQty);
        setFullName(parsed.fullName || "");
        setAddress(parsed.address || "");
      } catch {
        setOrderId(makeOrderId());
      }
    } else {
      setOrderId(makeOrderId());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const buildWhatsAppLink = (data: PendingOrder) => {
    const dt = new Date(data.dateISO);
    const dateText = dt.toLocaleString();

    const text =
      `Payment Receipt Submission\n\n` +
      `Order ID: ${data.orderId}\n` +
      `Product: ${data.productName}\n` +
      `Quantity: ${data.qty}\n` +
      `Amount: ${formatPayAmountFromNaira(data.unitPrice * data.qty, currency)}\n` +
      `Name: ${data.fullName}\n` +
      `Address: ${data.address}\n` +
      `Date: ${dateText}\n\n` +
      `Receipt: ${data.receiptFileName || "Attached"}\n\n` +
      `Hello, I’ve made payment. Please verify my receipt.\n` +
      `Note: I will attach the receipt image/PDF in this chat.`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  const savePendingOrder = (receiptName?: string) => {
    const data: PendingOrder = {
      orderId: orderId || makeOrderId(),
      productName,
      unitPrice,
      qty,
      amount: nairaAmountToPay,
      fullName,
      address,
      dateISO: new Date().toISOString(),
      status: "pending",
      receiptFileName: receiptName,
    };

    sessionStorage.setItem("pendingOrder", JSON.stringify(data));
    return data;
  };

  const handlePickReceipt = () => {
    fileRef.current?.click();
  };

  const handleCopyAccountNumber = async () => {
    try {
      await navigator.clipboard.writeText(BANK_DETAILS.accountNumber);
      toast.success("Account number copied");
    } catch {
      toast.error("Copy failed. Please copy manually.");
    }
  };

  const handleSubmit = () => {
    if (!fullName.trim() || !address.trim()) {
      toast.error("Please fill your full name and delivery address.");
      return;
    }

    const data = savePendingOrder(receiptFile?.name);
    navigate("/payment-status");
    window.open(buildWhatsAppLink(data), "_blank");
    toast.success("Order saved. Please send your receipt on WhatsApp.");
  };

  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-xl">
        <div className="rounded-2xl border border-secondary-dark/70 bg-white p-5 sm:p-6 shadow-md shadow-black/5">
          <h1 className="font-display text-xl sm:text-2xl font-extrabold text-tetiary text-center">
            Order & Payment
          </h1>

          <div className="mt-5 rounded-2xl border border-secondary-dark/70 bg-secondary/30 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-tetiary">{productName}</p>
                <p className="mt-1 text-xs text-neutral-soft">
                  Unit Price:{" "}
                  <span className="font-semibold">
                    {formatPriceByCurrency(unitPrice, currency)}
                  </span>
                </p>
              </div>
              <CurrencyToggle currency={currency} onChange={setCurrency} />
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-sm font-bold tracking-widest uppercase text-neutral-soft">
              Shipping Information
            </h2>

            <div className="mt-4 grid grid-cols-1 gap-4">
              <div>
                <label className="text-[11px] font-bold tracking-widest uppercase text-neutral-soft">
                  Full name
                </label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Jane Doe"
                  className="mt-2 w-full rounded-xl border border-secondary-dark/70 bg-white px-4 py-3 text-sm outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold tracking-widest uppercase text-neutral-soft">
                  Delivery address
                </label>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street, City, State"
                  className="mt-2 w-full rounded-xl border border-secondary-dark/70 bg-white px-4 py-3 text-sm outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-secondary-dark/70 bg-white p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-tetiary">Quantity</p>
                <p className="text-xs text-neutral-soft">
                  Adjust based on what you want to order
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="h-10 w-10 rounded-xl border border-secondary-dark/70 hover:bg-secondary/30 transition font-bold"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <div className="w-10 text-center font-bold text-tetiary">
                  {qty}
                </div>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="h-10 w-10 rounded-xl border border-secondary-dark/70 hover:bg-secondary/30 transition font-bold"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-primary/40 bg-primary/5 p-3 sm:p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
              <p className="text-sm sm:text-base font-bold text-tetiary">
                Bank Transfer Details
              </p>
            </div>

            <div className="mt-4 rounded-xl border border-primary/40 bg-white p-3 sm:p-4 md:p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <p className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-neutral-soft">
                    Bank name
                  </p>
                  <p className="mt-1 text-sm sm:text-base font-bold text-tetiary break-words">
                    {BANK_DETAILS.bankName}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-neutral-soft">
                    Branch
                  </p>
                  <p className="mt-1 text-sm sm:text-base font-bold text-tetiary uppercase break-words">
                    {BANK_DETAILS.branch}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-neutral-soft">
                  Account name
                </p>
                <p className="mt-1 text-sm sm:text-base font-bold text-tetiary break-words">
                  {BANK_DETAILS.accountName}
                </p>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-secondary-dark/70 bg-secondary/20 p-3 sm:p-4">
                <div>
                  <p className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-neutral-soft">
                    {currency === "USD" ? "Zelle Email" : "Account Number"}
                  </p>
                  <p className="mt-1 text-base sm:text-lg font-extrabold text-tetiary tracking-wide break-all">
                    {BANK_DETAILS.accountNumber}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCopyAccountNumber}
                  className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 rounded-xl border border-secondary-dark/70 bg-white px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold text-tetiary hover:bg-secondary/30 transition"
                >
                  <HiOutlineClipboardCopy className="hidden sm:flex text-base sm:text-lg" />
                  Copy
                </button>
              </div>

              <p className="mt-4 text-[11px] sm:text-xs text-neutral-soft">
                Please include your name in the transfer description.
              </p>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm font-bold text-neutral-soft">
              Total Amount to Pay
            </p>
            <p className="font-display text-xl font-extrabold text-primary">
              {formatPayAmountFromNaira(grossNairaAmount, currency)}
            </p>
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
                if (file) toast.success(`Receipt selected: ${file.name}`);
              }}
            />
            <button
              type="button"
              onClick={handlePickReceipt}
              className="w-full rounded-xl border border-secondary-dark/70 bg-white px-5 py-3 text-sm font-bold text-tetiary hover:bg-secondary/30 transition"
            >
              {receiptFile ? "Change Receipt" : "Upload Receipt"}
            </button>
            <p className="mt-2 text-xs text-neutral-soft">
              You’ll upload/select the receipt here, then you’ll attach it in
              WhatsApp.
            </p>
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="mt-5 w-full rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-md shadow-black/10 hover:brightness-110 transition"
          >
            Submit & Continue on WhatsApp
          </button>
          <p className="mt-3 text-[11px] text-neutral-soft text-center">
            After sending your receipt, your order status will remain{" "}
            <b>Pending</b> until verification is completed.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PurchasePage;
