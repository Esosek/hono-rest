import 'dotenv/config'

export type IConfig = {
  port: number
  appVersion: string
  databaseUrl: string
  clientUrl: string
}

const config: IConfig = {
  port: Number(process.env.PORT ?? 3000),
  appVersion: process.env.APP_VERSION ?? '1.0.0',
  databaseUrl: process.env.DATABASE_URL ?? 'file:./src/db/dev.db',
  clientUrl: process.env.CLIENT_URL ?? 'http://localhost:5173',
}

export default config
