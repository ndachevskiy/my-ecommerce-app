import { ProductRepository, CustomerRepository, ItemRepository, OrderRepository } from "src/repositories/types/common/repository-types/repositoryTypes";

export type Repositories = {
    productRepository: ProductRepository;
    customerRepository: CustomerRepository;
    itemRepository: ItemRepository;
    orderRepository: OrderRepository;
  };
  