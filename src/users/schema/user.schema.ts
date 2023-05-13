import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

//Return MongoDB documents
export type UserDocument = HydratedDocument<User>;

//No need to extend it from Document as we are
//using HydratedDocument that already extends from Document
@Schema()
export class User {
  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({
    img: String,
  })
  img: string;

  @Prop({
    type: String,
    required: true,
    enum: ['ADMIN_ROLE', 'USER_ROLE'],
  })
  rol: string;

  @Prop({
    type: Boolean,
    default: true,
  })
  status: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  google: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
