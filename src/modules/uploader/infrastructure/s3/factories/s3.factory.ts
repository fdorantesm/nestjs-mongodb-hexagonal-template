import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3ModuleOptionsFactory, S3ModuleOptions } from 'nestjs-s3/dist/s3.interfaces.d';

import { S3Configuration } from '@app/common/types/s3/s3.type';

@Injectable()
export class S3Factory implements S3ModuleOptionsFactory {
  protected params: S3Configuration;
  protected environment: string;

  constructor(private readonly configService: ConfigService) {
    this.params = configService.get<S3Configuration>('s3');
    this.environment = configService.get('environment.nodeEnv');
  }
  public createS3ModuleOptions(): S3ModuleOptions | Promise<S3ModuleOptions> {
    const s3Params: S3ModuleOptions = {
      config: {
        credentials: {
          accessKeyId: this.params.accessKey,
          secretAccessKey: this.params.secretAccessKey,
        },
      },
    };

    if (this.params.region) {
      s3Params.config.region = this.params.region;
    }

    if (this.environment === 'development') {
      s3Params.config.forcePathStyle = true;
      s3Params.config.endpoint = this.params.endpoint;
    }

    return s3Params;
  }
}
