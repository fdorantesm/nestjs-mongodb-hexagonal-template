import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiExcludeEndpoint, ApiOperation } from '@nestjs/swagger';

import { File } from '@app/common/types/general/file.type';
import { UploadImageUseCase } from 'src/modules/uploader/application/use-cases/upload-image/upload-image.use-case';
import { UploadImageRequestDto } from '../dtos/upload-image.request.dto';

@Controller({
  path: '/uploader',
  version: '1',
})
export class UploaderController {
  constructor(private readonly uploadImageUseCase: UploadImageUseCase) {}

  @ApiExcludeEndpoint()
  @ApiOperation({ deprecated: true })
  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  public async upload(@Body() body: UploadImageRequestDto, @UploadedFile() file: File) {
    return await this.uploadImageUseCase.execute(body.basePath, body.context, file);
  }
}
