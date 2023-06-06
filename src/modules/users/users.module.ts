import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { UserModelInstance } from './infrastructure/database/models';
import { UserDatabaseRepository } from './infrastructure/database/repositories/user.repository';
import { UsersService } from './infrastructure/database/services/users.service';
import { BcryptService } from './infrastructure/vendors/services/bcrypt.service';
import { CommandHandlers } from './domain/commands';
import { QueryHandlers } from './domain/queries';
import { IdGeneratorModule } from '@app/id-generator';
import { UsersController } from './infrastructure/http/controllers/users.controller';
import { UseCases } from './application/use-cases';
import { USER_REPOSITORY_TOKEN } from './domain/contracts/user.repository.contract';
import { PASSWORD_SERVICE_TOKEN } from './domain/contracts/password.service.contract';
import { USER_SERVICE_TOKEN } from './domain/contracts/user.service.contract';

@Module({
  imports: [MongooseModule.forFeature([UserModelInstance]), IdGeneratorModule],
  providers: [
    ...UseCases,
    ...QueryHandlers,
    ...CommandHandlers,
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: UserDatabaseRepository,
    },
    {
      provide: USER_SERVICE_TOKEN,
      useClass: UsersService,
    },
    {
      provide: PASSWORD_SERVICE_TOKEN,
      useClass: BcryptService,
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
