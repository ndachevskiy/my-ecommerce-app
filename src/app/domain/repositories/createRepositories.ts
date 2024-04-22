import {
  createMockRepository,
  exposeRepositoryMethods,
  Product,
  Customer,
  Item,
  Order,
} from '../../../repositories';
import { Repositories } from '../types/repositories/repositories';

export const createRepositories = (): Repositories => {
  const productRepository = exposeRepositoryMethods(() =>
    createMockRepository<Product>('Product')
  );
  const customerRepository = exposeRepositoryMethods(() =>
    createMockRepository<Customer>('Customer')
  );
  const itemRepository = exposeRepositoryMethods(() =>
    createMockRepository<Item>('Item')
  );
  const orderRepository = exposeRepositoryMethods(() =>
    createMockRepository<Order>('Order')
  );

  return {
    productRepository,
    customerRepository,
    itemRepository,
    orderRepository,
  };
};
