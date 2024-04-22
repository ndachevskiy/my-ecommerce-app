import express, {
  Request,
  Response,
  NextFunction,
  Application,
  RequestHandler,
} from 'express';
import swaggerUi from 'swagger-ui-express';
import { ServerService, HttpMethod, httpVerbs } from '../../types/server';

export const createExpressServer = (): ServerService => {
  const app: Application = express();

  app.use(express.json())

  return {
    startServer: (port: number): void => {
      app.listen(port, () => console.log(`Server running on port ${port}`));
    },

    stopServer: (): void => {
      console.log('Stopping server is not directly supported by Express');
    },

    addRoute: (
      method: HttpMethod,
      path: string,
      middlewares: RequestHandler[],
      handler: RequestHandler
    ): void => {
      if (httpVerbs.includes(method)) {
        app[method.toLowerCase()](path, ...middlewares, handler);
      } else {
        throw new Error(`HTTP method ${method} is not supported.`);
      }
    },

    addGlobalMiddleware: (middleware: RequestHandler): void => {
      app.use(middleware);
    },

    setErrorHandler: (
      handler: (
        err?: any,
        req?: Request,
        res?: Response,
        next?: NextFunction
      ) => void
    ): void => {
      app.use((err: any, req: Request, res: Response, next: NextFunction) =>
        handler(err, req, res, next)
      );
    },

    getServerInstance: (): Application => {
      return app;
    },

    generateDocs: (path: string, setup: any): void => {
      const swaggerDocument = setup.swaggerDocument;
      if (!swaggerDocument) {
        console.error('Swagger document must be provided');
        return;
      }
      app.use(path, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }
  };
};
