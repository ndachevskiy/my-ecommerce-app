import { v4 as uuidv4 } from 'uuid';
import {
  BasicRequest,
  BasicResponse,
  NextFunction,
} from '../../../../../services/server';
import { OrderStatus } from '../../../../../repositories';
import { NotFoundError } from '../../middlewares/errors';
import { Context } from '../../../../domain/types/context/context';
import { checkMissingProductIDs } from '../../../utils/index';
import { mapToHypermediaResponseFormat } from '../../../utils/index';

export const initCreateOrderHandler = (context: Context) => {
  return async (req: BasicRequest, res: BasicResponse, next: NextFunction) => {
    try {
      context.services.logger.info(
        `A request has hit the app (path: ${req.path}, method: ${req.method})`
      );

      const orderId = uuidv4();
      const itemEntities = res.locals.body.items.map((item) => ({
        id: uuidv4(),
        quantity: item.quantity,
        productId: item.productId,
        orderId: orderId,
      }));

      const productIds = itemEntities.map((item) => item.productId);
      const missingIds = await checkMissingProductIDs(productIds, context);

      if (missingIds.length > 0) {
        throw new NotFoundError(
          `Unable to process. Products with IDs [${missingIds.join(
            ', '
          )}] not found`
        );
      }

      const items = await context.repositories.itemRepository.createMany(
        itemEntities
      );

      if (items.length === 0)
        throw new Error('Something went wrong during order creation');

      const order = {
        id: orderId,
        createTime: new Date().toISOString(),
        createdBy: res.locals.userID,
        status: OrderStatus.Pending,
        itemsIds: itemEntities.map((item) => item.id),
      };

      const repositoryResult =
        await context.repositories.orderRepository.create(order);

      const mappedResponse = mapToHypermediaResponseFormat(
        repositoryResult as any
      );

      res.status(201).json(mappedResponse);
    } catch (error) {
      next(error);
    }
  };
};
