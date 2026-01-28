'use client';

import { ReactNode, useRef } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

interface StoreProviderProps {
  readonly children: ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
  const storeRef = useRef(store);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
