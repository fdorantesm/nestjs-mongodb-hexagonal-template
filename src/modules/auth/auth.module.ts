import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './infrastructure/http/controllers/auth.controller';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { tokenConfigLoader } from './application/config/loaders/token.config-loader';
import { TokenService } from './application/services/token.service';
import { RegisterUseCase } from './application/use-cases/register.use-case';
import { JwtStrategy } from './infrastructure/http/passport/jwt/jwt.strategy';
import { JwtGuard } from './application/guards/jwt.guard';
import { ValidateBackofficeTokenUseCase } from './application/use-cases/validate-backoffice-token.use-case';
import { JwtConfiguration } from '@app/common/types/jwt/jwt.configuration';
import { MeUseCase } from './application/use-cases/me-use-case';
import { IdGeneratorModule } from '@app/id-generator';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    CqrsModule,
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(tokenConfigLoader)],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = configService.get<JwtConfiguration>('jwt');
        return {
          secret: config.secret,
          signOptions: {
            expiresIn: config.expires,
          },
        };
      },
    }),
    SharedModule,
    IdGeneratorModule,
  ],
  providers: [
    TokenService,
    LoginUseCase,
    RegisterUseCase,
    JwtStrategy,
    JwtGuard,
    ValidateBackofficeTokenUseCase,
    MeUseCase,
  ],
  exports: [TokenService],
  controllers: [AuthController],
})
export class AuthModule {}
