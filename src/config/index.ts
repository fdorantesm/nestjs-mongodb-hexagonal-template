import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';

import { configSchema } from './schemas/config.schema';
import { serverConfigLoader } from './loaders/server.loader';
import { environmentConfigLoader } from './loaders/environment.loader';

export const configOptions: ConfigModuleOptions = {
  cache: true,
  isGlobal: true,
  load: [serverConfigLoader, environmentConfigLoader],
  validationSchema: configSchema,
  validationOptions: {
    allowUnknown: true,
    abortEarly: true,
  },
};
