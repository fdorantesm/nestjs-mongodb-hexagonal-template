import { LoginUseCase } from './login/login.use-case';
import { MeUseCase } from './me/me-use-case';
import { RegisterUseCase } from './register/register.use-case';
import { ValidateTokenUseCase } from './validate-token/validate-token.use-case';

export const useCases = [LoginUseCase, RegisterUseCase, ValidateTokenUseCase, MeUseCase];
