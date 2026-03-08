import React from 'react';
import type { AppConfig } from './index';
export declare function ConfigProvider({
  config,
  children,
}: Readonly<{
  config: AppConfig;
  children: React.ReactNode;
}>): import('react/jsx-runtime').JSX.Element;
export declare function useConfig(): AppConfig;
export default ConfigProvider;
//# sourceMappingURL=provider.d.ts.map
