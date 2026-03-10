export interface AppConfig {
  apiBaseUrl?: string;
  mode?: string;
  buildNumber?: string;
  host?: string;
  port?: number;
  [key: string]: unknown;
}

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
