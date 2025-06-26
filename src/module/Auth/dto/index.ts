import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Matches,
  IsEmail,
  IsEnum,
  MinLength,
  MaxLength,
} from 'class-validator';
import { EnumLevel } from 'src/common';

export class UserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,20}$/, {
    message:
      'Password too weak. It must contain uppercase, lowercase, number, special character, and be at least 8 characters long.',
  })
  password: string;

  @IsNotEmpty()
  @IsEnum(EnumLevel)
  level: EnumLevel;
}
