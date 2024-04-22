export type ExternalLogger = {
    info: (message: string) => void;
    debug: (message: string) => void;
    error: (message: string, error?: Error) => void;
    warn: (message: string) => void;
  };
  