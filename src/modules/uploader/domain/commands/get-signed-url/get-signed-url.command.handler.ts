import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';

import { GetSignedUrlCommand } from './get-signed-url.command';
import { S3Service } from 'src/modules/uploader/infrastructure/s3/services/s3.service';

@CommandHandler(GetSignedUrlCommand)
export class GetSignedUrlCommandHandler implements ICommandHandler<GetSignedUrlCommand> {
  private readonly bucket: string;

  constructor(
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
  ) {
    this.bucket = this.configService.get<string>('s3.bucket');
  }

  public execute(command: GetSignedUrlCommand): Promise<string> {
    return this.s3Service.getSignedUrl(command.bucket || this.bucket, command.key);
  }
}
