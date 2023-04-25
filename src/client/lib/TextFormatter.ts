import { format } from "date-fns";

const FormatCurrency = (
  value: number | undefined | null,
  currency?: string,
  isShorcut?: boolean
) => {
  if (!value) return "0.00";
  if (value > 1000000 && isShorcut) {
    const formattedValue = value / 1000000;
    return `${new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency ?? "PHP",
      maximumFractionDigits: 2,
    }).format(formattedValue)}M`;
  }

  if (value > 1000 && isShorcut) {
    const formattedValue = value / 1000;
    return `${new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency ?? "PHP",
      maximumFractionDigits: 2,
    }).format(formattedValue)}K`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency ?? "PHP",
  }).format(value);
};

const formatDate = (date: Date) => {
  return format(date, "MMMM dd, yyyy hh:mm a");
};

export { FormatCurrency, formatDate };
