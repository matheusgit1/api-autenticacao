import { IsString } from 'class-validator';

export class validateAcountEntity {
  @IsString()
  email: string;
  @IsString()
  verifyCode: string;
}
