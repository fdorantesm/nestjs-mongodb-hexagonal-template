import { PugService } from './pug.service';

export const TemplateService = {
  provide: Symbol('TemplateService'),
  useClass: PugService,
};
