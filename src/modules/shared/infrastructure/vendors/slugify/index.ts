import { SLUG_SERVICE_TOKEN } from 'src/modules/shared/domain/contracts/slug.service.contract';
import { SlugifyService } from './slugify.service';

export const SlugService = {
  provide: SLUG_SERVICE_TOKEN,
  useClass: SlugifyService,
};
