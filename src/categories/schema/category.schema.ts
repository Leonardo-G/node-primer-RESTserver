import { Prop, SchemaFactory, Schema as SchemaNest } from '@nestjs/mongoose';
import { HydratedDocument, Schema } from 'mongoose';
import { User } from 'src/users/schema/user.schema';

export type CategoryDocument = HydratedDocument<Category>;

@SchemaNest()
export class Category {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  name: string;

  @Prop({
    type: Boolean,
    default: true,
    required: true,
  })
  status: boolean;

  @Prop({
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  user: User;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
