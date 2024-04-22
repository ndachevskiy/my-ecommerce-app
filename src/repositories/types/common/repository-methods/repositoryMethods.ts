export type FindByParams = { sort?: string, page?: string, limit?: string, [key: string]: any };

export type RepositoryMethods<T> = {
    create: (entity: T) => Promise<T>;
    createMany: (entities: T[]) => Promise<T[]>;
    update: (id: string, entity: Partial<T>) => Promise<T>;
    delete: (id: string) => Promise<void>;
    findByID: (id: string) => Promise<T>;
    findByParams: (params: FindByParams) => Promise<T[]>;
  };
  