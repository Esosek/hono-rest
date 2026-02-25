export enum LogStatusEnum {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

const log = (event: string, status: LogStatusEnum, message?: string) =>
  logger([event.toUpperCase(), status, message].filter(Boolean).join('--'))

export const logger = (message: string) => console.log(message)

export default log
