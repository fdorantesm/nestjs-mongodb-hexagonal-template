import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { IdGeneratorService } from './id-generator.interface';

@Injectable()
export class UuidGeneratorService implements IdGeneratorService {
  public run(): string {
    return uuid();
  }
}
