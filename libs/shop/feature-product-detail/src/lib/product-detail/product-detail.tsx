import { useProduct } from '@org/shop-data';
import { Button, ErrorMessage, LoadingSpinner } from '@org/shop-shared-ui';
import { useNavigate, useParams } from 'react-router-dom';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { product, loading, error } = useProduct(id);

  const handleBackClick = () => {
    navigate('/products');
  };

  const handleAddToCart = () => {
    // Placeholder for add to cart functionality
    alert(`Added ${product?.name} to cart!`);
  };

  const handleRetry = () => {
    // Force re-fetch by navigating to the same URL
    window.location.reload();
  };

  const getStars = () => {
    if (!product) return [];
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(i < Math.floor(product.rating));
    }
    return stars;
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={handleRetry} />;
  }

  if (!product) {
    return <ErrorMessage message="Product not found" onRetry={handleRetry} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <button
        className="bg-transparent border-none text-primary text-base cursor-pointer py-2 mb-6 hover:text-primary/80 hover:underline transition-colors"
        onClick={handleBackClick}
      >
        ← Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-card rounded-lg p-8 shadow-md">
        <div className="relative w-full h-[400px] md:h-[500px] bg-muted rounded-lg overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/70 text-white flex items-center justify-center font-bold text-2xl">
              Out of Stock
            </div>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <div className="text-muted-foreground text-sm uppercase tracking-wider">
            {product.category}
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold text-foreground">
            {product.name}
          </h1>

          <div className="flex items-center gap-3">
            <span className="text-xl">
              {getStars().map((filled, index) => (
                <span
                  key={index}
                  className={filled ? 'text-amber-500' : 'text-gray-300'}
                >
                  ★
                </span>
              ))}
            </span>
            <span className="text-muted-foreground">
              ({product.reviewCount} reviews)
            </span>
          </div>

          <div className="text-3xl font-bold text-foreground">
            ${product.price.toFixed(2)}
          </div>

          <div className="text-base">
            {product.inStock ? (
              <span className="text-green-600 font-medium">✓ In Stock</span>
            ) : (
              <span className="text-destructive font-medium">Out of Stock</span>
            )}
          </div>

          <div className="border-t border-border pt-5">
            <h2 className="text-xl font-semibold mb-3 text-foreground">
              Description
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              {product.description}
            </p>
          </div>

          <div className="py-5">
            <Button
              className="w-full py-4 text-lg"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </div>

          <div className="border-t border-border pt-5">
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              Product Details
            </h3>
            <ul className="list-none p-0 m-0">
              <li className="py-2 text-muted-foreground border-b border-muted">
                <strong className="text-foreground mr-2">Product ID:</strong>
                {product.id}
              </li>
              <li className="py-2 text-muted-foreground border-b border-muted">
                <strong className="text-foreground mr-2">Category:</strong>
                {product.category}
              </li>
              <li className="py-2 text-muted-foreground border-b border-muted">
                <strong className="text-foreground mr-2">Rating:</strong>
                {product.rating.toFixed(1)} out of 5
              </li>
              <li className="py-2 text-muted-foreground">
                <strong className="text-foreground mr-2">Reviews:</strong>
                {product.reviewCount} customer reviews
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
