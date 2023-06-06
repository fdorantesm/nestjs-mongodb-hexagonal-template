import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './infrastructure/http/controllers/auth.controller';
import { tokenConfigLoader } from './infrastructure/config/loaders/jwt.config-loader';
import { JwtStrategy } from './infrastructure/vendors/jwt/strategies/jwt.strategy';
import { JwtGuard } from './infrastructure/vendors/jwt/guards/jwt.guard';
import { JwtConfiguration } from '@app/common/types/jwt/jwt.configuration';
import { IdGeneratorModule } from '@app/id-generator';
import { SharedModule } from '../shared/shared.module';
import { JwtService } from './infrastructure/vendors/jwt';
import { useCases } from './application/use-cases';

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
  providers: [...useCases, JwtService, JwtStrategy, JwtGuard],
  controllers: [AuthController],
})
export class AuthModule {}
