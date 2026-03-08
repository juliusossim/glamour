import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { ProductList } from './product-list';
import { useProducts } from '@org/shop-data';

vi.mock('@org/shop-data', () => ({
  useProducts: vi.fn(),
}));

vi.mock('@org/shared-ui', () => ({
  ProductGrid: ({ products }: { products: Array<{ name: string }> }) => (
    <div data-testid="product-grid">
      {products.map((p) => (
        <span key={p.name}>{p.name}</span>
      ))}
    </div>
  ),
}));

describe('ProductList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render products from useProducts', () => {
    (useProducts as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      products: [
        { id: '1', name: 'Product One' },
        { id: '2', name: 'Product Two' },
      ],
    });

    render(<ProductList />);

    expect(screen.getByTestId('product-grid')).toBeInTheDocument();
    expect(screen.getByText('Product One')).toBeInTheDocument();
    expect(screen.getByText('Product Two')).toBeInTheDocument();
  });

  it('should render empty grid when hook returns no products', () => {
    (useProducts as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      products: [],
    });

    render(<ProductList />);

    expect(screen.getByTestId('product-grid')).toBeInTheDocument();
  });
});
