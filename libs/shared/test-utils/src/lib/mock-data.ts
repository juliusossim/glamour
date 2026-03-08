import { DisplayProduct } from '@org/models';

export const createMockProduct = (
  overrides?: Partial<DisplayProduct>
): DisplayProduct => ({
  id: '1',
  name: 'Test Product',
  description: 'Test Description',
  price: { min: 89.99, best: 99.99 },
  category: 'Electronics',
  imageUrls: ['https://example.com/image.jpg'],
  inStock: true,
  rating: 4.5,
  reviewCount: 100,
  ...overrides,
});

export const createMockProductList = (count = 3): DisplayProduct[] => {
  return Array.from({ length: count }, (_, i) =>
    createMockProduct({
      id: `${i + 1}`,
      name: `Test Product ${i + 1}`,
      price: { min: (i + 1) * 40.99, best: (i + 1) * 50.99 },
      rating: 3 + Math.random() * 2,
      reviewCount: Math.floor(Math.random() * 500),
    })
  );
};

export const mockCategories = [
  'Electronics',
  'Clothing',
  'Home & Kitchen',
  'Sports',
  'Accessories',
];
