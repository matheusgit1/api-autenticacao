import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '../../infrastructure/orm/entities/users.entity';
import { ConfigModule } from '@nestjs/config';
import { MailService } from '../mail/mail.service';
import { JwtModule } from '@nestjs/jwt';
import { ORMService } from '../../infrastructure/orm/orm.service';
import { OrmModule } from '../../infrastructure/orm/orm.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([UsersEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
    OrmModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, MailService, ORMService],
  exports: [UsersService, MailService, ORMService],
})
export class UsersModule {}
