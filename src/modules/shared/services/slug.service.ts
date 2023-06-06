import { Injectable } from '@nestjs/common';
import * as slug from 'slug';

@Injectable()
export class SlugService {
  public exec(src: string): string {
    return slug(src);
  }
}
