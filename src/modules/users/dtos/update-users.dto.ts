import { IsString } from 'class-validator';

export class UpdateUserEntity {
  @IsString()
  readonly name?: string;
  @IsString()
  readonly email?: string;
  @IsString()
  readonly document?: string;
  @IsString()
  readonly phone?: string;
  @IsString()
  readonly password?: string;
  @IsString()
  readonly confirmPassword?: string;
}
