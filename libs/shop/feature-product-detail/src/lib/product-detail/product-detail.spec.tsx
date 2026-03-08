import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { ProductDetail } from './product-detail';
import { useProduct } from './useProduct';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: '1' }),
    useNavigate: () => mockNavigate,
  };
});

vi.mock('./useProduct', () => ({
  useProduct: vi.fn(),
}));

vi.mock('@org/shared-ui', () => ({
  Button: ({ children, ...props }: React.ComponentProps<'button'>) => (
    <button {...props}>{children}</button>
  ),
  ErrorMessage: ({ message }: { message: string }) => <div>{message}</div>,
  LoadingSpinner: () => <div>Loading...</div>,
}));

const mockProduct = {
  id: '1',
  name: 'Wireless Bluetooth Headphones',
  description:
    'Premium wireless headphones with active noise cancellation and 30-hour battery life.',
  price: { min: 89.99, best: 99.99 },
  category: 'Electronics',
  imageUrls: ['https://via.placeholder.com/600x400'],
  inStock: true,
  rating: 4.5,
  reviewCount: 120,
};

describe('ProductDetail', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render loading state', () => {
    (useProduct as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      product: null,
      loading: true,
      error: null,
    });

    render(
      <BrowserRouter>
        <ProductDetail />
      </BrowserRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render product details', () => {
    (useProduct as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      product: mockProduct,
      loading: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <ProductDetail />
      </BrowserRouter>
    );

    expect(
      screen.getByText('Wireless Bluetooth Headphones')
    ).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('Add to Cart')).toBeInTheDocument();
  });

  it('should render error state', () => {
    (useProduct as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      product: null,
      loading: false,
      error: 'Failed to load product',
    });

    render(
      <BrowserRouter>
        <ProductDetail />
      </BrowserRouter>
    );

    expect(screen.getByText('Failed to load product')).toBeInTheDocument();
  });
});
