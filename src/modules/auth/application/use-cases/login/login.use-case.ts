import { Inject, UnauthorizedException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { CheckUserPasswordQuery, GetLoginDataQuery } from 'src/modules/users/domain/queries';
import { UserEntity } from 'src/modules/users/domain/entities/user.entity';
import { Token } from '../../../domain/interfaces/token.interface';
import {
  TOKENIZER_SERVICE_TOKEN,
  TokenizerService,
} from '../../../domain/contracts/tokenizer.service.contract';
import { TokenPayload } from '../../../domain/interfaces/token-payload.interface';
import { UseCase } from 'libs/domain/src';
import { Case } from 'src/core/domain/decorators/case.decorator';

@Case()
export class LoginUseCase implements UseCase {
  constructor(
    private readonly queryBus: QueryBus,
    @Inject(TOKENIZER_SERVICE_TOKEN)
    private readonly tokenService: TokenizerService,
  ) {}

  public async execute(email: string, password: string): Promise<Token> {
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

    const tokenPayload: TokenPayload = {
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
