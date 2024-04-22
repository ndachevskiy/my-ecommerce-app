import { RepositoryMethods } from "../repository-methods/repositoryMethods";
import { Product, Customer, Item, Order } from "../repository-entitites";

export type ProductRepository = RepositoryMethods<Product>;
export type CustomerRepository = RepositoryMethods<Customer>;
export type ItemRepository = RepositoryMethods<Item>;
export type OrderRepository = RepositoryMethods<Order>;

  