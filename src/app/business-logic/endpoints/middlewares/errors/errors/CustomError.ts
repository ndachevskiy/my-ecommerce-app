export class CustomError extends Error {
    statusCode: number;
    name: string;
  
    constructor(message: string, statusCode: number, name: string) {
      super(message);
      this.statusCode = statusCode;
      this.name = name;
      Object.setPrototypeOf(this, CustomError.prototype);
    }
  }