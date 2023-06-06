import { Module } from '@nestjs/common';

import { IdGeneratorProvider } from './id-generator.provider';

@Module({
  providers: [IdGeneratorProvider],
  exports: [IdGeneratorProvider],
})
export class IdGeneratorModule {}
