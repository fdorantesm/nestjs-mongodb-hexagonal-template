import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/modules/users/domain/interfaces/user.interface';
import { UsersMemoryRepository } from './user.memory.repository';

describe('UsersMemoryRepository', () => {
  let repository: UsersMemoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersMemoryRepository],
    }).compile();

    repository = module.get<UsersMemoryRepository>(UsersMemoryRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should create a user', async () => {
    const user: User = {
      uuid: '1',
      email: 'test@example.com',
      password: 'password',
      scopes: [],
      isActive: true,
    };

    const createdUser = await repository.create(user);
    expect(createdUser).toBeDefined();
    expect(createdUser.uuid).toEqual(user.uuid);
    expect(createdUser.email).toEqual(user.email);
  });

  it('should find a user by email', async () => {
    const user: User = {
      uuid: '1',
      email: 'test@example.com',
      password: 'password',
      scopes: [],
      isActive: true,
    };

    await repository.create(user);
    const foundUser = await repository.findOne({ email: user.email });
    expect(foundUser).toBeDefined();
    expect(foundUser.uuid).toEqual(user.uuid);
    expect(foundUser.email).toEqual(user.email);
  });

  it('should update a user profile', async () => {
    const user: User = {
      uuid: '1',
      email: 'test@example.com',
      password: 'password',
      scopes: [],
      isActive: true,
      profile: {
        name: 'John Doe',
        phone: '123456789',
      },
    };

    await repository.create(user);
    const updatedProfile = {
      name: 'Jane Smith',
    };

    const updateProfile = await repository.updateProfile(user.uuid, updatedProfile);
    expect(updateProfile).toBeDefined();
    expect(updateProfile.name).toEqual(updatedProfile.name);
    expect(updateProfile.phone).toEqual(user.profile.phone);
  });

  it('should delete a user', async () => {
    const user: User = {
      uuid: '1',
      email: 'test@example.com',
      password: 'password',
      scopes: [],
      isActive: true,
    };

    await repository.create(user);
    await repository.deleteOne({ uuid: user.uuid });
    const foundUser = await repository.findOne({ uuid: user.uuid });
    expect(foundUser).toBeUndefined();
  });
});
