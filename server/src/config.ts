import 'dotenv/config'

export type IConfig = {
  port: number
  appVersion: string
  databaseUrl: string
}

const config: IConfig = {
  port: Number(process.env.PORT ?? 3000),
  appVersion: process.env.APP_VERSION ?? '1.0.0',
  databaseUrl: process.env.DATABASE_URL ?? './dev.db',
}

export default config
