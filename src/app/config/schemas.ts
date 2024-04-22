import { z } from 'zod';

const AppSchema = z.object({
  NodeEnv: z.string(),
})

const APISchema = z.object({
  Prefix: z.literal('api'),
  Version: z.string(),
  Resources: z.object({
    Products: z.literal('products'),
    Customers: z.literal('customers'),
    Orders: z.literal('orders'),
    Items: z.literal('items'),
    Auth: z.literal('auth'),
    Operations: z.literal('operations')
  })
});

const HttpServerSchema = z.object({
  ServerPort: z.number(),
});

const AuthSchema = z.object({
  SecretKey: z.string(),
  JWTExpiresIn: z.string(),
});

export const ConfigSchema = z.object({
  App: AppSchema,
  API: APISchema,
  HttpServer: HttpServerSchema,
  Auth: AuthSchema,
});

export type Config = z.infer<typeof ConfigSchema>;