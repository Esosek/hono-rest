import "dotenv/config";

type IConfig = {
  port: number;
  apiPrefix: string;
  appVersion: string;
};

const config: IConfig = {
  port: Number(process.env.PORT ?? 3000),
  apiPrefix: process.env.API_PREFIX ?? "/api",
  appVersion: process.env.APP_VERSION ?? "1.0.0",
};

export default config;
