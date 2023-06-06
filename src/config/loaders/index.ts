import { HttpServerConfiguration } from '@app/common';

export const configLoader = (): ConfigLoader => ({
  server: {
    host: process.env.HOST,
    port: parseInt(process.env.PORT, 10),
    rateLimit: {
      rateMaxRequest: parseInt(process.env.RATE_MAX_REQUEST, 10) || 15,
      rateInterval: parseInt(process.env.RATE_INTERVAL, 10) || 30,
    },
  },
});

type ConfigLoader = {
  server: HttpServerConfiguration;
};
