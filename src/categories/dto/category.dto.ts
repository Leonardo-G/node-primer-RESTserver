import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateCategoryDTO {
  @MinLength(3)
  @IsNotEmpty()
  name: string;
}
