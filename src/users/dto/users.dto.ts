import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  readonly name: string;

  @ApiProperty()
  @MinLength(6)
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @IsIn(['ADMIN_ROLE', 'USER_ROLE'])
  readonly rol: string;
}
