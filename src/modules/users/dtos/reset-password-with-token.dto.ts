import { IsString, IsEmail, MinLength } from 'class-validator';

export class ResetPasswordWithTokenEntity {
  @IsString()
  @IsEmail()
  email?: string;
  @IsString()
  @MinLength(5)
  password?: string;
  @IsString()
  @MinLength(5)
  confirmPassword?: string;
}
