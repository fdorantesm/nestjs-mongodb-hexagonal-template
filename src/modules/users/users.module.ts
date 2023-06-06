import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { UserModelInstance } from './infrastructure/database/models';
import { UserRepository } from './infrastructure/database/repositories/user.repository';
import { UsersService } from './infrastructure/database/services/users.service';
import { PasswordService } from './application/services/password.service';
import { CommandHandlers } from './domain/commands';
import { QueryHandlers } from './domain/queries';
import { IdGeneratorModule } from '@app/id-generator';
import { UsersController } from './infrastructure/http/controllers/users.controller';
import { UseCases } from './application/use-cases';

@Module({
  imports: [MongooseModule.forFeature([UserModelInstance]), IdGeneratorModule],
  providers: [
    ...UseCases,
    ...QueryHandlers,
    ...CommandHandlers,
    UserRepository,
    UsersService,
    PasswordService,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
