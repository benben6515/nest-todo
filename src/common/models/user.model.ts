import {
  ModelDefinition,
  Prop,
  raw,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { Document } from 'mongoose';

import {
  USER_USERNAME_MAX_LENGTH,
  USER_USERNAME_MIN_LENGTH,
} from '../constants/user.const';
import { Role } from '../enums/role.enum';

export type UserDocument = User & Document;

@Schema({ versionKey: false })
export class User {
  @Prop({
    required: true,
    minlength: USER_USERNAME_MIN_LENGTH,
    maxlength: USER_USERNAME_MAX_LENGTH,
  })
  username: string;

  @Prop({
    required: true,
  })
  email: string;

  @Prop({
    required: true,
    type: raw({
      hash: String,
      salt: String,
    }),
  })
  password: { hash: string; salt: string };

  @Prop({
    required: true,
    enum: Role,
    default: Role.MEMBER,
  })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
export const USER_MODEL_TOKEN = User.name;
export const UserDefinition: ModelDefinition = {
  name: USER_MODEL_TOKEN,
  schema: UserSchema,
};
