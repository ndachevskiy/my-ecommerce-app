import 'dotenv/config';

export const config = {
  App: {
    NodeEnv: process.env.NODE_ENV || 'development',
  },
  API: {
    Prefix: 'api',
    Version: 'v1',
    Resources: {
      Products: 'products',
      Customers: 'customers',
      Orders: 'orders',
      Items: 'items',
      Auth: 'auth',
      Operations: 'operations'
    }
  },
  HttpServer: {
    ServerPort: parseInt(process.env.SERVER_PORT || '3000', 10),
  },
  Auth: {
    SecretKey: process.env.JWT_SECRET || 'default-secret',
    JWTExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
  },
};

