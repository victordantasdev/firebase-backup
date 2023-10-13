declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ORIGIN_API_KEY: string
      ORIGIN_AUTH_DOMAIN: string
      ORIGIN_PROJECT_ID: string
      ORIGIN_STORAGE_BUCKET: string
      ORIGIN_MESSAGING_SENDER_ID: string
      ORIGIN_APP_ID: string
      DESTINY_API_KEY: string
      DESTINY_AUTH_DOMAIN: string
      DESTINY_PROJECT_ID: string
      DESTINY_STORAGE_BUCKET: string
      DESTINY_MESSAGING_SENDER_ID: string
      DESTINY_APP_ID: string
    }
  }
}

export { }

