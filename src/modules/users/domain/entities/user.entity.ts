import { Entity } from 'src/core/domain/entity';
import { Scope } from '../enums/scope.enum';
import { User } from '../interfaces/user.interface';
import { ProfileEntity } from './profile.entity';

export class UserEntity implements Entity<User> {
  private _uuid: string;
  private _email: string;
  private _password: string;
  private _scopes: Scope[];
  private _profile?: ProfileEntity;
  private _isActive: boolean;

  private constructor(user: User | Partial<User>) {
    this._uuid = user.uuid;
    this._email = user.email;
    this._password = user.password;
    this._scopes = user.scopes;
    this._profile = user.profile && ProfileEntity.create(user.profile);
    this._isActive = user.isActive;
  }

  public static create(user: User | Partial<User>): UserEntity {
    return new UserEntity(user);
  }

  public get uuid() {
    return this._uuid;
  }

  public get email() {
    return this._email;
  }

  public get password() {
    return this._password;
  }

  public get scopes() {
    return this._scopes;
  }

  public get profile() {
    return this._profile;
  }

  public get isActive() {
    return this._isActive;
  }

  public toObject(): User {
    return {
      uuid: this._uuid,
      email: this._email,
      password: undefined,
      scopes: this._scopes,
      profile: this._profile && this._profile.toObject(),
      isActive: this._isActive,
    };
  }

  public toJson(): Partial<User> {
    return {
      uuid: this._uuid,
      email: this._email,
      password: undefined,
      scopes: this._scopes,
      profile: this._profile && this._profile.toJson(),
      isActive: this._isActive,
    };
  }
}
