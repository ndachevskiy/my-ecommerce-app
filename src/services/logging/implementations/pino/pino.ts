import pino from 'pino';
import { ExternalLogger } from '../../types/externalLogger';

const pinoLogger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      translateTime: true,
      colorize: true,
      levelFirst: true,
      messageFormat: "{msg}"
    }
  }
});

export const adaptedPinoLogger: ExternalLogger = {
  info: (message) => pinoLogger.info(message),
  debug: (message) => pinoLogger.debug(message),
  error: (message, error) => pinoLogger.error({ err: error }, message),
  warn: (message) => pinoLogger.warn(message),
};

