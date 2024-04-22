import { LoggingService } from "../types/loggingService";
import { ExternalLogger } from "../types/externalLogger";

export const createLoggingService = (logger: ExternalLogger): LoggingService => {
    return {
      log: (message: string) => logger.info(message),
      debug: (message: string) => logger.debug(message),
      error: (message: string, error?: Error) => logger.error(message, error),
      info: (message: string) => logger.info(message),
      warn: (message: string) => logger.warn(message),
    };
  }
  