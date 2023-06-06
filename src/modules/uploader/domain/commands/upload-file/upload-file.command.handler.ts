import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';

import { UploadFileCommand } from './upload-file.command';
import { S3Service } from 'src/modules/uploader/infrastructure/s3/services/s3.service';
import { S3Config } from 'src/modules/uploader/infrastructure/config/s3.type';

@CommandHandler(UploadFileCommand)
export class UploadFileCommandHandler implements ICommandHandler<UploadFileCommand> {
  constructor(
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
  ) {}

  public async execute(command: UploadFileCommand): Promise<any> {
    const { key, buffer } = command;
    const { endpoint, bucket } = this.configService.get<S3Config>('s3');
    await this.s3Service.upload(key, buffer, bucket, command.options);
    return this.s3Service.getLocation(bucket, key, null, endpoint);
  }
}
