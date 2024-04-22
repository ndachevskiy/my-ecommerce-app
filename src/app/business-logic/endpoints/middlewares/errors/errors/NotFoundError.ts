import { CustomError } from './CustomError'

export class NotFoundError extends CustomError {
    constructor(message = "Not Found") {
      super(message, 404, "NotFoundError");
    }
  }