import { UnauthorizedException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { UserEntity } from 'src/modules/users/domain/entities/user.entity';
import { FindUserQuery } from 'src/modules/users/domain/queries';
import { TokenPayload } from '../../../domain/interfaces/token-payload.interface';
import { UseCase } from 'libs/domain/src';
import { Case } from 'src/core/domain/decorators/case.decorator';

@Case()
export class ValidateTokenUseCase implements UseCase {
  constructor(private readonly queryBus: QueryBus) {}

  public async execute(userId: string): Promise<TokenPayload> {
    const user = await this.queryBus.execute<FindUserQuery, UserEntity>(
      new FindUserQuery({ uuid: userId }),
    );

    if (!user) {
      throw new UnauthorizedException('auth.invalid_credentials');
    }

    return {
      id: user.uuid,
      scopes: user.scopes,
    };
  }
}
