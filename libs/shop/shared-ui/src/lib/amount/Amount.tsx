import { AmountProps } from '@org/models';
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
}: AmountProps) {
  const formattedPrice = formatCurrency(price, currency, locale);
  const formattedOriginal = originalPrice
    ? formatCurrency(originalPrice, currency, locale)
    : null;

  // Calculate discount if original price provided but no discount
  const calculatedDiscount =
    discount ?? (originalPrice ? Math.round((1 - price / originalPrice) * 100) : null);

    const calculatedIncrement = increment ?? (originalPrice ? ((price - originalPrice)/ originalPrice) * 100 : null);

  return (
    <ItemContent className={`flex flex-row items-center gap-2 ${className}`}>
      <p className="text-sm font-medium text-foreground">{formattedPrice}</p>
      {formattedOriginal && (
        <p className="text-sm text-gray-500 line-through">{formattedOriginal}</p>
      )}
      {calculatedDiscount && calculatedDiscount > 0 && (
        <p className="text-sm text-red-500">-{calculatedDiscount}%</p>
      )}
      {calculatedIncrement && calculatedIncrement > 0 && (
        <p className="text-sm text-green-500"><span role="img" aria-label="increment">📈</span>+{calculatedIncrement.toFixed(2)}%</p>
      )}
    </ItemContent>
  );
}

export default Amount;