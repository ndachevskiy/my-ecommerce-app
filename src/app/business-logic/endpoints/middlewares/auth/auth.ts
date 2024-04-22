import {
  BasicRequest,
  BasicResponse,
  NextFunction,
} from '../../../../../services/server';
import { UnauthorizedError } from '../errors'
import { Context } from '../../../../domain/types/context/context';
import { Config } from '../../../../config/schemas';

export const initAuthMiddleware = (context: Context, config: Config) => {
  return async (req: BasicRequest, res: BasicResponse, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedError('No token provided');
      }

      const token = authHeader.split(' ')[1];
      const payload = context.services.auth.verifyAuth(
        token,
        config.Auth.SecretKey
      );

      if (payload.error) {
        throw new UnauthorizedError(payload.error);
      }
      res.locals.userID = payload.subject;
      next();
    } catch (error) {
      next(error);
    }
  };
};
