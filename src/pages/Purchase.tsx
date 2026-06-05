import React, { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import { Minus, Plus, Send } from "lucide-react";
import productDetails from "../lib/productDetails";
import { CiWarning } from "react-icons/ci";
const makeOrderId = () => `ORD-${Math.floor(10000 + Math.random() * 90000)}`;

const BANK_DETAILS = {
  accountNumber: "2048297903",
  accountName: "KAROLINK INTER BIZ LIMITED",
  bank: "FirstBank",
  phone: "08160550326",
  whatsappPhone: "2348160550326",
};

const PurchasePage: React.FC = () => {
  const initialQty = useMemo(() => {
    const raw = sessionStorage.getItem("productCount");
    const n = raw ? Number(raw) : 1;
    return Number.isFinite(n) && n > 0 ? n : 1;
  }, []);

  const { products, defaultProduct } = productDetails;
  const [selectedProductId, setSelectedProductId] = useState<string>(
    sessionStorage.getItem("selectedProductId") || defaultProduct.id,
  );
  const selectedProduct =
    products.find((item) => item.id === selectedProductId) || defaultProduct;

  const [qty, setQty] = useState<number>(initialQty);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [orderId, setOrderId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const grossNairaAmount = useMemo(
    () => selectedProduct.price * qty,
    [selectedProduct.price, qty],
  );

  useEffect(() => {
    sessionStorage.setItem("productCount", String(qty));
  }, [qty]);

  useEffect(() => {
    setOrderId(makeOrderId());
    sessionStorage.setItem("selectedProductId", selectedProductId);
  }, [selectedProductId]);

  const handleCopyAccountNumber = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied.`);
    } catch {
      toast.error("Copy failed. Please copy manually.");
    }
  };

  const formatMessageForWhatsApp = () => {
    const orderData = {
      orderId: orderId || makeOrderId(),
      productName: selectedProduct.name,
      unitPrice: selectedProduct.price,
      qty,
      totalAmount: grossNairaAmount,
      fullName,
      email,
      phone,
      address,
    };

    const message = `
*MUDET ORDER CONFIRMATION*

*Order ID:* ${orderData.orderId}

*Customer Details:*
Name: ${orderData.fullName}
Email: ${orderData.email}
Phone: ${orderData.phone}
Delivery Address: ${orderData.address}

*Product Details:*
Product: ${orderData.productName}
Unit Price: ₦${orderData.unitPrice.toLocaleString()}
Quantity: ${orderData.qty}
*Total: ₦${orderData.totalAmount.toLocaleString()}*
    `.trim();

    return message;
  };

  const handleSubmit = () => {
    if (!fullName.trim() || !email.trim() || !phone.trim() || !address.trim()) {
      toast.error("Please fill all your contact and delivery details.");
      return;
    }

    const message = formatMessageForWhatsApp();
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${BANK_DETAILS.whatsappPhone}?text=${encodedMessage}`;

    setIsLoading(true);
    window.open(whatsappUrl, "_blank");

    const orderData = {
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
      status: "sent_to_whatsapp",
    };
    sessionStorage.setItem("pendingOrder", JSON.stringify(orderData));

    setIsLoading(false);
    toast.success("Opening WhatsApp with your order details...");
  };

  return (
    <section className="mt-10">
      <div className="surface-card p-5 sm:p-7 lg:p-8">
        <div>
          <h2 className="mt-2 font-display text-3xl font-bold text-neutral-dark">
            Place Your Order
          </h2>
          <p className="text-sm leading-7 text-neutral-soft">
            Select your product, provide your details, and send your order
            to WhatsApp for processing.
          </p>
        </div>

        <div className="mt-7 rounded-3xl border border-primary/10 bg-linear-to-br from-primary/5 to-secondary p-5">
          <label className="text-sm font-extrabold text-neutral-dark">
            Select Product
          </label>
          <select
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
            className="field-control mt-3"
          >
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} - ₦{product.price.toLocaleString()}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-7 rounded-3xl border border-primary/10 bg-secondary p-5">
          <label className="text-sm font-extrabold text-neutral-dark">
            Quantity
          </label>
          <div className="mt-3 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-neutral-dark shadow-sm transition hover:bg-primary/10 hover:text-primary"
              aria-label="Decrease quantity"
            >
              <Minus className="h-5 w-5" />
            </button>
            <div className="flex h-12 min-w-16 items-center justify-center rounded-2xl bg-white px-5 text-lg font-extrabold text-primary shadow-sm">
              {qty}
            </div>
            <button
              type="button"
              onClick={() => setQty((q) => q + 1)}
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-neutral-dark shadow-sm transition hover:bg-primary/10 hover:text-primary"
              aria-label="Increase quantity"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-3">
            <p className="text-xs text-neutral-soft">Total Amount</p>
            <p className="mt-1 text-2xl font-bold text-primary">
              ₦{grossNairaAmount.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="mt-7 grid gap-5">
          <h3 className="text-sm font-extrabold text-neutral-dark">
            Your Contact Details
          </h3>
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

        <div className="mt-7 flex flex-col gap-5">
          <h3 className="text-sm font-extrabold text-neutral-dark">
            Bank Payment Details
          </h3>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-accent/20 bg-white p-4 shadow-sm">
              <p className="text-xs font-bold text-neutral-soft">
                Account Number
              </p>
              <p className="mt-2 font-display text-lg font-bold text-neutral-dark">
                {BANK_DETAILS.accountNumber}
              </p>
              <button
                onClick={() =>
                  handleCopyAccountNumber(
                    BANK_DETAILS.accountNumber,
                    "Account number",
                  )
                }
                className="mt-3 flex items-center gap-2 text-xs font-semibold text-primary transition hover:text-primary/80"
              >
                <HiOutlineClipboardCopy className="h-4 w-4" />
                Copy
              </button>
            </div>

            <div className="rounded-xl border border-accent/20 bg-white p-4 shadow-sm">
              <p className="text-xs font-bold text-neutral-soft">
                Account Name
              </p>
              <p className="mt-2 font-display text-lg font-bold text-neutral-dark">
                {BANK_DETAILS.accountName}
              </p>
              <button
                onClick={() =>
                  handleCopyAccountNumber(
                    BANK_DETAILS.accountName,
                    "Account name",
                  )
                }
                className="mt-3 flex items-center gap-2 text-xs font-semibold text-primary transition hover:text-primary/80"
              >
                <HiOutlineClipboardCopy className="h-4 w-4" />
                Copy
              </button>
            </div>

            <div className="rounded-xl border border-accent/20 bg-white p-4 shadow-sm">
              <p className="text-xs font-bold text-neutral-soft">Bank</p>
              <p className="mt-2 font-display text-lg font-bold text-neutral-dark">
                {BANK_DETAILS.bank}
              </p>
              <button
                onClick={() =>
                  handleCopyAccountNumber(BANK_DETAILS.bank, "Bank name")
                }
                className="mt-3 flex items-center gap-2 text-xs font-semibold text-primary transition hover:text-primary/80"
              >
                <HiOutlineClipboardCopy className="h-4 w-4" />
                Copy
              </button>
            </div>
          </div>

          <div className="mt-4 rounded-lg border-l-4 border-accent/50 bg-accent/5 p-4">
            <p className="text-xs font-semibold text-accent flex items-center gap-3">
              <CiWarning size={20} /> Send your payment proof to WhatsApp and
              we'll process your order in minutes.
            </p>
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="btn-primary flex-1 gap-2"
          >
            <Send className="h-5 w-5" />
            {isLoading ? "Sending..." : "Send Order to WhatsApp"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default PurchasePage;
