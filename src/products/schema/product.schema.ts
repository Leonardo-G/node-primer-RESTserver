import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Category } from 'src/categories/schema/category.schema';
import { User } from 'src/users/schema/user.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  nombre: string;

  @Prop({
    type: Boolean,
    default: true,
  })
  status: boolean;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  user: User;

  @Prop({
    type: Number,
    default: 0,
  })
  price: number;

  @Prop({
    Type: Types.ObjectId,
    ref: 'Category',
    required: true,
  })
  category: Category;

  @Prop({
    type: String,
  })
  description: string;

  @Prop({
    type: Boolean,
    default: true,
  })
  available: boolean;

  @Prop({
    type: String,
  })
  img: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
