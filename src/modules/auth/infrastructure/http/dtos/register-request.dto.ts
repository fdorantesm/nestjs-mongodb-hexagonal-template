import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class RegisterRequestDto {
  @ApiProperty({ example: 'someone@email.local' })
  @IsString()
  @IsEmail()
  public email: string;

  @ApiProperty({ example: 'hkQjS0q((?aSc' })
  @IsString()
  @IsOptional()
  public password: string;

  @ApiPropertyOptional({ example: 'Luis Hernández' })
  @IsString()
  @IsOptional()
  public name?: string;

  @ApiPropertyOptional({ example: '+525555555555' })
  @IsPhoneNumber()
  @IsOptional()
  public phone?: string;
}
