import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedException extends HttpException {
  public readonly message: string;

  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}
