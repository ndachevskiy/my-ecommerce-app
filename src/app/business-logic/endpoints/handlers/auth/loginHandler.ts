import crypto from 'crypto';
import {
  BasicRequest,
  BasicResponse,
  NextFunction,
} from '../../../../../services/server';
import { UnauthorizedError } from '../../middlewares/errors';
import { Context } from '../../../../domain/types/context/context';
import { Config } from '../../../../config/schemas';

export const initLoginHandler = (context: Context, config: Config) => {
  return async (req: BasicRequest, res: BasicResponse, next: NextFunction) => {
    try {
      context.services.logger.info(`A request has hit the app (path: ${req.path}, method: ${req.method})`);

      const { email, password } = res.locals.body;
      const hashedPassword = crypto
        .createHash('sha256')
        .update(password)
        .digest('hex');

      const filter = `email=${email};password=${hashedPassword}`;
      const customers = await context.repositories.customerRepository.findByParams({
        filter
      });

      if (customers.length === 0) {
        throw new UnauthorizedError(
          'Authentication failed: No customer with provided email found or password does not match.'
        );
      }

      const user = customers[0];
      const token = context.services.auth.generateAuth(
        { subject: user.id },
        { secret: config.Auth.SecretKey, expiresIn: config.Auth.JWTExpiresIn }
      );

      res.json({ data: {authToken: token} });
    } catch (error) {
      next(error)
    }
  };
};
