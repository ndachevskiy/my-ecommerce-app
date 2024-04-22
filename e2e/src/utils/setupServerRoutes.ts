import { Context } from "../../../src/app/domain/types/context/context"
import { HTTPVerb } from 'src/services/server';
import { initAuthMiddleware, initRequestValidator } from "src/app/business-logic/utils";
import { initCreateOrderHandler, initUpdateOrderHandler } from "src/app/business-logic/endpoints/handlers";
import { Config } from "src/app/config/schemas";

export function setupServerRoutes(context: Context, config: Config) {
    const createOrderHandler = initCreateOrderHandler(context);
    const updateOrderHandler = initUpdateOrderHandler(context)

    const requestValidator = initRequestValidator(context);
    const authMiddleware = initAuthMiddleware(context, config);

    context.services.server.addRoute(
      HTTPVerb.POST,
      '/api/v1/orders',
      [authMiddleware, requestValidator],
      createOrderHandler
    );

    context.services.server.addRoute(
        HTTPVerb.PATCH,
        '/api/v1/orders/:id?',
        [authMiddleware, requestValidator],
        updateOrderHandler
      );
  }