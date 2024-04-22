import { RepositoryMethods } from '../types/common/repository-methods/repositoryMethods';

export const exposeRepositoryMethods = <T>(
  createRepository: () => RepositoryMethods<T>
): RepositoryMethods<T> => {
  return createRepository();
};
