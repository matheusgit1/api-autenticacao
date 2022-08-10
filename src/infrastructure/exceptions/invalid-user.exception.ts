import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidUserException extends HttpException {
  public readonly message: string;

  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
