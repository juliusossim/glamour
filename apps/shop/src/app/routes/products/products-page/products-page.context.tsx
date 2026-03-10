import { createContext, useContext, type PropsWithChildren } from 'react';
import { useProductsPage } from './useProductspage.hook';

type ProductsPageContextValue = ReturnType<typeof useProductsPage>;

const ProductsPageContext = createContext<ProductsPageContextValue | null>(
  null
);

export function ProductsPageProvider({
  children,
}: Readonly<PropsWithChildren>) {
  const value = useProductsPage();

  return (
    <ProductsPageContext.Provider value={value}>
      {children}
    </ProductsPageContext.Provider>
  );
}

export function useProductsPageContext() {
  const context = useContext(ProductsPageContext);

  if (!context) {
    throw new Error(
      'useProductsPageContext must be used within a ProductsPageProvider'
    );
  }

  return context;
}
