import React, { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { HiOutlineClipboardCopy } from "react-icons/hi";
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
    <section className="w-full">
      <div className="mx-auto w-full max-w-3xl">
        <div className="rounded-[2rem] border border-secondary-dark/70 bg-white p-6 shadow-lg shadow-black/5">
          <h1 className="text-2xl font-bold text-neutral-dark">Order {selectedProduct.name}</h1>
          <p className="mt-2 text-sm text-neutral-soft">
            Complete the order form below and we will reach out with payment instructions and delivery details.
          </p>

          <div className="mt-6 rounded-[2rem] border border-secondary-dark/70 bg-secondary p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-soft">
                  Product
                </p>
                <p className="mt-2 text-lg font-bold text-neutral-dark">{selectedProduct.name}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-soft">
                  Unit Price
                </p>
                <p className="mt-2 text-lg font-bold text-primary">
                  {formatPriceByCurrency(selectedProduct.price, currency)}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-neutral-dark">Quantity</label>
              <div className="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="h-11 w-11 rounded-3xl border border-secondary-dark/70 bg-secondary text-lg font-bold text-neutral-dark"
                >
                  −
                </button>
                <div className="min-w-[3rem] rounded-3xl border border-secondary-dark/70 bg-white px-4 py-3 text-center font-semibold text-neutral-dark">
                  {qty}
                </div>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  className="h-11 w-11 rounded-3xl border border-secondary-dark/70 bg-secondary text-lg font-bold text-neutral-dark"
                >
                  +
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-secondary-dark/70 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-soft">Total</p>
              <p className="mt-3 text-2xl font-bold text-primary">{formatPayAmountFromNaira(grossNairaAmount, currency)}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-neutral-dark">Full name</label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Jane Doe"
                  className="mt-2 w-full rounded-3xl border border-secondary-dark/70 bg-secondary px-4 py-3 text-sm outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-neutral-dark">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="mt-2 w-full rounded-3xl border border-secondary-dark/70 bg-secondary px-4 py-3 text-sm outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-neutral-dark">Mobile number</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0816 055 0326"
                  className="mt-2 w-full rounded-3xl border border-secondary-dark/70 bg-secondary px-4 py-3 text-sm outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-neutral-dark">Delivery address</label>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street, City, State"
                  className="mt-2 w-full rounded-3xl border border-secondary-dark/70 bg-secondary px-4 py-3 text-sm outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-secondary-dark/70 bg-secondary p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-soft">
              Contact for payment
            </p>
            <p className="mt-3 text-sm text-neutral-dark">
              For payment instructions, send your order details to Super Lady on WhatsApp: 0816 055 0326 or email mudetrealsolution@gmail.com.
            </p>
            <button
              type="button"
              onClick={handleCopyAccountNumber}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-semibold text-primary border border-secondary-dark/70 hover:bg-primary/5 transition"
            >
              <HiOutlineClipboardCopy /> Copy Contact Number
            </button>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              onClick={handleSubmit}
              className="w-full rounded-3xl bg-primary px-6 py-4 text-sm font-semibold text-white shadow-sm hover:brightness-110 transition sm:w-auto"
            >
              Save Order
            </button>
            <button
              type="button"
              onClick={handlePickReceipt}
              className="w-full rounded-3xl border border-secondary-dark/70 bg-white px-6 py-4 text-sm font-semibold text-neutral-dark hover:bg-secondary transition sm:w-auto"
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
      </div>
    </section>
  );
};

export default PurchasePage;
