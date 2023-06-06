import { GetSignedUrlCommandHandler } from './get-signed-url/get-signed-url.command.handler';
import { UploadFileCommandHandler } from './upload-file/upload-file.command.handler';

export * from './upload-file/upload-file.command';
export * from './get-signed-url/get-signed-url.command';

export const CommandHandlers = [UploadFileCommandHandler, GetSignedUrlCommandHandler];
