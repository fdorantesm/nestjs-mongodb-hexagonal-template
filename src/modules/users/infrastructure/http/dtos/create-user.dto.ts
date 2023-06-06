import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsObject,
  ValidateNested,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProfileDto } from './profile.dto';

export class CreateUserDto {
  @ApiProperty({ example: 'luishdz@gmail.com' })
  @IsString()
  @IsEmail()
  public email: string;

  @ApiProperty({ example: 'hkQjS0q((?aSc' })
  @IsString()
  @IsOptional()
  public password: string;

  @ApiProperty()
  @IsObject()
  @Type(() => ProfileDto)
  @ValidateNested({ each: true })
  public profile: ProfileDto;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  public isActive?: boolean;
}
