import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { databaseConfigLoader } from 'src/core/application/config/loaders/database.config.loader';
import { MongooseFactory } from 'src/database/factories/mongoose.factory';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule.forFeature(databaseConfigLoader)],
      inject: [ConfigService],
      useClass: MongooseFactory,
    }),
  ],
})
export class DatabaseModule {}
