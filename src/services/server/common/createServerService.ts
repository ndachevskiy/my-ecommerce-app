import { ServerService } from '../types/server';

export const createServerService = (
  createImplementationFunction: () => ServerService
): ServerService => {
  const serverImplementation = createImplementationFunction();
  return serverImplementation;
};
