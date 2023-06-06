import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy, AbstractStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { TokenPayloadDto } from '../../../../application/dtos/token-payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) implements AbstractStrategy {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.secret'),
    });
  }

  public validate(payload: TokenPayloadDto): TokenPayloadDto {
    try {
      return payload;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
