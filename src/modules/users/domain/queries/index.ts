import { CheckUserPasswordQueryHandler } from './check-user-password/check-user-password.query.handler';
import { FindUserQueryHandler } from './find-user/find-user.query.handler';
import { FindUsersQueryHandler } from './find-users/find-users.query.handler';
import { GetLoginDataQueryHandler } from './get-login-data/get-login-data.query.handler';
import { HeadUserQueryHandler } from './head-user/head-user.query.handler';

export * from './check-user-password/check-user-password.query';
export * from './find-user/find-user.query';
export * from './get-login-data/get-login-data.query';
export * from './head-user/head-user.query';

export const QueryHandlers = [
  CheckUserPasswordQueryHandler,
  FindUserQueryHandler,
  GetLoginDataQueryHandler,
  HeadUserQueryHandler,
  FindUsersQueryHandler,
];
