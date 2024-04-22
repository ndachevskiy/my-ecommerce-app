import {
  ValidationService,
  ValidationResult,
  ValidationData,
} from '../../types/';
import {
  headersSchema,
  bodySchema,
  paramsSchema,
  querySchema,
} from './schemas';
import { HTTPVerb } from '../../../server';

export const createZodValidationService = (): ValidationService => {
  return {
    validateBody: (
      data: ValidationData,
      resourceName: string,
      method: HTTPVerb
    ): ValidationResult => {
      try {
        let schema;
        const [resource, operation] = resourceName.split('-');

        if (resource === 'auth') {
          schema = bodySchema[resource][operation];
        } else {
          const operation =
            method === HTTPVerb.POST
              ? 'create'
              : method === HTTPVerb.PATCH
              ? 'update'
              : undefined;

          if (
            !resource ||
            !operation ||
            !bodySchema[resource] ||
            !bodySchema[resource][operation]
          ) {
            throw new Error(
              `No schema available for this path and method: ${resource}, ${method}`
            );
          }

          schema = bodySchema[resource][operation];
        }

        const validationResult = schema.safeParse(data);

        // @ts-ignore
        if (!validationResult.success && validationResult.error) {
          // @ts-ignore
          const errorMessages = validationResult.error.issues.map(
            (issue) => issue.message
          );
          return {
            isValid: false,
            // @ts-ignore
            errors: errorMessages,
          };
        }

        return { isValid: true, parsedResults: validationResult.data };
      } catch (error) {
        console.error(
          'An unknown error occurred during request body validation',
          error
        );
      }
    },

    validateHeaders: (data: ValidationData): ValidationResult => {
      try {
        const validationResult = headersSchema.safeParse(data);

        // @ts-ignore
        if (!validationResult.success && validationResult.error) {
          // @ts-ignore
          return {
            isValid: false,
            // @ts-ignore
            errors: validationResult.error.flatten().fieldErrors,
          };
        }

        // @ts-ignore
        return { isValid: true, parsedResults: validationResult.data };
      } catch (error) {
        console.error(
          'An unknown error occured during request body validation',
          error
        );
      }
    },

    validateParams: (data: ValidationData): ValidationResult => {
      try {
        const validationResult = paramsSchema.safeParse(data);

        // @ts-ignore
        if (!validationResult.success && validationResult.error) {
          // @ts-ignore
          const errorMessages = validationResult.error.issues.map(
            (issue) => issue.message
          );
          return {
            isValid: false,
            // @ts-ignore
            errors: errorMessages,
          };
        }

        // @ts-ignore
        return { isValid: true, parsedResults: validationResult.data };
      } catch (error) {
        console.error(
          'An unknown error occured during request body validation',
          error
        );
      }
    },

    validateQuery: (data: ValidationData): ValidationResult => {
      try {
        const validationResult = querySchema.safeParse(data);

        // @ts-ignore
        if (!validationResult.success && validationResult.error) {
          // @ts-ignore
          const errorMessages = validationResult.error.issues.map(
            (issue) => issue.message
          );
          return {
            isValid: false,
            // @ts-ignore
            errors: errorMessages,
          };
        }

        // @ts-ignore
        return { isValid: true, parsedResults: validationResult.data };
      } catch (error) {
        console.error(
          'An unknown error occured during request body validation',
          error
        );
      }
    },
  };
};
