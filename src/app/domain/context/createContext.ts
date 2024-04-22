import { createRepositories } from "../repositories/createRepositories";
import { createServices } from "../services/createServices";
import { Context } from "../types/context/context";

export const createContext = async (): Promise<Context> => {
    const repositories = createRepositories();
    const services = createServices();
  
    return { repositories, services };
  };
  