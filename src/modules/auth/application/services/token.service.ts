import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { TokenPayloadDto } from '../dtos/token-payload.dto';
import { TokenDto } from '../dtos/token.dto';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  public async create(payload: TokenPayloadDto): Promise<TokenDto> {
    const accessToken = await this.jwtService.sign(payload);
    const signed = await this.jwtService.verify(accessToken);
    return {
      accessToken,
      expiresAt: signed.exp,
    };
  }

  public decode(token: string): TokenPayloadDto {
    return this.jwtService.decode(token) as TokenPayloadDto;
  }
}
