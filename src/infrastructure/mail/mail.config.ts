import { ConfigService, ConfigModule } from '@nestjs/config';

export default class MailConfig {
  static getMailConfigs() {
    return {
      transport: {
        host: process.env.MAIL_HOST,
        port: +process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_AUTH_USER,
          pass: process.env.MAIL_AUTH_PASS,
        },
      },
    };
  }
}

export const MailConfigs = {
  imports: [ConfigModule],
  useFactory: async (): Promise<any> => MailConfig.getMailConfigs(),
  inject: [ConfigService],
};
