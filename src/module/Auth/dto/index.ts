import {
  IsNotEmpty,
  IsString,
  Matches,
  IsEmail,
  IsEnum,
  MinLength,
  MaxLength,
} from 'class-validator';
import { EnumLevel, ConfirmEmail } from 'src/common';

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

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class ConfirmEmailDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  otp: string;
}

export class ForgetPassDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class ResetPassDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,20}$/, {
    message:
      'Password too weak. It must contain uppercase, lowercase, number, special character, and be at least 8 characters long.',
  })
  NewPass: string;

  @IsString()
  @IsNotEmpty()
  @ConfirmEmail({
    message: 'New password must match the confirmation password.',
  })
  ConfirmNewPass: string;
}

export class ResendOTPDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}
