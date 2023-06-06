import { File } from '@app/common/types/general/file.type';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsUUID } from 'class-validator';
import { BasePath } from 'src/modules/uploader/domain/enums/base-path.enum';

export class UploadImageRequestDto {
  @ApiProperty({ type: String, format: 'binary' })
  public readonly file: File;

  @ApiProperty({ type: String, enum: BasePath })
  @IsEnum(BasePath)
  public readonly basePath: BasePath;

  @ApiProperty({ type: String })
  @IsUUID()
  public readonly context: string;
}
