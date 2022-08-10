import { HttpException, HttpStatus } from '@nestjs/common';

export class VerifyAcountException extends HttpException {
  public readonly message: string;

  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
