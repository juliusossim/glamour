import { localeCurrencyMap } from "./constants";
import { defaultLocale } from "./locale";

export function formatCurrency(
  amount: number,
  currency?: string,
  locale?: string
): string {
  const userLocale = locale || defaultLocale;

  const detectedCurrency =
    currency || localeCurrencyMap[userLocale] || 'USD';

  try {
    return new Intl.NumberFormat(userLocale, {
      style: 'currency',
      currency: detectedCurrency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    // Fallback if currency code is invalid
    return new Intl.NumberFormat(userLocale, {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  }
}