import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { S3Module } from 'nestjs-s3';

import { DateService } from './services/date.service';
import { SlugService } from './services/slug.service';
import { UrlService } from './services/url.service';
import { FileService } from './services/file.service';
import { emailConfigLoader } from 'src/core/infrastructure/config/loaders/email.loader';
import { S3Factory } from '../uploader/infrastructure/factories/s3.factory';
import { s3ConfigLoader } from './infrastructure/config/loaders/storage.loader';

@Module({
  imports: [
    ConfigModule.forFeature(emailConfigLoader),
    S3Module.forRootAsync({
      imports: [ConfigModule.forFeature(s3ConfigLoader)],
      inject: [ConfigService],
      useClass: S3Factory,
    }),
  ],
  providers: [DateService, SlugService, UrlService, FileService],
  exports: [DateService, SlugService, UrlService, FileService],
})
export class SharedModule {}
