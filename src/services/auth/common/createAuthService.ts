import { AuthService } from '../types'

export const createAuthService = (
  createImplementationFunction: () => AuthService 
): AuthService => {
  const authServiceImplementation = createImplementationFunction();
  return authServiceImplementation;
};
