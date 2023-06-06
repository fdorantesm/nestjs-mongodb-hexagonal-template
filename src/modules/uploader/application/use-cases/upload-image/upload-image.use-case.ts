import { ConfigService } from '@nestjs/config';
import { InjectS3 } from 'nestjs-s3';
import * as get from 'lodash/get';
import slugify from 'slugify';

import { UseCase } from 'libs/domain/src';
import { Case } from 'src/core/domain/decorators/case.decorator';
import { BasePath } from '../../../domain/enums/base-path.enum';
import { File } from '@app/common/types/general/file.type';
import { S3Service } from 'src/modules/uploader/infrastructure/s3/services/s3.service';

@Case()
export class UploadImageUseCase implements UseCase {
  constructor(
    private readonly configService: ConfigService,
    @InjectS3()
    private readonly s3Service: S3Service,
  ) {}
  public async execute(basePath: BasePath, context: string, file: File): Promise<string> {
    const bucket = this.configService.get<string>('s3.bucket');
    const time = Date.now();
    const ext = get(file.originalname.match(/\.([^.]+)$/), 1);
    const name = file.originalname.replace(`.${ext}`, '');
    const slug = slugify(name);
    const filename = `${time}-${slug}.${ext}`;
    const key = [basePath, context, filename].join('/');
    await this.s3Service.upload(key, file.buffer);
    return this.s3Service.getLocation(bucket, key);
  }
}
