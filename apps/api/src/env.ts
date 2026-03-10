export interface ApiEnv {
  host: string;
  port: number;
  mode: string;
}

const getPort = (): number => {
  if (process.env.PORT) {
    return Number(process.env.PORT);
  }
  if (process.env.VITE_PORT) {
    return Number(process.env.VITE_PORT);
  }
  return 3333;
};

export const apiEnv: ApiEnv = {
  host: process.env.HOST ?? process.env.VITE_HOST ?? 'localhost',
  port: getPort(),
  mode: process.env.NODE_ENV ?? process.env.VITE_NODE_ENV_MODE ?? 'development',
};
