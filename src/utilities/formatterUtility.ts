import { useEffect, useState } from "react";

export type Currency = "NGN" | "USD";

const CURRENCY_STORAGE_KEY = "preferredCurrency";
const USD_RATE = 1132.31;

export const convertNairaToDollar = (
  naira: string | number,
  rate = USD_RATE,
) => {
  const amount = Number(naira);

  if (isNaN(amount)) return 0;

  return +(amount / rate).toFixed(2);
};

export const formatNaira = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

export const formatDollar = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(convertNairaToDollar(amount));

export const formatPriceByCurrency = (
  amount: number,
  currency: Currency,
) => {
  return currency === "USD" ? formatDollar(amount) : formatNaira(amount);
};

export const getPayAmountFromNaira = (nairaAmount: number, currency: Currency) => {
  if (currency === "NGN") {
    return getAltPrice(nairaAmount);
  }

  const grossUsd = convertNairaToDollar(nairaAmount);
  const roundedUsd = Math.round(grossUsd);
  const altUsd = getAltPrice(roundedUsd);

  // If this is a known tier (e.g. 975, 1950), use the tier override;
  // otherwise show the converted amount with cents.
  return altUsd !== roundedUsd ? altUsd : +grossUsd.toFixed(2);
};

export const formatPayAmountFromNaira = (
  nairaAmount: number,
  currency: Currency,
) => {
  if (currency === "USD") {
    const usd = getPayAmountFromNaira(nairaAmount, currency);
    const isWhole = Number.isInteger(usd);
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: isWhole ? 0 : 2,
      maximumFractionDigits: isWhole ? 0 : 2,
    }).format(usd);
  }

  const ngn = getPayAmountFromNaira(nairaAmount, currency);
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(ngn);
};

export const getStoredCurrency = (): Currency => {
  if (typeof window === "undefined") {
    return "NGN";
  }

  const savedCurrency = window.sessionStorage.getItem(CURRENCY_STORAGE_KEY);
  return savedCurrency === "USD" ? "USD" : "NGN";
};

export const useCurrencyPreference = () => {
  const [currency, setCurrency] = useState<Currency>(() => getStoredCurrency());

  useEffect(() => {
    window.sessionStorage.setItem(CURRENCY_STORAGE_KEY, currency);
  }, [currency]);

  return { currency, setCurrency };
};
export function getAltPrice(price: number): number {
  const priceMap: Record<number, number> = {
    220800: 200000,
    1104000: 840000,
    2208000: 1672000,
    975: 600,
    1950: 1200,
  };

  return priceMap[price] ?? price;
}
