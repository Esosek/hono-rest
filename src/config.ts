import "dotenv/config";

type IConfig = {
  apiPrefix: string;
};

const config: IConfig = {
  apiPrefix: process.env.API_PREFIX ?? "/api",
};

export default config;
