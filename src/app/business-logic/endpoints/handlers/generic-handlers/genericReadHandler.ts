import {
  BasicRequest,
  BasicResponse,
  NextFunction,
} from '../../../../../services/server';
import { Context } from '../../../../domain/types/context/context';
import { NotFoundError } from '../../middlewares/errors';
import { mapEntityToRepository } from '../../../utils';
import { mapToHypermediaResponseFormat } from '../../../utils';

export const initGenericReadHandler = (context: Context) => {
  return async (req: BasicRequest, res: BasicResponse, next: NextFunction) => {
    try {
      context.services.logger.info(
        `A request has hit the app (path: ${req.path}, method: ${req.method})`
      );

      const repository =
        context.repositories[mapEntityToRepository(res.locals.resourceName)];

      if (!repository) throw new Error('Repository not found');

      const { id } = res.locals.params;
      const { sort, page = 1, limit = 10, ids, ...filters } = res.locals.query;

      const paramsForRepository = {
        sort,
        page,
        limit,
        ...filters,
      };

      const repositoryResult =
        id || ids
          ? await repository.findByID(id)
          : await repository.findByParams(paramsForRepository);

      if (
        !repositoryResult ||
        (Array.isArray(repositoryResult) && repositoryResult.length === 0)
      )
        throw new NotFoundError(
          'Resource(s) with provided parameters not found'
        );

      const mappedResponse = mapToHypermediaResponseFormat(
        repositoryResult as any
      );

      res.json(mappedResponse);
    } catch (error) {
      next(error);
    }
  };
};
