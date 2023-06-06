import { Inject } from '@nestjs/common';

import { ID_GENERATOR_SERVICE_TOKEN } from './id-generator.consts';

export const InjectIdGenerator = () => {
  return Inject(ID_GENERATOR_SERVICE_TOKEN);
};
