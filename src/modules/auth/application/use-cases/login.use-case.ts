import { Injectable, UnauthorizedException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { TokenService } from '../services/token.service';
import { TokenPayloadDto } from '../dtos/token-payload.dto';
import { TokenDto } from '../dtos/token.dto';
import { CheckUserPasswordQuery, GetLoginDataQuery } from 'src/modules/users/domain/queries';
import { UserEntity } from 'src/modules/users/domain/entities/user.entity';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly tokenService: TokenService,
  ) {}

  public async run(email: string, password: string): Promise<TokenDto> {
    const formatedEmail = email.toLowerCase();

    const hasValidCredentials = await this.queryBus.execute<CheckUserPasswordQuery, boolean>(
      new CheckUserPasswordQuery(formatedEmail, password),
    );

    if (!hasValidCredentials) {
      throw this.throwInvalidCredentials();
    }

    const user = await this.queryBus.execute<GetLoginDataQuery, UserEntity>(
      new GetLoginDataQuery(formatedEmail),
    );

    if (!user.isActive) {
      throw this.throwInvalidCredentials();
    }

    const tokenPayload: TokenPayloadDto = {
      id: user.uuid,
      scopes: user.scopes,
    };

    const token = await this.tokenService.create(tokenPayload);

    return token;
  }

  private throwInvalidCredentials() {
    return new UnauthorizedException('users.invalid_credentials');
  }
}
