import {
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsInt()
  price: number;

  @IsMongoId()
  category: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  img: string;
}
