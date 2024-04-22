import { CustomError } from './CustomError'

export class ForbiddenError extends CustomError {
    constructor(message = "Forbidden") {
      super(message, 403, "ForbiddenError");
    }
  }