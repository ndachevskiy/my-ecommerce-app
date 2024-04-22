export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export type ServerService = {
  startServer: (port: number) => void;
  stopServer: () => void;
  addRoute: (method: HttpMethod, path: string, middlewares: Function[], handler: Function) => void;
  addGlobalMiddleware: (middleware: Function) => void;
  setErrorHandler: (handler: Function) => void;
  addStaticFiles?: (path: string) => void;
  useCors?: (options?: any) => void;
  setViewEngine?: (engine: string, options?: any) => void;
  getServerInstance?: () => any;
  generateDocs?: (path: string, setup: any) => void;
};

export * from './enums/httpVerbs'
