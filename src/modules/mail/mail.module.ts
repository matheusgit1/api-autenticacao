import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';
import { ConfigModule } from '@nestjs/config';
import { MailConfigs } from '../../infrastructure/mail/mail.config';

@Module({
  imports: [ConfigModule.forRoot(), MailerModule.forRootAsync(MailConfigs)],
  providers: [MailService],
})
export class MailModule {}
