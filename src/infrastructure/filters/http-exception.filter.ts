import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  // ExecutionContext,
  HttpException,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { InvalidLoginException } from '../exceptions/invalid-login.exception';
import { InvalidUserException } from '../exceptions/invalid-user.exception';
import { VerifyAcountException } from '../exceptions/verify-acount.exception';
import { UnauthorizedException } from '../exceptions/unauthorized-exception';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger: Logger;
  // private context: string;
  constructor() {
    this.logger = new Logger(HttpExceptionFilter.name);
  }
  logStackTrace(exception: any, request: any) {
    if (request.uuid) {
      // this.context = request.uuid;
      this.logger.error(
        `[${request.uuid}] Requisicao processada com erro`,
        exception.stack,
      );
    } else {
      this.logger.error(`Requisicao processada com erro`, exception.stack);
    }
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    // const status = exception.getStatus();

    this.logStackTrace(exception, request);

    switch (exception.constructor) {
      case InvalidLoginException:
        return response.status(HttpStatus.NOT_FOUND).json({
          erro: exception.message ?? 'Not found',
        });
      case InvalidUserException:
        return response.status(HttpStatus.BAD_REQUEST).json({
          erro: exception.message ?? 'Bad request',
        });
      case VerifyAcountException:
        return response.status(HttpStatus.BAD_REQUEST).json({
          erro: exception.message ?? 'Bad request',
        });
      case UnauthorizedException:
        return response.status(HttpStatus.UNAUTHORIZED).json({
          erro: exception.message ?? 'Unauthorized',
        });
      default:
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          erro: exception.message ?? 'Bad request',
        });
    }
  }
}
