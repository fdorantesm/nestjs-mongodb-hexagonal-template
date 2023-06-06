import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

import { SlugService } from 'src/modules/shared/domain/contracts/slug.service.contract';

@Injectable()
export class SlugifyService implements SlugService {
  public execute(src: string): string {
    return slugify(src);
  }
}
