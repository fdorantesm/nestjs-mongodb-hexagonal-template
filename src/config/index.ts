import * as Joi from 'joi';
import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';

import { configSchema } from './infrastructure/config/schemas/config.schema';
import { serverConfigLoader } from './infrastructure/config/loaders/server.loader';
import { environmentConfigLoader } from './infrastructure/config/loaders/environment.loader';
import { databaseSchema } from 'src/database/infrastructure/config/schemas/database.schema';
import { s3Schema } from 'src/modules/uploader/infrastructure/config/s3.schema';
import { JwtSchema } from 'src/modules/auth/infrastructure/config/schemas/jwt.schema';

export const configOptions: ConfigModuleOptions = {
  cache: true,
  isGlobal: true,
  load: [serverConfigLoader, environmentConfigLoader],
  validationSchema: Joi.object().keys({
    ...configSchema.keys,
    ...databaseSchema.keys,
    ...JwtSchema.keys,
    ...s3Schema.keys,
    ...s3Schema.keep,
  }),
  validationOptions: {
    allowUnknown: true,
    abortEarly: true,
  },
};
