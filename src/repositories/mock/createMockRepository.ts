import fs from 'fs/promises';
import path from 'path';
import {
  RepositoryMethods,
  FindByParams,
} from '../types/common/repository-methods/repositoryMethods';
import {
  Product,
  Customer,
  Order,
  Item,
} from '../types/common/repository-entitites';
import { getPredicate } from './utils/getPredicate';

export type EntityType = 'Product' | 'Customer' | 'Item' | 'Order';

export const createMockRepository = <
  T extends Product | Customer | Item | Order
>(
  type: EntityType
): RepositoryMethods<T> => {
  const filePath = path.join(
    __dirname,
    '../../assets/mock-data',
    `${type.toLowerCase()}s.json`
  );

  return {
    create: async (entity: T) => {
      try {
        const data = await fs.readFile(filePath, { encoding: 'utf8' });
        const entities = JSON.parse(data);
        entities.push(entity);
        await fs.writeFile(filePath, JSON.stringify(entities, null, 2));
        return entity;
      } catch (error) {
        throw new Error(`Error creating entity: ${error}`);
      }
    },

    createMany: async (entities: T[]) => {
      try {
        const data = await fs.readFile(filePath, { encoding: 'utf8' });
        const existingEntities = JSON.parse(data);
        const updatedEntities = existingEntities.concat(entities);
        await fs.writeFile(filePath, JSON.stringify(updatedEntities, null, 2));
        return entities;
      } catch (error) {
        throw new Error(`Error writing multiple entities: ${error}`);
      }
    },

    update: async (id, entity) => {
      try {
        const data = await fs.readFile(filePath, { encoding: 'utf8' });
        const entities = JSON.parse(data);
        const index = entities.findIndex((e: T) => e.id === id);
        if (index === -1) throw new Error('Entity not found');
        entities[index] = { ...entities[index], ...entity };
        await fs.writeFile(filePath, JSON.stringify(entities, null, 2));
        return entities[index] as T;
      } catch (error) {
        throw new Error(`Error updating entity with ID ${id}: ${error}`);
      }
    },

    delete: async (id) => {
      try {
        const data = await fs.readFile(filePath, { encoding: 'utf8' });
        const entities = JSON.parse(data);
        const filteredEntities = entities.filter((e: T) => e.id !== id);
        await fs.writeFile(filePath, JSON.stringify(filteredEntities, null, 2));
      } catch (error) {
        throw new Error(`Error deleting entity with ID ${id}: ${error}`);
      }
    },

    findByID: async (id) => {
      try {
        const data = await fs.readFile(filePath, { encoding: 'utf8' });
        const entities = JSON.parse(data);
        const filteredEntities = entities.filter((e: T) => e.id === id);
        return (filteredEntities.length > 0) ? filteredEntities[0] : null
      } catch (error) {
        throw new Error(`Error finding entity by ID ${id}: ${error}`);
      }
    },

    findByParams: async (params: FindByParams) => {
      try {
        const data = await fs.readFile(filePath, { encoding: 'utf8' });
        let entities = JSON.parse(data) as T[];

        // Filter
        if (params.filter) {
          const predicate = getPredicate(params.filter);
          entities = entities.filter(predicate);
        }

        // Sort
        if (params.sort) {
          const [sortField, sortOrder] = params.sort.split('_');
          entities.sort((a, b) => {
            return sortOrder === 'asc'
              ? a[sortField] > b[sortField]
                ? 1
                : -1
              : a[sortField] < b[sortField]
              ? 1
              : -1;
          });
        }

        // Pagination
        const page = parseInt(params.page) || 1;
        const limit = parseInt(params.limit) || entities.length;
        const startIndex = (page - 1) * limit;
        entities = entities.slice(startIndex, startIndex + limit);

        return entities;
      } catch (error) {
        throw new Error(`Error retrieving entities by parameters: ${error}`);
      }
    },
  };
};
