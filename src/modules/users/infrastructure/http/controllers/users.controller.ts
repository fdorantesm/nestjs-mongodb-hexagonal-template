import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Scopes } from 'src/modules/auth/application/decorators/scopes.decorator';
import { JwtGuard } from 'src/modules/auth/application/guards/jwt.guard';
import { ScopeGuard } from 'src/modules/auth/application/guards/scope.guard';
import { CreateUserUseCase } from 'src/modules/users/application/use-cases/create-user/create-user.use-case';
import { ListUsersUseCase } from 'src/modules/users/application/use-cases/list-users/list-users.use-case';
import { Scope } from 'src/modules/users/domain/enums/scope.enum';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserUseCase } from 'src/modules/users/application/use-cases/update-user/update-user.use-case';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { DeleteUserUseCase } from 'src/modules/users/application/use-cases/delete-user/delete-user.use-case';
import { GetUserUseCase } from 'src/modules/users/application/use-cases/get-user/get-user.use-case';

@ApiTags('Users')
@Controller({
  version: '1',
  path: '/users',
})
export class UsersController {
  constructor(
    private readonly listUsersUseCase: ListUsersUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
  ) {}

  @Scopes(Scope.ROOT)
  @UseGuards(JwtGuard, ScopeGuard)
  @Get('/')
  public async list() {
    return await this.listUsersUseCase.run({});
  }

  @Scopes(Scope.ROOT)
  @UseGuards(JwtGuard, ScopeGuard)
  @Get('/:uuid')
  public async show(@Param('uuid') uuid: string) {
    return await this.getUserUseCase.run(uuid);
  }

  @Scopes(Scope.ROOT)
  @UseGuards(JwtGuard, ScopeGuard)
  @Post('/')
  public async create(@Body() body: CreateUserDto) {
    return await this.createUserUseCase.run(body);
  }

  @Scopes(Scope.ROOT)
  @UseGuards(JwtGuard, ScopeGuard)
  @Patch('/:uuid')
  public async update(@Param('uuid') uuid: string, @Body() body: UpdateUserDto) {
    return await this.updateUserUseCase.run(uuid, body);
  }

  @Scopes(Scope.ROOT)
  @UseGuards(JwtGuard, ScopeGuard)
  @Delete('/:uuid')
  public async delete(@Param('uuid') uuid: string) {
    return await this.deleteUserUseCase.run(uuid);
  }
}
