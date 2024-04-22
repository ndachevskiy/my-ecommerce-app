import { ValidationResult } from "./validationResult";
import { ValidationData } from "./validationData";

export type ValidationService = {
    validateBody: (data: ValidationData, resource?: string, method?: string) => ValidationResult;
    validateHeaders: (data: ValidationData) => ValidationResult;
    validateParams: (data: ValidationData) => ValidationResult;
    validateQuery: (data: ValidationData) => ValidationResult;
  };