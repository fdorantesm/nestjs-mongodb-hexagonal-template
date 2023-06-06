import { Entity } from 'src/core/domain/entity';
import { Profile } from '../interfaces/profile.interface';

export class ProfileEntity implements Entity<Profile> {
  private _name: string;
  private _phone: string;

  constructor(profile: Profile) {
    this._name = profile.name;
    this._phone = profile.phone;
  }

  public static create(profile: Profile) {
    return new ProfileEntity(profile);
  }

  public get name() {
    return this._name;
  }

  public get phone() {
    return this._phone;
  }

  public toObject(): Profile {
    return {
      name: this._name,
      phone: this._phone,
    };
  }

  public toJson(): Profile {
    return {
      name: this._name,
      phone: this._phone,
    };
  }
}
