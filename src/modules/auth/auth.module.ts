import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '../../infrastructure/orm/entities/users.entity';
import { PassportModule } from '@nestjs/passport';
import { AuthStrategy } from './auth.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../infrastructure/jwt/jwt.strategy';
import { ServiceMiddleware } from '../../infrastructure/middleware/service.middleware';
// import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([UsersEntity]),
    PassportModule,
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  providers: [
    AuthService,
    ServiceMiddleware,
    UsersService,
    AuthStrategy,
    JwtStrategy,
  ],
  exports: [AuthService, ServiceMiddleware, UsersService],
})
export class AuthModule {}
