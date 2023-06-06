import { Injectable, UnauthorizedException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { UserEntity } from 'src/modules/users/domain/entities/user.entity';
import { TokenPayloadDto } from '../dtos/token-payload.dto';
import { FindUserQuery } from 'src/modules/users/domain/queries';

@Injectable()
export class ValidateBackofficeTokenUseCase {
  constructor(private readonly queryBus: QueryBus) {}

  public async exec(userId: string): Promise<TokenPayloadDto> {
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
