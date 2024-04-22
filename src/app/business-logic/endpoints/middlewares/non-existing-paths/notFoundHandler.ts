import { Context } from '../../../../domain/types/context/context';
import { isBasicRequest, isBasicResponse } from '../../../../../services/server';
import { NotFoundError } from '../errors';

export const initNotFoundHandler = (context: Context) => {
  return (req: unknown, res: unknown, _next): void => {
    try {
      if (!isBasicRequest(req) || !isBasicResponse(res))
        throw new Error('Invalid request or response object');
      const error = new NotFoundError(
        `The requested resource '${req.path}' was not found.`
      );
      res.status(error.statusCode).send({
        error: error.name,
        message: error.message,
      });
    } catch (error) {
      context.services.logger.error(
        'An error occured while processing the response:',
        error
      );
      process.exit(1);
    }
  };
};
