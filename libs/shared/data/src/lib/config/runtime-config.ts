import { getConfig } from '@org/shared-config';

const DEFAULT_API_BASE_URL = 'http://localhost:3333';
const DEFAULT_MODE = 'development';

function readRuntimeConfig() {
  try {
    return getConfig();
  } catch {
    return {};
  }
}

export function getApiBaseUrl(): string {
  const cfg = readRuntimeConfig();
  const apiBaseUrl =
    typeof cfg.apiBaseUrl === 'string' && cfg.apiBaseUrl.length > 0
      ? cfg.apiBaseUrl
      : DEFAULT_API_BASE_URL;

  return apiBaseUrl.replace(/\/$/, '');
}

export function getRestApiUrl(): string {
  return `${getApiBaseUrl()}/api`;
}

export function getGraphqlUrl(): string {
  return `${getApiBaseUrl()}/graphql`;
}

export function getAppMode(): string {
  const cfg = readRuntimeConfig();

  return typeof cfg.mode === 'string' && cfg.mode.length > 0
    ? cfg.mode
    : DEFAULT_MODE;
}
