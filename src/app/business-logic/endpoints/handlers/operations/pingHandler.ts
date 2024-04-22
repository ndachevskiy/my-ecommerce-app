import {
  BasicRequest,
  BasicResponse,
  NextFunction,
} from '../../../../../services/server';
import { Context } from '../../../../domain/types/context/context';

export const initPingHandler = (context: Context) => {
  return async (req: BasicRequest, res: BasicResponse, next: NextFunction) => {
    try {
      context.services.logger.info(
        `A request has hit the app (path: ${req.path}, method: ${req.method})`
      );

      res.json({ data: { response: 'pong' } });
    } catch (error) {
      next(error);
    }
  };
};
