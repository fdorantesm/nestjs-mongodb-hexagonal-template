declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // ENVIRONMENT
      NODE_ENV: string;
      ENV?: 'development' | 'production';

      // SERVER
      HOST: string;
      PORT: string;

      RATE_MAX_REQUEST?: string;
      RATE_INTERVAL?: string;

      // JWT
      JWT_SECRET: string;
      JWT_EXPIRES: string;

      // Database
      DB_HOST: string;
      DB_PORT?: string;
      DB_USERNAME?: string;
      DB_PASSWORD?: string;
      DB_DATABASE: string;

      S3_ACCESS_KEY_ID: string;
      S3_SECRET_ACCESS_KEY: string;
      S3_BUCKET: string;
      S3_ENDPOINT: string;
    }
  }
}

export {};
