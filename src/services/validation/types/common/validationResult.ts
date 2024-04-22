export type ValidationResult = {
    isValid: boolean;
    parsedResults?: Record<string, unknown>;
    errors?: string[];
  };