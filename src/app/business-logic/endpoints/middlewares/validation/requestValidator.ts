import {
  BasicRequest,
  BasicResponse,
  NextFunction,
} from '../../../../../services/server';
import { HTTPVerb } from '../../../../../services/server';
import { BadRequestError } from '../errors';
import { Context } from '../../../../domain/types/context/context';

export const initRequestValidator = (context: Context) => {
  return (req: BasicRequest, res: BasicResponse, next: NextFunction) => {
    try {
      const pathParts = req.path.split('/');
      const resourceName = pathParts[3];
      const action = pathParts[4];
      
      res.locals.resourceName = resourceName === 'auth' ? `${resourceName}-${action}` : resourceName;

      const headersValidationResult =
        context.services.validation.validateHeaders(req.headers);

      if (!headersValidationResult.isValid) {
        JSON.stringify(headersValidationResult?.errors);
        throw new BadRequestError(
          headersValidationResult.errors
            ? `An error occured while validating the request headers: ${JSON.stringify(
                headersValidationResult.errors
              )}`
            : 'An unknown error during headers validation'
        );
      }

      res.locals.headers = headersValidationResult.parsedResults;

      if (req.method === HTTPVerb.GET || req.method === HTTPVerb.DELETE) {
        const paramsValidationResult =
          context.services.validation.validateParams(req.params);

        if (!paramsValidationResult.isValid)
          throw new BadRequestError(
            paramsValidationResult
              ? `An error occured while validating the request params: ${JSON.stringify(
                paramsValidationResult.errors
                )}`
              : 'An unknown error during params validation'
          );

        res.locals.params = paramsValidationResult.parsedResults;

        const queryValidationResult = context.services.validation.validateQuery(
          req.query
        );

        if (!queryValidationResult.isValid)
          throw new BadRequestError(
            queryValidationResult.errors
              ? `An error occured while validating the request query: ${JSON.stringify(
                queryValidationResult.errors
                )}`
              : 'An unknown error during query validation'
          );

        res.locals.query = queryValidationResult.parsedResults;

        return next();
      }

      if (req.method === HTTPVerb.POST || req.method === HTTPVerb.PATCH) {
        const paramsValidationResult =
          context.services.validation.validateParams(req.params);

        if (!paramsValidationResult.isValid)
          throw new BadRequestError(
            paramsValidationResult.errors
              ? `An error occured while validating the request params: ${JSON.stringify(
                paramsValidationResult.errors
                )}`
              : 'An unknown error during params validation'
          );

        res.locals.params = paramsValidationResult.parsedResults;

        const bodyValidationResult = context.services.validation.validateBody(
          req.body,
          res.locals.resourceName,
          req.method
        );

        if (!bodyValidationResult.isValid)
          throw new BadRequestError(
            bodyValidationResult.errors
              ? `An error occured while validating the request body: ${JSON.stringify(
                  bodyValidationResult.errors
                )}`
              : 'An unknown error during params validation'
          );
        
        res.locals.body = bodyValidationResult.parsedResults;
        return next();
      }

      throw new Error(`HTTP method is not supported: ${req.method}`);
    } catch (error) {
      next(error);
    }
  };
};
