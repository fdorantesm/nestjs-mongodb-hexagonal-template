import { Injectable } from '@nestjs/common';

import { ProfileEntity } from 'src/modules/users/domain/entities/profile.entity';
import { UsersService } from 'src/modules/users/infrastructure/database/services/users.service';

@Injectable()
export class UpdateUserProfileUseCase {
  constructor(private readonly usersService: UsersService) {}
  public async exec(userId: string, data: Partial<ProfileEntity>): Promise<void> {
    await this.usersService.updateProfile(userId, data);
  }
}
