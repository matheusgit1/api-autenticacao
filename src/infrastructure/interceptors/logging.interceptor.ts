import {
  CallHandler,
  Logger,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GenerateRamdomString } from '../../common';

export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    const uuid = new GenerateRamdomString().generateUUID();
    request.uuid = uuid;

    const metodo = `${context.getClass().name}.${context.getHandler().name}`;
    this.logger.log(`[${uuid}] Executando método.`, metodo);
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() =>
          this.logger.log(
            `[${uuid}] Método executado em ${Date.now() - now} ms.`,
            metodo,
          ),
        ),
      );
  }
}
