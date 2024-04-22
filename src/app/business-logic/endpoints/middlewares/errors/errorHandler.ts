import { Context } from '../../../../domain/types/context/context';
import { BasicRequest, BasicResponse, NextFunction } from '../../../../../services/server';
import { CustomError } from './index';

export const initErrorHandler = (context: Context) => {
  return function errorHandler(
    err: Error,
    _req: BasicRequest,
    res: BasicResponse,
    _next: NextFunction
  ): void {
    try {
      context.services.logger.error('Sending the error to a client:', err);

      let errorStatusCode = err instanceof CustomError ? err.statusCode : 500;
      let errorName =
        err instanceof CustomError ? err.name : 'InternalServerError';
      let errorMessage =
        err instanceof CustomError
          ? err.message
          : 'An unknown error occured while processing you request';

      res.status(errorStatusCode).send({
        error: errorName,
        message: errorMessage,
      });
    } catch (error) {
      context.services.logger.error('An error occured while processing the response:', error);
      process.exit(1)
    }
  };
};
