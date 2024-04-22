import { CustomError } from './CustomError'

export class ConflictError extends CustomError {
    constructor(message = "Conflict") {
      super(message, 409, "ConflictError");
    }
  }