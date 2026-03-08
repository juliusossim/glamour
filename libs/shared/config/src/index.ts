export type AppConfig = {
  apiBaseUrl?: string;
  env?: string;
  host?: string;
  port?: number;
  buildNumber?: string;
  [key: string]: any;
};

let _config: AppConfig | null = null;

export function createConfig(cfg: AppConfig) {
  _config = Object.freeze({ ...cfg });
  return _config;
}

export function getConfig(): AppConfig {
  if (!_config)
    throw new Error(
      'Config not initialized — call createConfig at app bootstrap'
    );
  return _config;
}

export { ConfigProvider, useConfig } from './provider';
