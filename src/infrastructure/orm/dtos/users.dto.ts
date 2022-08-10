export interface UsersDto {
  id?: string;

  name?: string;

  email?: string;

  phone?: string;

  document?: string;

  password?: string;

  resetePasswordToken?: string;

  resetePasswordTokenExpireIn?: Date;

  createdAt?: Date;

  updatedAt?: Date;

  isVerified?: boolean;

  verifyCode?: string;

  verifyCodeExpireIn?: Date;

  hashInsertPassword?: () => void;
}
