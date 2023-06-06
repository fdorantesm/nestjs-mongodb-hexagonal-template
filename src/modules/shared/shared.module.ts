import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { SES } from '@aws-sdk/client-ses';

import { LuxonService } from './infrastructure/vendors/luxon/luxon.service';
import { SlugService } from './infrastructure/vendors/slugify';
import { TemplateService } from './infrastructure/vendors/pug';
import { FileService, TitlelizerService, UrlService } from './domain/services';
import { DateService } from './infrastructure/vendors/luxon';
import { EmailService } from './infrastructure/vendors/ses';
import { sesConfigLoader } from './infrastructure/config/loaders/ses.loader';

@Module({
  imports: [ConfigModule.forFeature(sesConfigLoader)],
  providers: [
    FileService,
    UrlService,
    TitlelizerService,
    LuxonService,
    SlugService,
    TemplateService,
    DateService,
    EmailService,
    {
      inject: [ConfigService],
      provide: 'SES_CLIENT',
      useFactory(configService: ConfigService) {
        return new SES({
          region: configService.get('ses.region'),
          credentials: {
            accessKeyId: configService.get('ses.accessKey'),
            secretAccessKey: configService.get('ses.secretAccessKey'),
          },
        });
      },
    },
  ],
  exports: [
    FileService,
    UrlService,
    TitlelizerService,
    LuxonService,
    SlugService,
    TemplateService,
    DateService,
    EmailService,
  ],
})
export class SharedModule {}
