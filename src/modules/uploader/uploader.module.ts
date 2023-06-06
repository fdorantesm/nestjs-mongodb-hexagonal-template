import { Module } from '@nestjs/common';
import { S3Module } from 'nestjs-s3';
import { S3ClientConfig } from '@aws-sdk/client-s3';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UploaderController } from './infrastructure/http/controllers/uploader.controller';
import { UploadImageUseCase } from './application/use-cases/upload-image/upload-image.use-case';
import { s3Loader } from './infrastructure/config/s3.loader';
import { S3Config } from './infrastructure/config/s3.type';
import { S3Service } from './infrastructure/s3/services/s3.service';
import { CommandHandlers } from './domain/commands';

@Module({
  imports: [
    ConfigModule.forFeature(() => ({
      ...s3Loader,
    })),
    S3Module.forRootAsync({
      imports: [ConfigModule.forFeature(s3Loader)],
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        const env = configService.get('environment.nodeEnv');
        const s3 = configService.get<S3Config>('s3');
        const s3Config: S3ClientConfig = {
          credentials: {
            accessKeyId: s3.accessKeyId,
            secretAccessKey: s3.secretAccessKey,
          },
        };

        if (env === 'development') {
          s3Config.forcePathStyle = true;
          s3Config.endpoint = s3.endpoint;
        }

        if (s3.region) {
          s3Config.region = s3.region;
        }

        return {
          config: s3Config,
        };
      },
    }),
  ],
  providers: [...CommandHandlers, UploadImageUseCase, S3Service],
  exports: [S3Service],
  controllers: [UploaderController],
})
export class UploaderModule {}
