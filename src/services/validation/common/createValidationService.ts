import { ValidationService } from "../types/common/validationService";

export const createValidationService = (
  createImplementationFunction: () => ValidationService
): ValidationService => {
  const authServiceImplementation = createImplementationFunction();
  return authServiceImplementation;
};
