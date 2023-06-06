import { ConfigService } from '@nestjs/config';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { LoginRequestDto } from '../dtos/login-request.dto';
import { RegisterRequestDto } from '../dtos/register-request.dto';
import { UserRequest } from '@app/common/types/http/user-request.type';
import { JwtGuard } from 'src/modules/auth/application/guards/jwt.guard';
import { LoginUseCase } from 'src/modules/auth/application/use-cases/login.use-case';
import { MeUseCase } from 'src/modules/auth/application/use-cases/me-use-case';
import { RegisterUseCase } from 'src/modules/auth/application/use-cases/register.use-case';

@ApiTags('Auth')
@Controller({
  version: VERSION_NEUTRAL,
  path: 'auth',
})
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
    private readonly meUseCase: MeUseCase,
    private readonly configService: ConfigService,
  ) {}

  @ApiOperation({ summary: 'Sign in with an account' })
  @ApiBody({
    description: 'Get a signed web token to make protected requests',
    type: LoginRequestDto,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Login successful',
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials or expired token',
  })
  @ApiTooManyRequestsResponse({
    status: HttpStatus.TOO_MANY_REQUESTS,
    description: 'Too many requests in a short time',
  })
  @Post('/login')
  public async login(@Body() credentials: LoginRequestDto) {
    const token = await this.loginUseCase.run(credentials.email, credentials.password);

    return token;
  }

  @ApiOperation({ summary: 'Register an account' })
  @ApiBody({
    description: 'Register an administrator at first time',
    type: RegisterRequestDto,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Admin registered and logged in successful',
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials or expired token',
  })
  @ApiTooManyRequestsResponse({
    status: HttpStatus.TOO_MANY_REQUESTS,
    description: 'Too many requests in a short time',
  })
  @Post('/register')
  public async register(@Body() credentials: RegisterRequestDto) {
    const token = await this.registerUseCase.run({
      email: credentials.email,
      password: credentials.password,
      profile: {
        name: credentials.name,
        phone: credentials.phone,
      },
    });

    return token;
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user data' })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid or expired token',
  })
  @ApiTooManyRequestsResponse({
    status: HttpStatus.TOO_MANY_REQUESTS,
    description: 'Too many requests in a short time',
  })
  @UseGuards(JwtGuard)
  @Get('/me')
  public async me(@Req() request: UserRequest) {
    return await this.meUseCase.run(request.user.id);
  }
}
