import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Scope } from '../../../domain/enums/scope.enum';
import { CoreDocument } from 'src/core/infrastructure/models/document';

@Schema({
  collection: 'users',
  timestamps: true,
  autoIndex: true,
})
export class UserModel extends CoreDocument {
  @Prop({ type: String, unique: true })
  public email: string;

  @Prop({ type: String, select: false })
  public password: string;

  @Prop({ type: Array })
  public scopes: Scope[];

  @Prop({ type: Object })
  public profile?: {
    name: string;
    phone: string;
  };

  @Prop({ type: Boolean, required: true })
  public isActive: boolean;
}

const UserSchema = SchemaFactory.createForClass(UserModel);

export { UserSchema };
