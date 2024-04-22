import {
  createLoggingService,
  adaptedPinoLogger,
} from '../../../services/logging';
import {
  createServerService,
  createExpressServer,
} from '../../../services/server';
import { createAuthService,  createJWTAuthService } from '../../../services/auth'
import { Services } from '../types/services/services';
import { createValidationService, createZodValidationService, } from '../../../services/validation'

export const createServices = (): Services => {
  const server = createServerService(createExpressServer);
  const auth = createAuthService( createJWTAuthService)
  const logger = createLoggingService(adaptedPinoLogger);
  const validation = createValidationService(createZodValidationService)

  return {
    logger,
    server,
    auth,
    validation
  };
};
