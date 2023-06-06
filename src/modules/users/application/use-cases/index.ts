import { CreateUserUseCase } from './create-user/create-user.use-case';
import { DeleteUserUseCase } from './delete-user/delete-user.use-case';
import { GetUserUseCase } from './get-user/get-user.use-case';
import { ListUsersUseCase } from './list-users/list-users.use-case';
import { UpdateUserProfileUseCase } from './update-user-profile/update-user-profile.use-case';
import { UpdateUserUseCase } from './update-user/update-user.use-case';

export const UseCases = [
  ListUsersUseCase,
  UpdateUserProfileUseCase,
  CreateUserUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
  GetUserUseCase,
];
