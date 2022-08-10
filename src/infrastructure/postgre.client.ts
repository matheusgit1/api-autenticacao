import {
  TypeOrmModuleOptions,
  TypeOrmModuleAsyncOptions,
} from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { UsersEntity } from './orm/entities/users.entity';

export default class TypeORMConfig {
  static getORMConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      synchronize: Boolean(process.env.DB_SYNCHRONIZE),
      entities: [UsersEntity],
    };
  }
}

export const DBClientConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (): Promise<TypeOrmModuleOptions> =>
    TypeORMConfig.getORMConfig(),
  inject: [ConfigService],
};
