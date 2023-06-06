import { IsNumber, IsString } from 'class-validator';

export class TokenDto {
  @IsString()
  public accessToken: string;
  @IsNumber()
  public expiresAt: number;
}
