import { Injectable } from '@nestjs/common';
import { MongooseModuleFactoryOptions, MongooseOptionsFactory } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { MongooseConnectionFactory } from './mongoose-connection.factory';

@Injectable()
export class MongooseMemoryFactory implements MongooseOptionsFactory {
  public async createMongooseOptions(): Promise<MongooseModuleFactoryOptions> {
    const mongod = await MongoMemoryServer.create();
    const mongoUri = mongod.getUri();
    const { createForInstance } = MongooseConnectionFactory;

    return {
      uri: mongoUri,
      useNewUrlParser: true,
      connectionFactory: createForInstance,
    };
  }
}
