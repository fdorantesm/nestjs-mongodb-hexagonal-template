import { Request } from 'express';
import { Scope } from 'src/modules/users/domain/enums/scope.enum';

type User = { id: string; scopes: Scope[] };

export type UserRequest = Request & { user: User };
