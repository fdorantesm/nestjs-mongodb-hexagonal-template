import { Injectable } from '@nestjs/common';
import * as pug from 'pug';

import { TemplateService } from 'src/modules/shared/domain/contracts/template.service.contract';

@Injectable()
export class PugService implements TemplateService {
  public render(template: string, data?: { [key: string]: any }): string {
    return pug.render(template, data);
  }
}
