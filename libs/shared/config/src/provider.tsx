import React, { createContext, useContext } from 'react';
import type { AppConfig } from './index';
import { getConfig as getRuntimeConfig } from './index';

const ConfigContext = createContext<AppConfig | null>(null);

export function ConfigProvider({
  config,
  children,
}: Readonly<{
  config: AppConfig;
  children: React.ReactNode;
}>) {
  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
}

export function useConfig(): AppConfig {
  const ctx = useContext(ConfigContext);
  if (ctx) return ctx;
  return getRuntimeConfig();
}

export default ConfigProvider;
