import { PutObjectCommandInput } from '@aws-sdk/client-s3';
import { ICommand } from '@nestjs/cqrs';

export class UploadFileCommand implements ICommand {
  constructor(
    public readonly key: string,
    public readonly buffer: Buffer,
    public readonly options?: Partial<PutObjectCommandInput>,
  ) {}
}
