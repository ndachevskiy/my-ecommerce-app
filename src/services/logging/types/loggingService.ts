export type LoggingService = {
    log: (message: string) => void;
    debug: (message: string) => void;
    error: (message: string, error?: Error) => void;
    info: (message: string) => void;
    warn: (message: string) => void;
  };
  