import type { Currency } from "../../utilities/formatterUtility";

interface CurrencyToggleProps {
  currency: Currency;
  onChange: (currency: Currency) => void;
}

const CurrencyToggle = ({ currency, onChange }: CurrencyToggleProps) => {
  return (
    <div className="inline-flex items-center rounded-2xl border border-secondary-dark/70 bg-white p-1">
      <button
        type="button"
        onClick={() => onChange("NGN")}
        className={[
          "rounded-2xl px-3 py-1.5 text-xs font-bold transition",
          currency === "NGN"
            ? "bg-primary text-white"
            : "text-neutral-soft hover:text-tetiary",
        ].join(" ")}
      >
        Naira
      </button>
      <button
        type="button"
        onClick={() => onChange("USD")}
        className={[
          "rounded-2xl px-3 py-1.5 text-xs font-bold transition",
          currency === "USD"
            ? "bg-primary text-white"
            : "text-neutral-soft hover:text-tetiary",
        ].join(" ")}
      >
        Dollar
      </button>
    </div>
  );
};

export default CurrencyToggle;
