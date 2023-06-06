import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { UserRequest } from '@app/common/types/http/user-request.type';
import { Scope } from 'src/modules/users/domain/enums/scope.enum';

@Injectable()
export class ScopeGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const scopes = this.reflector.get<string[]>('scopes', context.getHandler());

    if (!scopes) {
      return true;
    }

    const request = context.switchToHttp().getRequest<UserRequest>();
    const user = request.user;
    const isRoot = user.scopes.some((scope: Scope) => scope === Scope.ROOT);

    if (isRoot) {
      return true;
    }

    const hasRole = () =>
      user.scopes.some((role) => Boolean(scopes.find((item) => item === role)));

    const isAllowed = user && user.scopes && hasRole();

    if (!isAllowed) {
      throw new ForbiddenException('auth.forbidden_action');
    }

    return true;
  }
}
