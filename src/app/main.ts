import { validateConfig, config } from './config/config';
import { setupServer } from './business-logic/setupServer';
import { createContext } from './domain/context/createContext';

const main = async () => {
  try {
    const validatedConfig = validateConfig(config);
    const context = await createContext();
    setupServer(context, validatedConfig);
  } catch (error) {
    console.error('There was an error during application start:', error);
  }
};

main().catch((error) => console.error('Unexpected error:', error));

