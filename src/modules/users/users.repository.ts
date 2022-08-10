import { CreateUserEntity } from './dtos/create-users.dto';
import { ResponseBody } from './entities/response-body.entity';
import { UsersEntity } from '../../infrastructure/orm/entities/users.entity';

export interface UsersRespository {
  createUser: (body: CreateUserEntity) => Promise<ResponseBody>;
  findOne: (email: string) => Promise<UsersEntity>;
  validateUser: (email: string, verifyCode: string) => Promise<ResponseBody>;
  resentVerifyCode: (email: string) => Promise<ResponseBody>;
  resetPassword: (email: string) => Promise<ResponseBody>;
  changePasswordWithoutLogin: (
    email: string,
    password: string,
    confirmPassword: string,
    token: string,
  ) => Promise<ResponseBody>;
  changePasswordWithLogin: (
    password: string,
    jwt: string,
  ) => Promise<ResponseBody>;
}
