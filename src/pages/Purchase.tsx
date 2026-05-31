import React, { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import productDetails from "../lib/productDetails";
import { useNavigate } from "react-router-dom";
import {
  formatPayAmountFromNaira,
  formatPriceByCurrency,
  useCurrencyPreference,
} from "../utilities/formatterUtility";

const makeOrderId = () => `ORD-${Math.floor(10000 + Math.random() * 90000)}`;

const PurchasePage: React.FC = () => {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const initialQty = useMemo(() => {
    const raw = sessionStorage.getItem("productCount");
    const n = raw ? Number(raw) : 1;
    return Number.isFinite(n) && n > 0 ? n : 1;
  }, []);

  const { products, defaultProduct } = productDetails;
  const selectedProductId = sessionStorage.getItem("selectedProductId");
  const selectedProduct =
    products.find((item) => item.id === selectedProductId) || defaultProduct;

  const [qty, setQty] = useState<number>(initialQty);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [orderId, setOrderId] = useState<string>("");
  const { currency } = useCurrencyPreference();

  const grossNairaAmount = useMemo(
    () => selectedProduct.price * qty,
    [selectedProduct.price, qty],
  );

  useEffect(() => {
    sessionStorage.setItem("productCount", String(qty));
  }, [qty]);

  useEffect(() => {
    setOrderId(makeOrderId());
    if (!selectedProductId) {
      sessionStorage.setItem("selectedProductId", selectedProduct.id);
    }
  }, [selectedProduct.id, selectedProductId]);

  const savePendingOrder = (receiptName?: string) => {
    const data = {
      orderId: orderId || makeOrderId(),
      productName: selectedProduct.name,
      unitPrice: selectedProduct.price,
      qty,
      amount: grossNairaAmount,
      fullName,
      email,
      phone,
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
      await navigator.clipboard.writeText("08160550326");
      toast.success("Phone number copied.");
    } catch {
      toast.error("Copy failed. Please copy manually.");
    }
  };

  const handleSubmit = () => {
    if (!fullName.trim() || !email.trim() || !phone.trim() || !address.trim()) {
      toast.error("Please fill all your contact and delivery details.");
      return;
    }

    savePendingOrder(receiptFile?.name);
    navigate("/payment-status");
    toast.success("Order saved. Complete payment and share your receipt.");
  };

  return (
    <section className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
      <aside className="rounded-[32px] bg-secondary p-5 shadow-xl shadow-primary/10 sm:p-7">
        <div className="rounded-[26px] bg-white p-5">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="mx-auto h-72 w-full object-contain"
          />
        </div>
        <div className="mt-6">
          <p className="section-kicker">Selected product</p>
          <h1 className="mt-2 font-display text-4xl font-bold leading-tight text-neutral-dark">
            {selectedProduct.name}
          </h1>
          <p className="mt-3 text-sm leading-7 text-neutral-soft">
            {selectedProduct.description}
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-white p-4">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-neutral-faint">
              Unit price
            </p>
            <p className="mt-2 text-xl font-extrabold text-primary">
              {formatPriceByCurrency(selectedProduct.price, currency)}
            </p>
          </div>
          <div className="rounded-2xl bg-neutral-dark p-4 text-white">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-accent-soft">
              Total
            </p>
            <p className="mt-2 text-xl font-extrabold">
              {formatPayAmountFromNaira(grossNairaAmount, currency)}
            </p>
          </div>
        </div>
      </aside>

      <div className="surface-card p-5 sm:p-7 lg:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="section-kicker">Purchase form</p>
            <h2 className="mt-2 font-display text-4xl font-bold text-neutral-dark">
              Complete your order.
            </h2>
            <p className="mt-3 text-sm leading-7 text-neutral-soft">
              Save your details, then share payment proof with Super Lady for
              confirmation.
            </p>
          </div>
          <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-white sm:flex">
            <ShoppingBag className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-7 rounded-[24px] border border-primary/10 bg-secondary p-5">
          <label className="text-sm font-extrabold text-neutral-dark">
            Quantity
          </label>
          <div className="mt-3 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-neutral-dark shadow-sm transition hover:text-primary"
              aria-label="Decrease quantity"
            >
              <Minus className="h-5 w-5" />
            </button>
            <div className="flex h-12 min-w-16 items-center justify-center rounded-2xl bg-white px-5 text-lg font-extrabold text-neutral-dark shadow-sm">
              {qty}
            </div>
            <button
              type="button"
              onClick={() => setQty((q) => q + 1)}
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-neutral-dark shadow-sm transition hover:text-primary"
              aria-label="Increase quantity"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-7 grid gap-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-extrabold text-neutral-dark">
                Full name
              </label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jane Doe"
                className="field-control"
              />
            </div>
            <div>
              <label className="text-sm font-extrabold text-neutral-dark">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="field-control"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-extrabold text-neutral-dark">
                Mobile number
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0816 055 0326"
                className="field-control"
              />
            </div>
            <div>
              <label className="text-sm font-extrabold text-neutral-dark">
                Delivery address
              </label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Street, City, State"
                className="field-control"
              />
            </div>
          </div>
        </div>

        <div className="mt-7 rounded-[24px] border border-accent/20 bg-accent-soft p-5">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-accent">
            Contact for payment
          </p>
          <p className="mt-3 text-sm leading-7 text-neutral-dark">
            Send order details to Super Lady on WhatsApp: 0816 055 0326 or email
            mudetrealsolution@gmail.com.
          </p>
          <button
            type="button"
            onClick={handleCopyAccountNumber}
            className="btn-secondary mt-4 gap-2 bg-white"
          >
            <HiOutlineClipboardCopy className="text-lg" />
            Copy Contact Number
          </button>
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <button onClick={handleSubmit} className="btn-primary flex-1">
            Save Order
          </button>
          <button
            type="button"
            onClick={handlePickReceipt}
            className="btn-secondary flex-1"
          >
            {receiptFile ? "Change Receipt" : "Upload Receipt"}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*,application/pdf"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setReceiptFile(file);
              if (file) {
                toast.success(`Receipt selected: ${file.name}`);
              }
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default PurchasePage;
