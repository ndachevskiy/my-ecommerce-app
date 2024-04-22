import { LoggingService } from "src/services/logging";
import { ServerService } from "src/services/server/types/server";
import { AuthService } from "src/services/auth/types";
import { ValidationService } from "src/services/validation/types";

export type Services = {
    logger: LoggingService;
    server: ServerService
    auth: AuthService
    validation: ValidationService
};