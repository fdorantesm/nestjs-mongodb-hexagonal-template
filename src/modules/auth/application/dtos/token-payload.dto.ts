import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

export class TokenPayloadDto {
  public id: string;

  @IsString()
  @IsArray()
  @ValidateNested({ each: true })
  public scopes: string[];

  @IsNumber()
  @IsOptional()
  public iat?: number;

  @IsNumber()
  @IsOptional()
  public exp?: number;
}
