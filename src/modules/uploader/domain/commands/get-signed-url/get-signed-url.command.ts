import { ICommand } from '@nestjs/cqrs';

export class GetSignedUrlCommand implements ICommand {
  constructor(public readonly key: string, public readonly bucket?: string) {}
}
