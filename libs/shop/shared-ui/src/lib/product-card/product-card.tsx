import { Product } from '@org/models';
import { cn } from '../utils';

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
}

export function ProductCard({ product, onProductClick }: ProductCardProps) {
  const getStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(i < Math.floor(product.rating));
    }
    return stars;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onProductClick(product);
    }
  };

  return (
    <div
      className={cn(
        'border border-border rounded-lg overflow-hidden cursor-pointer transition-all duration-300 bg-card h-full flex flex-col',
        'hover:-translate-y-1 hover:shadow-lg',
        'focus:outline-2 focus:outline-primary focus:outline-offset-2',
        !product.inStock && 'opacity-70'
      )}
      onClick={() => onProductClick(product)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${product.name}`}
    >
      <div className="relative w-full h-48 overflow-hidden bg-muted group">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/70 text-white flex items-center justify-center font-bold text-lg">
            Out of Stock
          </div>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">{product.category}</p>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">
            {getStars().map((filled, index) => (
              <span
                key={index}
                className={filled ? 'text-amber-500' : 'text-gray-300'}
              >
                ★
              </span>
            ))}
          </span>
          <span className="text-sm text-muted-foreground">
            ({product.reviewCount})
          </span>
        </div>
        <div className="text-xl font-bold text-foreground mt-auto">
          ${product.price.toFixed(2)}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;