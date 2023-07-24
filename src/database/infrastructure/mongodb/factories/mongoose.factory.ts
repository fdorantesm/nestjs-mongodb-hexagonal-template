import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseOptionsFactory, MongooseModuleOptions } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ConnectionString } from 'connection-string';
import { DatabaseConnection } from '@app/common';
import { MongooseConnectionFactory } from './mongoose-connection.factory';

mongoose.set('debug', false);

@Injectable()
export class MongooseFactory implements MongooseOptionsFactory {
  protected config: DatabaseConnection;

  constructor(private readonly configService: ConfigService) {
    this.config = configService.get<DatabaseConnection>('database');
  }

  public createMongooseOptions(): MongooseModuleOptions {
    const uri = new ConnectionString('', {
      user: this.config.username,
      password: this.config.password,
      protocol: this.config.port ? 'mongodb' : 'mongodb+srv',
      hosts: [{ name: this.config.host, port: this.config.port }],
    }).toString();

    const { createForInstance } = MongooseConnectionFactory;

    return {
      uri,
      dbName: this.config.database,
      connectionFactory: createForInstance,
    };
  }
}
