import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidLoginException extends HttpException {
  public readonly message: string;

  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
