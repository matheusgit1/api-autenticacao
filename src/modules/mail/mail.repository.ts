export interface MailRepositoy {
  sendMailWithConfirmationCode: (
    receiver: string,
    code: string,
  ) => Promise<void>;

  sendMailWithResetePasswordLink: (
    receiver: string,
    resetePasswordToken: string,
  ) => Promise<void>;
}
