import { DatabaseConnection } from '@app/common';
import { registerAs } from '@nestjs/config';

export const databaseConfigLoader = registerAs(
  'database',
  (): DatabaseConnection => ({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  }),
);
