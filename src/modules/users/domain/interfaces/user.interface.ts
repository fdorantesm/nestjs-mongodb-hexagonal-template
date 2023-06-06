import { Scope } from '../enums/scope.enum';
import { Profile } from './profile.interface';

export interface User {
  uuid: string;
  email: string;
  password: string;
  scopes: Scope[];
  profile?: Profile;
  isActive: boolean;
}
