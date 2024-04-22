import { CustomError } from './CustomError'

export class UnauthorizedError extends CustomError {
    constructor(message = 'Unauthorized') {
      super(message, 401, 'UnauthorizedError');
    }
  }

