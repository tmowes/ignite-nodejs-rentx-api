declare namespace Express {
  export interface Request {
    user: {
      id: string
    }
  }
}

type CustomEnvVar =
  | 'FORGOT_MAIL_URL'
  | 'AWS_ACCESS_KEY_ID'
  | 'AWS_SECRET_ACCESS_KEY'
  | 'AWS_BUCKET_NAME'
  | 'AWS_BUCKET_REGION'
  | 'AWS_BUCKET_URL'
  | 'STORAGE_PROVIDER'
  | 'MAIL_PROVIDER'
  | 'APP_API_URL'
  | 'REDIS_HOST'
  | 'REDIS_PORT'
  | 'REDIS_PASSWORD'

type ProcessEnvExtended = {
  [key in CustomEnvVar]: string
}

declare namespace NodeJS {
  export interface ProcessEnv extends ProcessEnvExtended {}
}
