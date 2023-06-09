import { UserEntity } from './user.entity';
import { Scope } from '../enums/scope.enum';
import { User } from '../interfaces/user.interface';
import { ProfileEntity } from './profile.entity';

describe('UserEntity', () => {
  it('should create a user entity', () => {
    const user: User = {
      uuid: '123',
      email: 'test@example.com',
      password: 'password123',
      scopes: [Scope.USER],
      profile: {
        name: 'John Doe',
        phone: '1234567890',
      },
      isActive: true,
    };

    const userEntity = UserEntity.create(user);

    expect(userEntity.uuid).toEqual(user.uuid);
    expect(userEntity.email).toEqual(user.email);
    expect(userEntity.password).toEqual(user.password);
    expect(userEntity.scopes).toEqual(user.scopes);
    expect(userEntity.profile).toBeInstanceOf(ProfileEntity);
    expect(userEntity.isActive).toEqual(user.isActive);
  });

  it('should convert user entity to object', () => {
    const user: User = {
      uuid: '123',
      email: 'test@example.com',
      password: 'password123',
      scopes: [Scope.USER],
      profile: {
        name: 'John Doe',
        phone: '1234567890',
      },
      isActive: true,
    };

    const userEntity = UserEntity.create(user);
    const userObject = userEntity.toObject();

    expect(userObject.uuid).toEqual(user.uuid);
    expect(userObject.email).toEqual(user.email);
    expect(userObject.password).toBeUndefined();
    expect(userObject.scopes).toEqual(user.scopes);
    expect(userObject.profile).toEqual(user.profile);
    expect(userObject.isActive).toEqual(user.isActive);
  });

  it('should convert user entity to JSON', () => {
    const user = {
      uuid: '123',
      email: 'test@example.com',
      password: 'password123',
      scopes: [Scope.USER],
      profile: {
        name: 'John Doe',
        phone: '1234567890',
      },
      isActive: true,
    };

    const userEntity = UserEntity.create(user);
    const userJson = userEntity.toJson();

    expect(userJson.uuid).toEqual(user.uuid);
    expect(userJson.email).toEqual(user.email);
    expect(userJson.password).toBeUndefined();
    expect(userJson.scopes).toEqual(user.scopes);
    expect(userJson.profile).toEqual(user.profile);
    expect(userJson.isActive).toEqual(user.isActive);
  });
});
