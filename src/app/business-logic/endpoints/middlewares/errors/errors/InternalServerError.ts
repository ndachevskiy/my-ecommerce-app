import { CustomError } from './CustomError'

export class InternalServerError extends CustomError {
    constructor(message = "Internal Server Error") {
      super(message, 500, "InternalServerError");
    }
  }