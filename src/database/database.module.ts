import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { databaseConfigLoader } from 'src/database/infrastructure/config/loaders/database.config.loader';
import { MongooseFactory } from 'src/database/infrastructure/mongodb/factories/mongoose.factory';

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
