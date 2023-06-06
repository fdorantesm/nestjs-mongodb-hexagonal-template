import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { AuthModule } from 'src/modules/auth/auth.module';
import { UsersModule } from 'src/modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from 'src/modules/users/infrastructure/database/services/users.service';
import { Scope } from 'src/modules/users/domain/enums/scope.enum';
import { CoreModule } from 'src/core/core.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;
  let usersService: UsersService;

  let mongod: MongoMemoryServer;

  const rootUser = {
    email: 'root@email.local',
    password: 'sesame',
    scopes: [Scope.ROOT],
    phone: '+525555555555',
    name: 'Root',
  };

  beforeEach(async () => {
    mongod = await MongoMemoryServer.create();

    moduleFixture = await Test.createTestingModule({
      imports: [CoreModule, AuthModule, UsersModule, MongooseModule.forRoot(mongod.getUri())],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    usersService = app.get(UsersService);
  });

  afterEach(async () => {
    await app.close();
    await moduleFixture.close();
    await mongod.stop();
  });

  it('POST /auth/login', async () => {
    await usersService.register(rootUser.email, rootUser.password, rootUser.scopes);

    const login = await request(app.getHttpServer()).post('/auth/login').send({
      email: rootUser.email,
      password: rootUser.password,
    });

    expect(login.statusCode).toBe(HttpStatus.CREATED);
  });

  it('GET /auth/me', async () => {
    await usersService.register(rootUser.email, rootUser.password, rootUser.scopes);

    const login = await request(app.getHttpServer()).post('/auth/login').send({
      email: rootUser.email,
      password: rootUser.password,
    });

    const me = await request(app.getHttpServer())
      .get('/auth/me')
      .set('Authorization', `bearer ${login.body.data.accessToken}`);

    expect(me.statusCode).toBe(HttpStatus.OK);
  });

  it('POST /auth/register', async () => {
    const register = await request(app.getHttpServer()).post('/auth/register').send({
      email: rootUser.email,
      password: rootUser.password,
      name: rootUser.name,
      phone: rootUser.phone,
    });

    expect(register.statusCode).toBe(HttpStatus.CREATED);
  });
});
