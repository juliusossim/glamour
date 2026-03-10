import { useGetCategoriesQuery, useGetProductsQuery } from '@org/shared-data';
import { fireEvent, render, screen } from '@testing-library/react';
import {
  RouterProvider,
  createMemoryRouter,
  useLocation,
} from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  ProductsPageProvider,
  useProductsPageContext,
} from './products-page.context';

vi.mock('@org/shared-data', () => ({
  useGetCategoriesQuery: vi.fn(),
  useGetProductsQuery: vi.fn(),
}));

function ProductsPageProbe() {
  const { clearAll, filtering, pagination, search } = useProductsPageContext();
  const location = useLocation();

  return (
    <div>
      <span data-testid="search-term">{search.searchTerm || 'empty'}</span>
      <span data-testid="category-filter">
        {filtering.filters.category || 'none'}
      </span>
      <span data-testid="page-value">{String(pagination.page)}</span>
      <span data-testid="query-string">{location.search || 'empty'}</span>
      <button type="button" onClick={clearAll}>
        Clear all
      </button>
    </div>
  );
}

function renderWithDataRouter(initialEntry: string) {
  const router = createMemoryRouter(
    [
      {
        path: '/products',
        element: (
          <ProductsPageProvider>
            <ProductsPageProbe />
          </ProductsPageProvider>
        ),
      },
    ],
    {
      initialEntries: [initialEntry],
    }
  );

  return render(<RouterProvider router={router} />);
}

describe('ProductsPageProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (
      useGetProductsQuery as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      data: {
        data: [],
        page: 1,
        pageSize: 12,
        total: 0,
        totalPages: 0,
      },
      isFetching: false,
      isLoading: false,
    });
    (
      useGetCategoriesQuery as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      data: ['Clothing', 'Accessories'],
    });
  });

  it('hydrates search, filters, and pagination from the URL', () => {
    renderWithDataRouter(
      '/products?search=dress&category=Clothing&page=2&pageSize=24'
    );

    expect(screen.getByTestId('search-term')).toHaveTextContent('dress');
    expect(screen.getByTestId('category-filter')).toHaveTextContent('Clothing');
    expect(screen.getByTestId('page-value')).toHaveTextContent('2');
  });

  it('clears search and filter params without dropping page size', () => {
    renderWithDataRouter(
      '/products?search=dress&category=Clothing&page=2&pageSize=24'
    );

    fireEvent.click(screen.getByRole('button', { name: 'Clear all' }));

    expect(screen.getByTestId('search-term')).toHaveTextContent('empty');
    expect(screen.getByTestId('category-filter')).toHaveTextContent('none');
    expect(screen.getByTestId('query-string')).toHaveTextContent(
      '?pageSize=24'
    );
  });
});
