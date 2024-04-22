import 'dotenv/config'
import { ConfigSchema } from './schemas';

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
    SecretKey: process.env.JWT_SECRET,
    JWTExpiresIn: process.env.JWT_EXPIRES_IN,
  },
};

export const validateConfig = (configToValidate: typeof config) => {
  try {
    const validConfig = ConfigSchema.parse(configToValidate);
    console.log('Environmental variables successfully loaded');
    return validConfig;
  } catch (error) {
    console.error('Error during loading of environmental variables:', error);
    process.exit(1);
  }
};
