import { createCustomerSchema } from './customers/createCustomer';
import { updateCustomerSchema } from './customers/updateCustomer';
import { loginCustomerSchema } from './auth/loginCustomer'
import { createProductSchema } from './products/createProduct';
import { updateProductSchema } from './products/updateProduct';
import { createOrderSchema } from './orders/createOrder';
import { updateOrderSchema } from './orders/updateOrder';

export const bodySchema = {
  products: {
    create: createProductSchema,
    update: updateProductSchema,
  },
  customers: {
    create: createCustomerSchema,
    update: updateCustomerSchema,
  },
  orders: {
    create: createOrderSchema,
    update: updateOrderSchema,
  },
  auth: {
    login: loginCustomerSchema,
  },
};
