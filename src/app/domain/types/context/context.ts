import { Repositories } from "../repositories/repositories";
import { Services } from "../services/services";

export type Context = {
    repositories: Repositories;
    services: Services;
  };
  