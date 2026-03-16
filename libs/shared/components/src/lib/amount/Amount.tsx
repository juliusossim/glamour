import type { AmountProps } from '@org/models';
import { ItemContent } from '../ui/item';
import { formatCurrency } from '../utils';

export function Amount({
  price,
  originalPrice,
  discount,
  increment,
  currency,
  locale,
  className = '',
}: Readonly<AmountProps>) {
  const formattedPrice = formatCurrency(price, currency, locale);

  const calculatedOriginalPrice = () => {
    if (originalPrice) return originalPrice;
    if (discount) return price / (1 - discount / 100);
    if (increment) return price / (1 + increment / 100);
    return 0;
  };
  const formattedOriginal = calculatedOriginalPrice()
    ? formatCurrency(calculatedOriginalPrice(), currency, locale)
    : null;
  // Calculate discount if original price provided but no discount
  const calculatedDiscount =
    discount ??
    (calculatedOriginalPrice()
      ? Math.round((1 - price / calculatedOriginalPrice()) * 100)
      : null);

  const calculatedIncrement =
    increment ??
    (calculatedOriginalPrice()
      ? ((price - calculatedOriginalPrice()) / calculatedOriginalPrice()) * 100
      : null);

  return (
    <ItemContent className={`flex flex-row items-center gap-2 ${className}`}>
      <p className="text-sm font-medium text-foreground">{formattedPrice}</p>
      {formattedOriginal && (
        <p className="text-sm text-gray-500 line-through">
          {formattedOriginal}
        </p>
      )}
      {calculatedDiscount && calculatedDiscount > 0 && (
        <p className="text-sm text-red-500">-{calculatedDiscount}%</p>
      )}
      {calculatedIncrement && calculatedIncrement > 0 && (
        <p className="text-sm text-green-500">
          <span role="img" aria-label="increment">
            📈
          </span>
          +{calculatedIncrement.toFixed(2)}%
        </p>
      )}
    </ItemContent>
  );
}

export default Amount;
