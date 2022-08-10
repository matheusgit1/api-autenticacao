import {
  Injectable,
  NestMiddleware,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { createTransaction } from '../../common';

@Injectable()
export class ServiceMiddleware implements NestMiddleware {
  private readonly logger = new Logger(ServiceMiddleware.name);
  use(req: Request, res: Response, next: NextFunction) {
    const transaction = createTransaction();
    const momentTransaction = new Date();

    if (!req.headers.authorization) {
      throw new HttpException(
        {
          transacao: {
            co_transacao_local: transaction,
            dt_transacao_local: momentTransaction,
          },
          erro: 'Token inválido!',
        },
        400,
      );
    }

    const payload = req.headers?.authorization.replace('Bearer', '').trim();
    this.logger.debug(
      `[ServiceMiddleware] registrou o seguinte payload: ${JSON.stringify(
        payload,
      )}`,
    );
    next();
  }
}
