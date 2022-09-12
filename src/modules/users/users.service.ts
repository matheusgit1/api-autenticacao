import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserEntity } from './dtos/create-users.dto';
import { UsersEntity } from '../../infrastructure/orm/entities/users.entity';
import { ResponseBody } from './entities/response-body.entity';
import { createTransaction, GenerateRamdomString } from '../../common';
import { MailService } from '../mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import { UsersRespository } from './users.repository';
import { InvalidUserException } from '../../infrastructure/exceptions/invalid-user.exception';
import { VerifyAcountException } from '../../infrastructure/exceptions/verify-acount.exception';
import { UnauthorizedException } from '../../infrastructure/exceptions/unauthorized-exception';
import { ORMService } from '../../infrastructure/orm/orm.service';
import * as bcript from 'bcrypt';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService implements UsersRespository {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    private readonly mailService: MailService,
    private jwtService: JwtService,
    private readonly ormService: ORMService, // private readonly authService: AuthService
  ) {}

  async createUser(body: CreateUserEntity): Promise<any> {
    try {
      const transaction = createTransaction();
      const momentTransaction = new Date();
      this.logger.log(`[createUser] - ${transaction}`);
      if (body.confirmPassword != body.password) {
        throw new InvalidUserException('Senhas não batem');
      }
      const verifyCode = new GenerateRamdomString(6, {
        limits: '1234567890',
      }).getRamdonString();
      await this.ormService.createOne({
        ...body,
        verifyCode: verifyCode,
      });
      await this.mailService.sendMailWithConfirmationCode(
        body.email,
        verifyCode,
      );
      return {
        mensagem: 'E-mail cadastrado com sucesso. Verifique seu email!',
      };
    } catch (error: any) {
      if (error.driverError?.detail.includes('already exists')) {
        throw new InvalidUserException('Esse email já é registrado');
      }
      throw error;
    }
  }

  async findOne(email: string): Promise<UsersEntity> {
    try {
      const user = await this.ormService.findOneByEmail(email);
      return user;
    } catch (error: any) {
      throw error;
    }
  }

  async validateUser(email: string, verifyCode: string): Promise<any> {
    try {
      const transaction = createTransaction();
      const momentTransaction = new Date();
      const user = await this.findOne(email);
      if (user.isVerified) {
        throw new VerifyAcountException('Essa conta já foi verificada');
      }

      if (user.verifyCodeExpireIn < new Date()) {
        throw new VerifyAcountException(
          'Código de verificação expirou. Peça outro!',
        );
      }

      if (user.verifyCode != verifyCode) {
        throw new VerifyAcountException('Código de verificação inválido!');
      }

      await this.ormService.updateOne({ isVerified: true }, 'email = :email', {
        email: email,
      });

      return {
        mensagem: 'Email foi verificado com sucesso',
      };
    } catch (error: any) {
      throw error;
    }
  }

  async resentVerifyCode(email: string): Promise<any> {
    try {
      const transaction = createTransaction();
      const momentTransaction = new Date();
      const verifyCode = new GenerateRamdomString(6, {
        limits: '1234567890',
      }).getRamdonString();

      const user = await this.findOne(email);
      if (user && user.isVerified) {
        throw new VerifyAcountException('Esse email já foi verificado!');
      }

      await this.ormService.updateOne(
        {
          verifyCode: verifyCode,
          verifyCodeExpireIn: new Date(
            new Date().setHours(new Date().getHours() + 1),
          ),
        },
        'email = :email',
        { email: email },
      );

      await this.mailService.sendMailWithConfirmationCode(email, verifyCode);

      return {
        mensagem: 'Novo código de verificação foi enviado para seu email',
      };
    } catch (error: any) {
      throw error;
    }
  }

  async resetPassword(email: string): Promise<any> {
    try {
      const transaction = createTransaction();
      const momentTransaction = new Date();
      const user = await this.findOne(email);
      if (!user) {
        this.logger.error('E-mail inválido');
        throw new InvalidUserException('E-mail inválido');
      }
      const resetePasswordToken = new GenerateRamdomString(20, {
        limits:
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
      }).getRamdonString();

      await this.ormService.updateOne(
        {
          resetePasswordToken: resetePasswordToken,
          resetePasswordTokenExpireIn: new Date(
            new Date().setHours(new Date().getHours() + 1),
          ),
        },
        'email = :email',
        { email: email },
      );

      await this.mailService.sendMailWithResetePasswordLink(
        email,
        resetePasswordToken,
      );

      return {
        mensagem: 'Link de recuperação de senha enviada para seu email',
      };
    } catch (error: any) {
      throw error;
    }
  }

  async changePasswordWithoutLogin(
    email: string,
    password: string,
    confirmPassword: string,
    token: string,
  ): Promise<ResponseBody> {
    try {
      const transaction = createTransaction();
      const momentTransaction = new Date();
      const user = await this.findOne(email);
      if (!user) {
        throw new InvalidUserException('usuario não encontrado!');
      }

      if (user.resetePasswordToken !== token) {
        throw new UnauthorizedException('token inválido!');
      }

      if (user.resetePasswordTokenExpireIn < new Date()) {
        throw new UnauthorizedException('token expirado. peça um novo link');
      }

      if (password !== confirmPassword) {
        throw new UnauthorizedException('senhas não batem');
      }
      const newPassword = bcript.hashSync(password, +process.env.GEN_SALT);
      await this.ormService.updateOne(
        {
          resetePasswordToken: null,
          resetePasswordTokenExpireIn: null,
          password: newPassword,
        },
        'email = :email',
        { email: email },
      );

      return {
        transacao: {
          co_transacao_local: transaction,
          dt_transacao_local: momentTransaction,
        },
        mensagem: 'Senha alterada com sucesso',
      };
    } catch (error: any) {
      throw error;
    }
  }

  async changePasswordWithLogin(
    password: string,
    jwt: string,
  ): Promise<ResponseBody> {
    try {
      const transaction = createTransaction();
      const momentTransaction = new Date();
      if (!password) {
        throw new UnauthorizedException('uma senha é esperada');
      }

      const user = this.jwtService.decode(jwt.split(' ')[1], {
        complete: false,
      }) as { email: string; id: string };
      const newPassword = bcript.hashSync(password, +process.env.GEN_SALT);
      await this.ormService.updateOne({ password: newPassword }, 'id = :id', {
        id: user.id,
      });

      return {
        transacao: {
          co_transacao_local: transaction,
          dt_transacao_local: momentTransaction,
        },
        dado: user,
        mensagem: 'Senha alterada com sucesso',
      };
    } catch (error: any) {
      throw error;
    }
  }

  public async getProfile(jwt: string) {
    const user = await this.jwtService.verifyAsync(jwt.split(' ')[1], {
      secret: process.env.JWT_SECRET,
    });

    const userProfile = await this.ormService.getUserProfile(user.id);
    return userProfile;
  }
}
