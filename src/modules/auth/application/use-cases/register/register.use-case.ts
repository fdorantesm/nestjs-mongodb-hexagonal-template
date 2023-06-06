import { ConflictException, Inject } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { Scope } from 'src/modules/users/domain/enums/scope.enum';
import { RegisterCommand } from 'src/modules/users/domain/commands';
import { User } from 'src/modules/users/domain/interfaces/user.interface';
import { UserEntity } from 'src/modules/users/domain/entities/user.entity';
import { FindUserQuery, HeadUserQuery } from 'src/modules/users/domain/queries';
import {
  TOKENIZER_SERVICE_TOKEN,
  TokenizerService,
} from '../../../domain/contracts/tokenizer.service.contract';
import { Token } from '../../../domain/interfaces/token.interface';
import { UseCase } from 'libs/domain/src';
import { Case } from 'src/core/domain/decorators/case.decorator';

@Case()
export class RegisterUseCase implements UseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @Inject(TOKENIZER_SERVICE_TOKEN)
    private readonly tokenService: TokenizerService,
  ) {}

  public async execute(
    payload: Omit<User, 'uuid' | 'scopes' | 'isActive'>,
  ): Promise<{ user: User } & Token> {
    const isNotFirst = await this.queryBus.execute<FindUserQuery, UserEntity>(
      new FindUserQuery(),
    );

    const previousUser = await this.queryBus.execute<HeadUserQuery, UserEntity>(
      new HeadUserQuery({
        email: payload.email,
      }),
    );

    if (previousUser) {
      throw new ConflictException('api.users.email_already_exists');
    }

    const subscriber = [Scope.USER];
    const scopes = isNotFirst ? subscriber : [Scope.ROOT, ...subscriber];

    const formatedEmail = payload.email.toLowerCase();

    const user = await this.commandBus.execute<RegisterCommand, UserEntity>(
      new RegisterCommand({
        email: formatedEmail,
        password: payload.password,
        scopes,
        profile: payload.profile,
        isActive: true,
      }),
    );

    const token = await this.tokenService.create({
      scopes,
      id: user.uuid,
    });

    return {
      ...token,
      user: user.toObject(),
    };
  }
}
