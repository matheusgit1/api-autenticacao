import { IsString, IsEmail } from 'class-validator';

export class ResentVerifyCodeEntity {
  @IsString()
  @IsEmail()
  email: string;
}
