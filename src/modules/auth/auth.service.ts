import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersEntity } from '../../infrastructure/orm/entities/users.entity';
import { InvalidLoginException } from '../../infrastructure/exceptions/invalid-login.exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async validateUser(
    email: string,
    password: string,
  ): Promise<UsersEntity> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new InvalidLoginException('Usario não encontrado');
    } else if (!user.isVerified) {
      throw new InvalidLoginException('Email ainda não verificado!');
    } else if (user && !bcrypt.compareSync(password, user.password)) {
      throw new InvalidLoginException('Senha invalida!');
    } else if (user && bcrypt.compareSync(password, user.password)) {
      delete user.password;
      const payload = { email: user.email, username: user.name, id: user.id };
      const access_token = this.jwtService.sign(payload);
      
      const {
        resetePasswordToken,
        resetePasswordTokenExpireIn,
        verifyCode,
        verifyCodeExpireIn, document, ...rest
      } = user
      //@ts-ignore
      return { ...rest,  access_token: access_token };
    }
  }

  public async decryptJWT(jwt: string) {
    const payload = this.jwtService.verify(jwt, {
      secret: process.env.JWT_SECRET,
    });
    return payload;
  }
}
