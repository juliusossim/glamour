import { useGetProductsQuery } from '@org/shared-data';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ProductList } from './product-list';

vi.mock('@org/shared-data', () => ({
  useGetProductsQuery: vi.fn(),
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

  it('should render products from useGetProductsQuery', () => {
    (
      useGetProductsQuery as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      data: {
        data: [
          { id: '1', name: 'Product One' },
          { id: '2', name: 'Product Two' },
        ],
      },
    });

    render(<ProductList />);

    expect(screen.getByTestId('product-grid')).toBeInTheDocument();
    expect(screen.getByText('Product One')).toBeInTheDocument();
    expect(screen.getByText('Product Two')).toBeInTheDocument();
  });

  it('should render empty grid when query has no data', () => {
    (
      useGetProductsQuery as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      data: {
        data: [],
      },
    });

    render(<ProductList />);

    expect(screen.getByTestId('product-grid')).toBeInTheDocument();
  });

  it('should render empty grid when query result is undefined', () => {
    (
      useGetProductsQuery as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      data: undefined,
    });

    render(<ProductList />);

    expect(screen.getByTestId('product-grid')).toBeInTheDocument();
  });
});
