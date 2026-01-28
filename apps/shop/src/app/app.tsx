import { LoadingSpinner } from '@org/shop-shared-ui';
import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

// Lazy load feature components
const ProductList = lazy(() =>
  import('@org/shop-feature-products').then((m) => ({
    default: m.ProductList,
  }))
);
const ProductDetail = lazy(() =>
  import('@org/shop-feature-product-detail').then((m) => ({
    default: m.ProductDetail,
  }))
);

export function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <header className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-6 shadow-md">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl font-bold">Glamour And Large</h1>
        </div>
      </header> */}

      <main className="flex-1 bg-background">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Navigate to="/products" replace />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="*" element={<Navigate to="/products" replace />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
