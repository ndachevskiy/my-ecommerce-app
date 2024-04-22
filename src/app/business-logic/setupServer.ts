import path from 'path';
import fs from 'fs';
import { Context } from '../domain/types/context/context';
import { HTTPVerb } from '../../services/server';
import {
  readProductsPath,
  readCustomersPath,
  readOrdersPath,
  readItemsPath,
  loginPath,
  createOrderPath,
  updateOrderPath,
  pingPath,
} from './endpoints/paths';
import {
  initGenericReadHandler,
  initLoginHandler,
  initCreateOrderHandler,
  initUpdateOrderHandler,
  initPingHandler,
} from './endpoints/handlers';
import {
  initRequestValidator,
  initErrorHandler,
  initNotFoundHandler,
  initAuthMiddleware,
} from './utils';
import { Config } from '../config/schemas';

export const setupServer = (context: Context, config: Config) => {
  try {
    const swaggerFilePath = path.join(__dirname, '../../assets/routes-specs/specs.json');
    const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, 'utf8'));

    const server = context.services.server;

    const genericReadHandler = initGenericReadHandler(context);
    const createOrderHandler = initCreateOrderHandler(context);
    const updateOrderHandler = initUpdateOrderHandler(context);
    const loginHandler = initLoginHandler(context, config);
    const pingHandler = initPingHandler(context);

    const errorHandler = initErrorHandler(context);
    const notFoundHandler = initNotFoundHandler(context);

    const requestValidator = initRequestValidator(context);
    const authMiddleware = initAuthMiddleware(context, config);

    // Generate docs
    server.generateDocs('/api/v1/docs', { swaggerDocument });

    // Product routes
    server.addRoute(
      HTTPVerb.GET,
      readProductsPath,
      [authMiddleware, requestValidator],
      genericReadHandler
    );

    // Customer routes
    server.addRoute(
      HTTPVerb.GET,
      readCustomersPath,
      [authMiddleware, requestValidator],
      genericReadHandler
    );

    // Order routes
    server.addRoute(
      HTTPVerb.GET,
      readOrdersPath,
      [authMiddleware, requestValidator],
      genericReadHandler
    );

    server.addRoute(
      HTTPVerb.POST,
      createOrderPath,
      [authMiddleware, requestValidator],
      createOrderHandler
    );

    server.addRoute(
      HTTPVerb.PATCH,
      updateOrderPath,
      [authMiddleware, requestValidator],
      updateOrderHandler
    );

    // Item routes
    server.addRoute(
      HTTPVerb.GET,
      readItemsPath,
      [authMiddleware, requestValidator],
      genericReadHandler
    );

    // Auth routes
    server.addRoute(HTTPVerb.POST, loginPath, [requestValidator], loginHandler);

    // Operations routes
    server.addRoute(HTTPVerb.GET, pingPath, [], pingHandler);

    server.addGlobalMiddleware(notFoundHandler);

    server.setErrorHandler(errorHandler);

    server.startServer(config.HttpServer.ServerPort);
  } catch (error) {
    context.services.logger.error(
      'There was an error during server setting up:',
      error
    );
  }
};
