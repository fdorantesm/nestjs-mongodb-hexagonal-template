import { EMAIL_SERVICE_TOKEN } from 'src/modules/shared/domain/contracts/email.service.contract';
import { SesService } from './ses.service';

export const EmailService = {
  provide: EMAIL_SERVICE_TOKEN,
  useClass: SesService,
};
