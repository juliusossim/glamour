import { Globe, Stamp } from "lucide-react";
export const defaultProduct = {
      id: '1',
      name: 'Wireless Bluetooth Headphones',
      description: 'Premium quality wireless headphones with active noise cancellation, 30-hour battery life, and superior sound quality.',
      price: 199.99,
      category: 'Electronics',
      imageUrls: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500', 'https://videos.unsplash.com/photo-1523275335684-37898b6baf30?w=500', 'https://videos.pexels.com/video-files/8003609/8003609-uhd_2560_1440_25fps.mp4', 'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=500', 'https://images.unsplash.com/photo-1512499617640-c2f9992c3ba6?w=500'],
      inStock: true,
      rating: 4.5,
      reviewCount: 234,
    };
export const defaultBrands = [
  {
    id: 'brand1',
    name: 'Fashionista',
    logo: 'data:image/png;base64,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',
    websiteUrl: 'https://www.fashionista.com',
  },
    {
    id: 'brand2',
    name: 'Fashionista',
    logo: 'data:image/png;base64,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',
    href: 'https://www.fashionista.com',
  },
    {
    id: 'brand3',
    name: 'C of O',
    icon: <Globe className="text-green-500" size={12} />,
    iconPosition: 'start' as const,
    className: 'text-yellow-500',
    description: 'Global Certificate of Occupancy',
  },
  {
    id: 'brand4',
    name: "Governor's Consent",
    icon: <Stamp className="text-green-500" size={12} />,
    iconPosition: 'end' as const,
    className: 'text-yellow-500',
    description: "Governor's Consent from the state Governor, authorizing land use free from all government acquisitions.",
  },
];

export const defaultCategories = [
  { id: 'cat1', name: 'Clothing' },
  { id: 'cat2', name: 'Footwear' },
  { id: 'cat3', name: 'Accessories' },
  { id: 'cat4', name: 'Electronics' },
  { id: 'cat5', name: 'Home & Living' },
];

export const defaultTags = [
  { id: 'tag1', name: 'New Arrival' },
  { id: 'tag2', name: 'Best Seller' },
  { id: 'tag3', name: 'Discount' },
  { id: 'tag4', name: 'Limited Edition' },
  { id: 'tag5', name: 'Exclusive' },
];

export const defaultUser = {
  id: 'user1',
  name: 'John Doe',
  email: 'RcOwQ@example.com',
    avatarUrl: 'https://via.placeholder.com/100?text=JD',
    isVerified: true,
    joinDate: '2022-01-15T10:00:00Z',
};

export const defaultReview = {
  id: 'review1',
  productId: '1',
  userId: 'user1',
  rating: 5,
  title: 'Excellent Product!',
  content: 'I absolutely love these headphones. The sound quality is amazing and the noise cancellation works wonders. Highly recommend!',
  date: '2023-10-01T12:00:00Z',
};