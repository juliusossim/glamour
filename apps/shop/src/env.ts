export interface ShopEnv {
  apiBaseUrl: string;
  mode: string;
  buildNumber: string;
}

export const shopEnv: ShopEnv = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3333',
  mode:
    import.meta.env.VITE_NODE_ENV_MODE ?? import.meta.env.MODE ?? 'development',
  buildNumber: import.meta.env.VITE_BUILD_NUMBER ?? 'dev',
};
