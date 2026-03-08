import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from './product-card';
import { createMockProduct } from '@org/shared-test-utils';

describe('ProductCard', () => {
  const mockProduct = createMockProduct();
  const mockOnClick = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render product information', () => {
    render(<ProductCard product={mockProduct} onProductClick={mockOnClick} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('(100)')).toBeInTheDocument();
  });

  it('should display product image', () => {
    render(<ProductCard product={mockProduct} onProductClick={mockOnClick} />);

    const image = screen.getByAltText('Test Product');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('should show rating stars', () => {
    render(<ProductCard product={mockProduct} onProductClick={mockOnClick} />);

    const stars = screen.getAllByText('★');
    expect(stars).toHaveLength(5);
    // 4.5 rating means 4 filled stars
    const filledStars = stars.filter((star) =>
      star.className.includes('text-amber-500')
    );
    expect(filledStars).toHaveLength(4);
  });

  it('should call onProductClick when card is clicked', () => {
    render(<ProductCard product={mockProduct} onProductClick={mockOnClick} />);

    const card = screen.getByRole('button', {
      name: /View details for Test Product/i,
    });
    fireEvent.click(card);

    expect(mockOnClick).toHaveBeenCalledWith(mockProduct);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should call onProductClick when Enter key is pressed', () => {
    render(<ProductCard product={mockProduct} onProductClick={mockOnClick} />);

    const card = screen.getByRole('button', {
      name: /View details for Test Product/i,
    });
    fireEvent.keyDown(card, { key: 'Enter' });

    expect(mockOnClick).toHaveBeenCalledWith(mockProduct);
  });

  it('should call onProductClick when Space key is pressed', () => {
    render(<ProductCard product={mockProduct} onProductClick={mockOnClick} />);

    const card = screen.getByRole('button', {
      name: /View details for Test Product/i,
    });
    fireEvent.keyDown(card, { key: ' ' });

    expect(mockOnClick).toHaveBeenCalledWith(mockProduct);
  });

  it('should show out of stock overlay when product is not in stock', () => {
    const outOfStockProduct = createMockProduct({ inStock: false });
    render(
      <ProductCard product={outOfStockProduct} onProductClick={mockOnClick} />
    );

    expect(screen.getByText('Out of Stock')).toBeInTheDocument();
    const card = screen.getByRole('button');
    expect(card.className).toContain('opacity-70');
  });

  it('should have proper accessibility attributes', () => {
    render(<ProductCard product={mockProduct} onProductClick={mockOnClick} />);

    const card = screen.getByRole('button');
    expect(card).toHaveAttribute('tabIndex', '0');
    expect(card).toHaveAttribute('role', 'button');
    expect(card).toHaveAttribute('aria-label', 'View details for Test Product');
  });
});
