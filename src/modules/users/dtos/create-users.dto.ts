import { IsString, IsEmail, MinLength } from 'class-validator';
import { IsCPFOrCNPJ, IsPhone } from 'brazilian-class-validator';

export class CreateUserEntity {
  @IsString()
  readonly name: string;

  @IsString()
  @IsEmail()
  readonly email: string;

  @IsCPFOrCNPJ()
  readonly document: string;

  @IsString()
  @IsPhone()
  readonly phone: string;

  @IsString()
  @MinLength(5)
  readonly password: string;

  @IsString()
  @MinLength(5)
  readonly confirmPassword: string;
}
