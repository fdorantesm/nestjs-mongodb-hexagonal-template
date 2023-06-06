import { ID_GENERATOR_SERVICE_TOKEN } from './id-generator.consts';
import { UuidGeneratorService } from './uuid-generator.service';

export const IdGeneratorProvider = {
  useClass: UuidGeneratorService,
  provide: ID_GENERATOR_SERVICE_TOKEN,
};
