import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import {
  USER_REPOSITORY_TOKEN,
  UserRepository,
} from 'src/modules/users/domain/contracts/user.repository.contract';
import {
  PASSWORD_SERVICE_TOKEN,
  PasswordService,
} from 'src/modules/users/domain/contracts/password.service.contract';
import { IdGeneratorModule, IdGeneratorService } from '@app/id-generator';
import { UsersMemoryRepository } from '../repositories/user.memory.repository';
import { User } from 'src/modules/users/domain/interfaces/user.interface';
import { Scope } from 'src/modules/users/domain/enums/scope.enum';
import { BcryptService } from '../../vendors/services/bcrypt.service';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: UserRepository;
  let passwordService: PasswordService;
  let idGeneratorService: IdGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [IdGeneratorModule],
      providers: [
        UsersService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useClass: UsersMemoryRepository,
        },
        {
          provide: PASSWORD_SERVICE_TOKEN,
          useClass: BcryptService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<UserRepository>(USER_REPOSITORY_TOKEN);
    passwordService = module.get<PasswordService>(PASSWORD_SERVICE_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find users with a filter', async () => {
    const filter = { email: 'test@example.com' };
    await userRepository.create({
      email: filter.email,
      password: '',
      isActive: true,
      uuid: '',
      scopes: [],
    });
    const users = await service.find(filter);
    expect(users[0].email).toBe(filter.email);
  });

  it('should find a user', async () => {
    const filter = { email: 'test@example.com' };
    await userRepository.create({
      email: filter.email,
      password: '',
      isActive: true,
      uuid: '',
      scopes: [],
    });
    const user = (await service.findOne(filter)).toObject();
    expect(user.email).toBe(filter.email);
  });

  it('should get a user count', async () => {
    const filter = {};
    await userRepository.create({
      email: 'john@example.com',
      password: '',
      isActive: true,
      uuid: '1',
      scopes: [],
    });
    await userRepository.create({
      email: 'jane@example.com',
      password: '',
      isActive: true,
      uuid: '2',
      scopes: [],
    });
    const users = await service.count(filter);
    expect(users).toBe(2);
  });

  it('should get login data', async () => {
    const email = 'test@example.com';
    const user = await service.register({
      email,
      password: 'sesame',
      scopes: [Scope.ROOT],
      isActive: true,
      profile: {
        name: 'Test',
        phone: '0000000000',
      },
    });
    const login = await service.getLoginData(email);
    const data = login.toJson();
    expect(data.uuid).toBe(user.uuid);
    expect(data.isActive).toBe(user.isActive);
  });

  it('should find a user by uuid', async () => {
    const user = await service.register({
      email: 'test@example.com',
      password: 'sesame',
      scopes: [Scope.ROOT],
      isActive: true,
      profile: {
        name: 'Test',
        phone: '0000000000',
      },
    });
    await service.findById(user.uuid);
  });

  it('should pass if password is correct', async () => {
    const email = 'test@example.com';
    const password = 'password';
    await service.register({
      email,
      password,
      scopes: [Scope.ROOT],
      isActive: true,
      profile: {
        name: 'Test',
        phone: '0000000000',
      },
    });
    const passwordMatch = await service.checkPassword(email, password);
    expect(passwordMatch).toBeTruthy();
  });

  it('should fails if password is wrong', async () => {
    const email = 'test@example.com';
    const password = 'password';
    await service.register({
      email,
      password: 'sesame',
      scopes: [Scope.ROOT],
      isActive: true,
      profile: {
        name: 'Test',
        phone: '0000000000',
      },
    });
    const passwordMatches = await service.checkPassword(email, password);
    expect(passwordMatches).toBeFalsy();
  });

  it('should register a user', async () => {
    const payload: Omit<User, 'uuid'> = {
      email: 'test@example.com',
      password: 'password',
      isActive: true,
      scopes: [Scope.ROOT],
    };
    const registeredUser = await service.register(payload);
    const user = registeredUser.toJson();
    expect(user.uuid).toBeDefined();
    expect(user.email).toBe(payload.email);
    expect(user.isActive).toBe(payload.isActive);
    expect(user.scopes).toEqual(payload.scopes);
  });

  it('should update a user profile', async () => {
    const user = await service.register({
      email: 'test@example.com',
      password: 'sesame',
      scopes: [Scope.ROOT],
      isActive: true,
      profile: {
        name: 'Test',
        phone: '0000000000',
      },
    });
    const data = {
      name: 'John Doe',
    };
    const updatedProfile = await service.updateProfile(user.uuid, data);
    expect(updatedProfile.name).toBe(data.name);
  });

  it('should update a user', async () => {
    const user = await service.register({
      email: 'test@example.com',
      password: 'sesame',
      scopes: [Scope.ROOT],
      isActive: true,
      profile: {
        name: 'Test',
        phone: '0000000000',
      },
    });
    const data = { isActive: false };
    const updatedUser = await service.update({ email: user.email }, data);
    const userJson = updatedUser.toJson();
    expect(userJson.isActive).toBeFalsy();
  });

  it('should delete a user', async () => {
    const user = await service.register({
      email: 'test@example.com',
      password: 'sesame',
      scopes: [Scope.ROOT],
      isActive: true,
      profile: {
        name: 'Test',
        phone: '0000000000',
      },
    });
    await service.deleteOne({ email: user.email });
    const userQuery = await service.findOne({ email: user.email });
    expect(userQuery).toBeFalsy();
  });
});
