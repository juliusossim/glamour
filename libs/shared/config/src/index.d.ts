export type AppConfig = {
  apiBaseUrl?: string;
  env?: string;
  host?: string;
  port?: number;
  buildNumber?: string;
  [key: string]: any;
};
export declare function createConfig(cfg: AppConfig): AppConfig;
export declare function getConfig(): AppConfig;
export { ConfigProvider, useConfig } from './provider';
//# sourceMappingURL=index.d.ts.map
