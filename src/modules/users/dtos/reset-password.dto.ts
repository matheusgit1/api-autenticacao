import { IsEmail } from 'class-validator';

export class ResetPasswordEntity {
  @IsEmail()
  email?: string;
}
