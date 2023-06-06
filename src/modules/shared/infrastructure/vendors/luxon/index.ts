import { DATE_SERVICE_TOKEN } from 'src/modules/shared/domain/contracts/date.service.contract';
import { LuxonService } from './luxon.service';

export const DateService = {
  provide: DATE_SERVICE_TOKEN,
  useClass: LuxonService,
};
