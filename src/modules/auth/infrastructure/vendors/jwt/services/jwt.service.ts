import { Injectable } from '@nestjs/common';
import { JwtService as NestJswtService } from '@nestjs/jwt';

import { TokenPayloadDto } from '../dtos/token-payload.dto';
import { TokenDto } from '../dtos/token.dto';

@Injectable()
export class JwtService {
  constructor(private readonly jwtService: NestJswtService) {}

  public async create(payload: TokenPayloadDto): Promise<TokenDto> {
    const accessToken = this.jwtService.sign(payload);
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
