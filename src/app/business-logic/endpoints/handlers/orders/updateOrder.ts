import { v4 as uuidv4 } from 'uuid';
import {
  BasicRequest,
  BasicResponse,
  NextFunction,
} from '../../../../../services/server';
import { Context } from '../../../../domain/types/context/context';
import { NotFoundError } from '../../middlewares/errors';
import { mapToHypermediaResponseFormat } from '../../../utils/index';
import { checkMissingProductIDs } from '../../../utils/index';

export const initUpdateOrderHandler = (context: Context) => {
  return async (req: BasicRequest, res: BasicResponse, next: NextFunction) => {
    try {
      context.services.logger.info(
        `A request has hit the app (path: ${req.path}, method: ${req.method})`
      );
  
      const orderId = res.locals.params.id;
      const { status, items } = res.locals.body;

      const existingOrder = await context.repositories.orderRepository.findByID(
        orderId
      );
      if (!existingOrder) {
        throw new NotFoundError(`Order with ID ${orderId} not found`);
      }

      let itemsIds = existingOrder.itemsIds;

      if (items && items.length) {
        const productIds = items.map((item) => item.productId);
        const missingIds = await checkMissingProductIDs(productIds, context);
        if (missingIds.length > 0) {
          throw new NotFoundError(
            `Products with IDs [${missingIds.join(', ')}] not found`
          );
        }

        const newItems = items.map((item) => ({
          id: uuidv4(),
          productId: item.productId,
          quantity: item.quantity,
          orderId: orderId,
        }));
        const createdItems =
          await context.repositories.itemRepository.createMany(newItems);
        itemsIds = createdItems.map((item) => item.id);
      }

      const updateData = { ...(status && { status }), itemsIds };
      const updatedOrder = await context.repositories.orderRepository.update(
        orderId,
        updateData
      );

      const mappedResponse = mapToHypermediaResponseFormat(updatedOrder as any);
      res.status(200).json(mappedResponse);
    } catch (error) {
      next(error);
    }
  };
};
