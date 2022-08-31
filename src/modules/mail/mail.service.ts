import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { MailRepositoy } from './mail.repository';
@Injectable()
export class MailService implements MailRepositoy {
  private logger = new Logger(MailService.name);
  constructor(private readonly mailerService: MailerService) {}

  public async sendMailWithConfirmationCode(
    receiver: string,
    code: string,
  ): Promise<void> {
    try {
      await this.mailerService
        .sendMail({
          to: receiver, // list of receivers
          from: 'noreply@nestjs.com', // sender address
          subject: 'Código de verificação ✔', // Subject line
          text: `seu código de verificação: ${code}`, // plaintext body
          html: `<p>seu código de verificação: ${code}</p>`, // HTML body content
        })
        .then((values) => {
          this.logger.log(
            `[sendMailWithConfirmationCode] Método retornou sucesso : ${JSON.stringify(
              values,
            )}`,
          );
          return values;
        })
        .catch((error) => {
          this.logger.error(
            `[sendMailWithConfirmationCode] Método retornou erros : ${JSON.stringify(
              error,
            )}`,
          );
          throw error;
        });
    } catch (error: any) {
      throw error;
    }
  }

  public async sendMailWithResetePasswordLink(
    receiver: string,
    resetePasswordToken: string,
  ): Promise<void> {
    try {
      await this.mailerService
        .sendMail({
          to: receiver, // list of receivers
          from: 'noreply@nestjs.com', // sender address
          subject: 'Link de recuperação de senha ✔', // Subject line
          text: `seu link de recuperação de senha é: link/${resetePasswordToken}`, // plaintext body
          html: `<p>seu link de recuperação de senha é: <a>http://127.0.0.1:5173/troca-de-senha/${resetePasswordToken}</a></p>`, // HTML body content
        })
        .then((values) => {
          this.logger.log(
            `[sendMailWithResetePasswordLink] Método retornou sucesso : ${JSON.stringify(
              values,
            )}`,
          );
          return values;
        })
        .catch((error) => {
          this.logger.error(
            `[sendMailWithConfirmationCode] Método retornou erros : ${JSON.stringify(
              error,
            )}`,
          );
          throw error;
        });
    } catch (error: any) {
      throw error;
    }
  }
}
