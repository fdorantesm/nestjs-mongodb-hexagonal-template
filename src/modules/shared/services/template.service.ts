import { Injectable } from '@nestjs/common';
import * as pug from 'pug';

@Injectable()
export class TemplateService {
  public render(template: string, data?: { [key: string]: any }): string {
    return pug.render(template, data);
  }
}
