export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: { min: number; best: number };
  imageUrls: string[];
  inStock: boolean;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  pivotId?: string; // For cursor-based pagination
}

export interface ProductFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  searchTerm?: string;
}

export interface DisplayProduct extends Product {
  rating: number;
  reviewCount: number;
  discount?: number;
}
