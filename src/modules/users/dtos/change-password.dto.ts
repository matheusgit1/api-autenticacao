import { IsString, MinLength } from 'class-validator';

export class ChangePasswordEntity {
  @IsString()
  @MinLength(5)
  password: string;
}
